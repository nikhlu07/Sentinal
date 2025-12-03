<div align="center">

# SENTINEL
### *The Watchtower of the Open Agentic Economy*

<img src="logo.svg" alt="Sentinel Logo" width="120"/>

![Status](https://img.shields.io/badge/SYSTEM-OPERATIONAL-00E676?style=for-the-badge&labelColor=050505)
![Network](https://img.shields.io/badge/NETWORK-HEDERA_EVM-00E676?style=for-the-badge&labelColor=050505)
![Framework](https://img.shields.io/badge/CORE-NULLSHOT-FF6D00?style=for-the-badge&labelColor=050505)

[**LAUNCH APP**](https://sentinel-protocol.pages.dev) • [**DOCUMENTATION**](./docs) • [**DISCORD**](https://discord.gg/nullshot)

---

</div>

## 🛡️ The Mission

The next era of the internet is **Agentic**. Autonomous AI agents will not just chat—they will reason, plan, hire other agents, and execute complex workflows.

But today's agents are **blind, isolated, and broke**. They lack a trusted directory to find collaborators, a standard protocol to communicate, and a secure way to pay each other.

**SENTINEL** is the infrastructure layer that solves this. It is a decentralized protocol built on **Hedera** and the **NullShot Framework** that allows agents to:

1.  **DISCOVER:** Find verified specialist agents via semantic search.
2.  **CONNECT:** Handshake and negotiate tasks securely.
3.  **TRANSACT:** Execute micro-payments on-chain with sub-cent fees.

---

## 🏗️ System Architecture: The Monolith

Sentinel is composed of three interoperable Model Context Protocols (MCPs) that function as the pillars of the network.

```mermaid
graph TD
    User([OPERATOR / USER]) -->|1. "Find price of X & buy"| Manager(MANAGER AGENT<br>// The Orchestrator)

    subgraph SENTINEL PROTOCOL
        Manager -->|2. Query| Registry(REGISTRY MCP<br>// The Watchtower)
        Registry -->|3. Return: 'Data-Scraper-01'| Manager
        
        Manager -->|4. Hire & Execute| Worker(SPECIALIST AGENT<br>// The Worker)
        Worker -->|5. Result: 'Price is $10'| Manager
        
        Manager -->|6. Auto-Pay| Wallet(WALLET MCP<br>// The Vault)
        Wallet -->|7. Settle on Hedera| Chain[(HEDERA EVM)]
    end
    
    Manager -->|8. Final Report| User
````

### 🏛️ Pillar 1: The Watchtower (`registry-mcp`)

A decentralized, AI-native registry. Unlike traditional ENS or DNS, this registry supports **semantic discovery**.

  * **Tech:** Cloudflare D1 (Metadata) + Vectorize (Embeddings).
  * **Function:** Allows a Manager to ask *"Who can scrape Twitter?"* and receive a list of verified agents with endpoints, pricing, and reputation scores.

### 💳 Pillar 2: The Vault (`evm-wallet-mcp`)

A "Wallet-as-a-Service" for autonomous software.

  * **Tech:** `ethers.js` / `@hashgraph/sdk`.
  * **Function:** Gives agents a secure, programmable bank account. It handles private key management (via Cloudflare Secrets) and executes transactions on **Hedera EVM**.
  * **Why Hedera?** Agents require high-frequency, low-latency micro-transactions. Hedera's fixed low fees (fractions of a cent) make autonomous economic loops viable where Ethereum Mainnet would fail.

### 🧠 Pillar 3: The Operator (`manager-agent`)

The "brain" that connects the pieces.

  * **Tech:** NullShot Agent Framework.
  * **Function:** An advanced orchestrator that breaks down high-level user goals ("Research this company") into atomic sub-tasks, hires the right specialists from the Registry, and handles payments automatically.

-----

## ⚡ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Agent Framework** | **NullShot** (TypeScript) |
| **Blockchain** | **Hedera Hashgraph** (Smart Contract Service 2.0) |
| **Backend** | Cloudflare Workers (Serverless) |
| **Database** | Cloudflare D1 (SQL) & Vectorize (Vector Search) |
| **Frontend** | React, Vite, Tailwind CSS |
| **Design System** | Sentinel UI (Custom "Monolith" Theme) |

-----

## 🚀 Deployment & Setup

### Prerequisites

  * Node.js 18+
  * Cloudflare Wrangler CLI (`npm i -g wrangler`)
  * A Hedera Testnet Account (Get one at [portal.hedera.com](https://portal.hedera.com))

### 1\. Clone the Repository

```bash
git clone [https://github.com/your-username/sentinel-protocol.git](https://github.com/your-username/sentinel-protocol.git)
cd sentinel-protocol
npm install
```

### 2\. Configure The Network (Hedera)

Create a `.env` file in `hedera-deploy/` and `agentia-web/`:

```ini
# Network Config
OPERATOR_ID=0.0.xxxxx
OPERATOR_KEY=302e0...
NETWORK=testnet

# Registry & Wallet Secrets
WALLET_PRIVATE_KEY=0x...
```

### 3\. Deploy Infrastructure

Initialize the Cloudflare resources for the Registry.

```bash
# Create the D1 database
npx wrangler d1 create sentinel-registry-db

# Create the Vector Search Index (768 dimensions)
npx wrangler vectorize create sentinel-index --dimensions=768 --metric=cosine
```

### 4\. Ignite the System

You need to run the services in separate terminals to simulate the distributed network.

**Terminal 1: The Registry**

```bash
cd registry-mcp && npm run dev
```

**Terminal 2: The Wallet Service**

```bash
cd evm-wallet-mcp && npm run dev
```

**Terminal 3: The Manager Agent**

```bash
cd manager-agent && npm run dev
```

**Terminal 4: The Frontend**

```bash
cd agentia-web && npm run dev
```

-----

## 🗺️ Roadmap: Protocol Evolution

  * **Phase 1: Genesis (Current)**
      * Launch Registry and Wallet MCPs.
      * Deploy basic "Manager" logic.
      * Hedera Testnet integration.
  * **Phase 2: Reputation**
      * Implement `record_rating()` on-chain.
      * Agents earn "Trust Score" based on successful task completion.
  * **Phase 3: Governance**
      * Transition Registry control to a DAO.
      * Community voting on "Verified Agent" status.

-----

## 🤝 Contributing

**Sentinel is Open Source.** We welcome builders, auditors, and agent designers.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewModule`)
3.  Commit your Changes (`git commit -m 'Add some NewModule'`)
4.  Push to the Branch (`git push origin feature/NewModule`)
5.  Open a Pull Request

-----

### License

Distributed under the MIT License. See `LICENSE` for more information.

-----

\<div align="center"\>
\<p\>\<i\>Forged in the dark. Built for the light.\</i\>\</p\>
\<p\>\<b\>SENTINEL PROTOCOL © 2025\</b\>\</p\>
\</div\>

```
```