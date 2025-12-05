import { createContext, useContext, type ReactNode, useState, useEffect } from 'react';
import { HashConnect } from 'hashconnect';
import { AccountId } from '@hashgraph/sdk';

interface WalletContextType {
    connect: () => Promise<void>;
    disconnect: () => void;
    accountId: string | undefined;
    isConnected: boolean;
    isConnecting: boolean;
    pairingString: string;
    sendTransaction: (trans: any) => Promise<any>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const appMetadata = {
    name: "Sentinel Protocol",
    description: "The Trust Layer for the Open Agentic Web",
    icon: "https://sentinel-protocol.pages.dev/logo.svg"
};

// Use any to bypass strict type checks for HashConnect v3
const hashConnect = new HashConnect(
    // @ts-ignore
    "testnet", // LedgerId.TESTNET
    "b16b57b90906067f8d622838bd638d16", // Placeholder Project ID
    appMetadata,
    true
) as any;

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [pairingData, setPairingData] = useState<any | null>(null);
    const [pairingString, setPairingString] = useState<string>("");
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        const initHashConnect = async () => {
            // Initialize
            await hashConnect.init();

            if (hashConnect.pairingString) {
                setPairingString(hashConnect.pairingString);
            }

            // Check for existing connection
            // @ts-ignore
            if (hashConnect.savedPairings && hashConnect.savedPairings.length > 0) {
                // @ts-ignore
                setPairingData(hashConnect.savedPairings[0]);
            }
        };

        initHashConnect();

        // Event Listeners
        hashConnect.pairingEvent.on((data: any) => {
            console.log("Paired with wallet", data);
            setPairingData(data);
            setIsConnecting(false);
        });

        hashConnect.disconnectionEvent.on(() => {
            setPairingData(null);
        });
    }, []);

    const connect = async () => {
        setIsConnecting(true);
        hashConnect.openPairingModal();
    };

    const disconnect = async () => {
        await hashConnect.disconnect();
        setPairingData(null);
    };

    const sendTransaction = async (trans: any) => {
        if (!pairingData) return;

        const accountId = AccountId.fromString(pairingData.accountIds[0]);

        const transaction = {
            topic: pairingData.topic,
            byteArray: trans.toBytes(),
            metadata: {
                accountToSign: pairingData.accountIds[0],
                returnTransaction: false
            }
        };

        return await hashConnect.sendTransaction(accountId, transaction);
    };

    return (
        <WalletContext.Provider value={{
            connect,
            disconnect,
            sendTransaction,
            accountId: pairingData?.accountIds?.[0],
            isConnected: !!pairingData,
            isConnecting,
            pairingString
        }}>
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
