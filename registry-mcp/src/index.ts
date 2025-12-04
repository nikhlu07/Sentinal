import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { uuid } from '@cfworker/uuid'

type Bindings = {
    DB: D1Database
    VECTOR_INDEX: VectorizeIndex
    AI: any
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/*', cors())

app.get('/', (c) => {
    return c.text('Edenlayer Discovery Node (Sentinel) is Operational')
})

app.post('/register', async (c) => {
    const body = await c.req.json()
    const { name, description, capabilities, pricing, owner_id, wallet_id } = body

    if (!name || !description || !owner_id) {
        return c.json({ error: 'Missing required fields' }, 400)
    }

    const id = uuid()

    // Generate embedding for description + capabilities
    const textToIndex = `${name}: ${description} Capabilities: ${JSON.stringify(capabilities)}`
    const { data: embeddings } = await c.env.AI.run('@cf/baai/bge-base-en-v1.5', {
        text: [textToIndex]
    })
    const values = embeddings[0]

    // Insert into D1
    await c.env.DB.prepare(
        `INSERT INTO agents (id, name, description, capabilities, pricing, owner_id, wallet_id) VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, name, description, JSON.stringify(capabilities), JSON.stringify(pricing), owner_id, wallet_id || null).run()

    // Insert into Vectorize
    await c.env.VECTOR_INDEX.upsert([
        {
            id: id,
            values: values,
            metadata: { name, description, wallet_id: wallet_id || '' }
        }
    ])

    return c.json({ status: 'registered', id })
})

app.get('/search', async (c) => {
    const query = c.req.query('q')
    if (!query) {
        return c.json({ error: 'Missing query' }, 400)
    }

    // Generate embedding for query
    const { data: embeddings } = await c.env.AI.run('@cf/baai/bge-base-en-v1.5', {
        text: [query]
    })
    const values = embeddings[0]

    // Search Vectorize
    const vectorMatches = await c.env.VECTOR_INDEX.query(values, { topK: 5, returnMetadata: true })

    return c.json({
        network: 'edenlayer-v1',
        node_id: 'sentinel-01',
        matches: vectorMatches.matches
    })
})

app.get('/agent/:id', async (c) => {
    const id = c.req.param('id')
    const agent = await c.env.DB.prepare('SELECT * FROM agents WHERE id = ?').bind(id).first()

    if (!agent) {
        return c.json({ error: 'Agent not found' }, 404)
    }

    return c.json(agent)
})

export default app
