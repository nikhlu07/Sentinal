import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isConnected } = useWallet();
    const location = useLocation();

    if (!isConnected) {
        // Redirect to landing page but save the attempted location
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};
