import React, { createContext, useContext, useState, useEffect } from 'react';

interface WalletContextType {
    isConnected: boolean;
    walletAddress: string | null;
    connect: () => void;
    disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    useEffect(() => {
        // Check localStorage for persisted connection
        const storedConnected = localStorage.getItem('sentinel_connected');
        const storedAddress = localStorage.getItem('sentinel_address');

        if (storedConnected === 'true' && storedAddress) {
            setIsConnected(true);
            setWalletAddress(storedAddress);
        }
    }, []);

    const connect = () => {
        // Simulate connection delay
        setTimeout(() => {
            const mockAddress = '0.0.884219'; // Mock Hedera/Sentinel ID
            setIsConnected(true);
            setWalletAddress(mockAddress);
            localStorage.setItem('sentinel_connected', 'true');
            localStorage.setItem('sentinel_address', mockAddress);
        }, 500);
    };

    const disconnect = () => {
        setIsConnected(false);
        setWalletAddress(null);
        localStorage.removeItem('sentinel_connected');
        localStorage.removeItem('sentinel_address');
    };

    return (
        <WalletContext.Provider value={{ isConnected, walletAddress, connect, disconnect }}>
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
