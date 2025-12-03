import React from 'react';
import { ArrowDownLeft, ArrowUpRight, CreditCard, Wallet as WalletIcon } from 'lucide-react';
import { SentinelCard } from '../components/ui/SentinelCard';
import { Button } from '../components/ui/Button';
import { transactions } from '../lib/mockData';

export const Wallet: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <h1 className="text-2xl font-bold text-ink-primary tracking-tight">FINANCIAL VAULT</h1>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SentinelCard className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div className="p-3 bg-primary/10 rounded-sm border border-primary/30">
                            <WalletIcon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-mono text-xs text-primary border border-primary/30 px-2 py-1 bg-primary/5">
                            MAINNET CONNECTED
                        </span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm font-mono text-ink-secondary">TOTAL BALANCE (HBAR)</div>
                        <div className="text-4xl font-mono font-bold text-ink-primary">142,892.00</div>
                        <div className="text-xs font-mono text-primary">≈ $12,492.21 USD</div>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <Button variant="primary" className="flex-1 flex items-center justify-center gap-2">
                            <ArrowDownLeft className="w-4 h-4" /> DEPOSIT
                        </Button>
                        <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2">
                            <ArrowUpRight className="w-4 h-4" /> WITHDRAW
                        </Button>
                    </div>
                </SentinelCard>

                <SentinelCard className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div className="p-3 bg-ink-secondary/10 rounded-sm border border-ink-secondary/30">
                            <CreditCard className="w-6 h-6 text-ink-secondary" />
                        </div>
                        <span className="font-mono text-xs text-ink-secondary border border-ink-secondary/30 px-2 py-1 bg-ink-secondary/5">
                            STABLECOIN VAULT
                        </span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm font-mono text-ink-secondary">USDC BALANCE</div>
                        <div className="text-4xl font-mono font-bold text-ink-primary">4,200.50</div>
                    </div>
                    <div className="mt-8">
                        <Button variant="secondary" className="w-full">
                            CONFIGURE AUTO-PAY
                        </Button>
                    </div>
                </SentinelCard>
            </div>

            {/* Transaction History */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-ink-primary">TRANSACTION HISTORY</h2>
                <div className="bg-surface border border-border-faint overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-canvas border-b border-border-faint font-mono text-xs text-ink-secondary uppercase">
                            <tr>
                                <th className="px-6 py-3">Hash</th>
                                <th className="px-6 py-3">From</th>
                                <th className="px-6 py-3">To</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-faint font-mono">
                            {transactions.map((tx) => (
                                <tr key={tx.hash} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-primary font-mono">{tx.hash}</td>
                                    <td className="px-6 py-4 text-ink-secondary">{tx.from}</td>
                                    <td className="px-6 py-4 text-ink-secondary">{tx.to}</td>
                                    <td className="px-6 py-4 text-ink-primary">{tx.amount}</td>
                                    <td className="px-6 py-4 text-ink-secondary">{tx.time}</td>
                                    <td className="px-6 py-4">
                                        <span className={
                                            tx.status === 'FAILED' ? 'text-hazard' :
                                                tx.status === 'PENDING' ? 'text-[#FFB74D]' : 'text-primary'
                                        }>{tx.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
