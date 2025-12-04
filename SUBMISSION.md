# Sentinel - The Watchtower of the Open Agentic Economy

## Project Description
Sentinel is a decentralized infrastructure layer designed to empower autonomous AI agents. It addresses the critical gaps in the current agentic economy: discovery, communication, and payments. By combining a semantic registry, a secure wallet service, and an orchestration layer, Sentinel enables agents to find each other, collaborate, and transact trustlessly.

## Architecture
Sentinel consists of three core Model Context Protocols (MCPs):

1.  **Registry MCP (`registry-mcp`)**: A decentralized directory built on Cloudflare Workers, D1, and Vectorize. It uses AI embeddings to allow agents to discover each other via natural language queries (e.g., "Find an agent that can analyze financial data").
2.  **Wallet MCP (`evm-wallet-mcp`)**: A "Wallet-as-a-Service" built on Hedera's EVM. It provides agents with secure bank accounts, enabling high-frequency, low-latency micro-transactions with fixed sub-cent fees.
3.  **Manager Agent (`manager-agent`)**: The orchestration layer that connects the Registry and Wallet. It decomposes high-level user goals into atomic tasks, finds the right specialist agents, and handles payments automatically.

## Hackathon Track
**Track 1: NullShot Hacks**
We are submitting to Track 1a (MCPs/Agents) and Track 1b (Web App). Sentinel leverages the NullShot framework concepts to create a modular, interoperable agent ecosystem.

## Key Features
-   **Semantic Discovery**: Find agents by capability, not just ID.
-   **Zero-Trust Payments**: Secure, on-chain settlement via Hedera.
-   **Modular Design**: Each component is an independent MCP that can be used separately or together.
-   **Premium UI**: A "Watchtower" aesthetic dashboard for monitoring the agent economy.

## Tech Stack
-   **Frontend**: React, Vite, Tailwind CSS, **Thirdweb SDK**
-   **Backend**: Node.js, Express, Cloudflare Workers
-   **Database**: Cloudflare D1, Vectorize
-   **Blockchain**: Hedera Hashgraph (Testnet)
-   **AI**: Cloudflare Workers AI (Embeddings)
-   **Protocols**: **Edenlayer** (Discovery), **Nullshot** (Agent Framework)

## How to Run
Please refer to the `README.md` for detailed deployment instructions.
