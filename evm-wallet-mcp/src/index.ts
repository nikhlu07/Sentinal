import express from 'express';
import { Client, PrivateKey, AccountId, Hbar, TransferTransaction, AccountCreateTransaction } from '@hashgraph/sdk';
import dotenv from 'dotenv';

import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// Initialize Hedera Client
let client: Client;

try {
    const operatorId = AccountId.fromString(process.env.OPERATOR_ID || '');
    const operatorKey = PrivateKey.fromString(process.env.OPERATOR_KEY || '');

    client = process.env.NETWORK === 'mainnet' ? Client.forMainnet() : Client.forTestnet();
    client.setOperator(operatorId, operatorKey);
    console.log('Hedera Client Initialized');
} catch (error) {
    console.warn('Hedera Client Initialization Failed (Check .env):', error);
    // Fallback for dev without creds
    client = Client.forTestnet();
}

app.get('/', (req, res) => {
    res.send('Sentinel EVM Wallet MCP is Operational');
});

app.post('/create-account', async (req, res) => {
    try {
        const newKey = PrivateKey.generateED25519();
        const response = await new AccountCreateTransaction()
            .setKey(newKey.getPublicKey())
            .setInitialBalance(new Hbar(10)) // Give some initial HBAR
            .execute(client);

        const receipt = await response.getReceipt(client);
        const newAccountId = receipt.accountId;

        res.json({
            status: 'success',
            accountId: newAccountId?.toString(),
            privateKey: newKey.toString(),
            publicKey: newKey.getPublicKey().toString()
        });
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.post('/transfer', async (req, res) => {
    const { toAccountId, amount } = req.body;

    if (!toAccountId || !amount) {
        return res.status(400).json({ error: 'Missing toAccountId or amount' });
    }

    try {
        const response = await new TransferTransaction()
            .addHbarTransfer(client.operatorAccountId!, new Hbar(-amount))
            .addHbarTransfer(toAccountId, new Hbar(amount))
            .execute(client);

        const receipt = await response.getReceipt(client);

        res.json({
            status: 'success',
            transactionId: response.transactionId.toString(),
            status_code: receipt.status.toString()
        });
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Wallet MCP listening on port ${port}`);
});
