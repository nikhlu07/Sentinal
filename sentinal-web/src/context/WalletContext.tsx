import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { HashConnect } from 'hashconnect';
import { LedgerId } from '@hashgraph/sdk';
import type { DappMetadata, SessionData } from 'hashconnect/dist/types';

interface WalletContextType {
    connect: () => Promise<void>;
    disconnect: () => void;
    accountId: string | null;
    isConnected: boolean;
    sessionData: SessionData | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const APP_METADATA: DappMetadata = {
    name: "Sentinel",
    description: "Autonomous Agent Watchtower",
    icons: ["https://your-domain.com/logo.png"],
    url: "http://localhost:5173"
};

const PROJECT_ID = "6465d094-4966-4939-9b7e-9694b6a4b6a4"; // Placeholder Project ID

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [hashConnect, setHashConnect] = useState<HashConnect | null>(null);
    const [sessionData, setSessionData] = useState<SessionData | null>(null);
    const [accountId, setAccountId] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const initHashConnect = async () => {
            const hc = new HashConnect(LedgerId.TESTNET, PROJECT_ID, APP_METADATA, true);

            // Register events
            hc.pairingEvent.on((data) => {
                console.log("Paired", data);
                setSessionData(data);
                setAccountId(data.accountIds[0]);
                setIsConnected(true);
            });

            hc.disconnectionEvent.on(() => {
                setSessionData(null);
                setAccountId(null);
                setIsConnected(false);
            });

            await hc.init();
            setHashConnect(hc);
        };

        initHashConnect();
    }, []);

    const connect = async () => {
        if (hashConnect) {
            await hashConnect.openPairingModal();
        }
    };

    const disconnect = async () => {
        if (hashConnect) {
            await hashConnect.disconnect();
            setSessionData(null);
            setAccountId(null);
            setIsConnected(false);
        }
    };

    return (
        <WalletContext.Provider value={{ connect, disconnect, accountId, isConnected, sessionData }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
