import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wallet } from 'lucide-react';
import clsx from 'clsx';
import { useWallet } from '../context/WalletContext';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { isConnected, walletAddress, connect, disconnect } = useWallet();

    const navLinks = [
        { name: 'MONITOR', path: '/dashboard' },
        { name: 'AGENTS', path: '/registry' },
        { name: 'WALLET', path: '/wallet' },
        { name: 'LOGS', path: '/manager' },
    ];

    return (
        <div className="min-h-screen font-sans antialiased selection:bg-primary selection:text-canvas relative">
            {/* Scanline Overlay */}
            <div className="fixed top-0 left-0 w-full h-full scanlines pointer-events-none z-50 opacity-30"></div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-40 border-b border-border-faint bg-canvas/90 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-8 h-8 bg-primary/20 flex items-center justify-center rounded-sm border border-primary/50">
                                <div className="w-4 h-4 bg-primary rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold tracking-wider text-lg leading-none text-ink-primary">SENTINEL</span>
                                <span className="font-mono text-[10px] text-primary tracking-[0.2em] leading-none mt-1">SYS.V1.0</span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {isConnected && navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={clsx(
                                        "text-sm font-mono transition-colors uppercase tracking-wide",
                                        location.pathname === link.path ? "text-primary" : "text-ink-secondary hover:text-primary"
                                    )}
                                >
                                    [ {link.name} ]
                                </Link>
                            ))}

                            {isConnected ? (
                                <button
                                    onClick={disconnect}
                                    className="bg-surface text-primary font-mono text-xs border border-primary/50 px-4 py-2 hover:bg-primary/10 transition-all uppercase tracking-wide flex items-center gap-2"
                                >
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                    {walletAddress}
                                </button>
                            ) : (
                                <button
                                    onClick={connect}
                                    className="bg-primary text-canvas font-bold px-5 py-2 text-sm hover:shadow-sentinel-glow transition-all duration-300 uppercase tracking-wide border border-transparent active:scale-95 flex items-center gap-2"
                                >
                                    <Wallet className="w-4 h-4" />
                                    Initiate Uplink
                                </button>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-ink-secondary hover:text-primary"
                            >
                                {isMobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-surface border-b border-border-faint">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {isConnected ? (
                                <>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={clsx(
                                                "block px-3 py-2 text-base font-mono hover:bg-white/5",
                                                location.pathname === link.path ? "text-primary" : "text-ink-secondary hover:text-primary"
                                            )}
                                        >
                                            [ {link.name} ]
                                        </Link>
                                    ))}
                                    <button
                                        onClick={() => { disconnect(); setIsMobileMenuOpen(false); }}
                                        className="w-full text-left px-3 py-2 text-base font-mono text-hazard hover:bg-white/5 uppercase"
                                    >
                                        [ DISCONNECT ]
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => { connect(); setIsMobileMenuOpen(false); }}
                                    className="w-full text-left px-3 py-2 text-base font-mono text-primary hover:bg-white/5 uppercase"
                                >
                                    [ INITIATE UPLINK ]
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-20 min-h-[calc(100vh-80px)]">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-border-faint bg-surface py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3 opacity-70">
                        <div className="w-4 h-4 bg-primary/20 rounded-full border border-primary/50"></div>
                        <span className="font-mono text-sm text-ink-secondary">SENTINEL SYSTEMS INC.</span>
                    </div>

                    <div className="flex gap-8 text-xs font-mono text-ink-secondary">
                        <a href="#" className="hover:text-primary transition-colors">DOCS</a>
                        <a href="#" className="hover:text-primary transition-colors">API</a>
                        <a href="#" className="hover:text-primary transition-colors">STATUS</a>
                        <a href="#" className="hover:text-primary transition-colors">PRIVACY</a>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-primary animate-pulse' : 'bg-ink-secondary'}`}></div>
                        <span className={`text-xs font-mono uppercase ${isConnected ? 'text-primary' : 'text-ink-secondary'}`}>
                            {isConnected ? 'System Online' : 'System Offline'}
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
