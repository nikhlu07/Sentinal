import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
const REGISTRY_URL = process.env.REGISTRY_URL || 'http://localhost:8787';
const WALLET_URL = process.env.WALLET_URL || 'http://localhost:3000';

app.get('/', (req, res) => {
    res.send('NullShot Manager Agent (Sentinel) is Operational');
});

// Orchestrate a task
app.post('/execute-task', async (req, res) => {
    const { goal, budget } = req.body;

    if (!goal) {
        return res.status(400).json({ error: 'Missing goal' });
    }

    try {
        console.log(`[NullShot Manager] Received goal: "${goal}"`);

        // 1. Query Registry for a suitable agent
        console.log(`[NullShot Manager] Querying Edenlayer Registry for agents...`);
        const searchResponse = await axios.get(`${REGISTRY_URL}/search`, {
            params: { q: goal }
        });

        const matches = searchResponse.data.matches;
        if (!matches || matches.length === 0) {
            return res.status(404).json({ error: 'No suitable agents found' });
        }

        const bestAgent = matches[0];
        console.log(`[NullShot Manager] Found candidate: ${bestAgent.metadata.name} (${bestAgent.id})`);

        // 2. Reason with Gemini
        console.log(`[NullShot Manager] Consulting Gemini 2.0 Flash...`);
        let reasoning = "Selected based on vector similarity.";
        try {
            const geminiResponse = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                    contents: [{
                        parts: [{
                            text: `User Goal: "${goal}".\nCandidate Agent: ${JSON.stringify(bestAgent.metadata)}.\n\nExplain briefly why this agent is a good fit.`
                        }]
                    }]
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
            reasoning = geminiResponse.data.candidates[0].content.parts[0].text;
            console.log(`[NullShot Manager] Gemini Reasoning: ${reasoning}`);
        } catch (geminiError: any) {
            console.warn(`[NullShot Manager] Gemini failed: ${geminiError.message}`);
        }

        // 3. (Simulated) Negotiate and Execute
        // In a real system, we would contact the agent's endpoint.
        // Here we assume success.
        console.log(`[NullShot Manager] Executing task with agent...`);

        // 4. Pay the agent
        if (budget && budget > 0) {
            console.log(`[NullShot Manager] Paying agent ${budget} HBAR...`);
            // We need the agent's wallet ID. For now, we'll assume it's in metadata or use a placeholder.
            // In a real scenario, the agent would provide an invoice.
            const agentWalletId = bestAgent.metadata.wallet_id || '0.0.12345'; // Placeholder

            try {
                await axios.post(`${WALLET_URL}/transfer`, {
                    toAccountId: agentWalletId,
                    amount: budget
                });
                console.log(`[NullShot Manager] Payment successful`);
            } catch (payError: any) {
                console.warn(`[NullShot Manager] Payment failed: ${payError.message}`);
                // Continue anyway for demo purposes
            }
        }

        res.json({
            status: 'success',
            protocol: 'nullshot-v2',
            result: `Task "${goal}" completed by ${bestAgent.metadata.name}`,
            reasoning: reasoning,
            agent: bestAgent
        });
    } catch (error: any) {
        console.error('[Manager] Execution failed:', error.message);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Manager Agent listening on port ${port}`);
});
