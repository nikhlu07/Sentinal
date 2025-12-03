import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Terminal } from '../components/ui/Terminal';
import { Activity, Shield, Cpu, Zap } from 'lucide-react';

export function Dashboard() {
    const [logs, setLogs] = useState<{ time: string; type: string; color: string; msg: string }[]>([]);

    useEffect(() => {
        const initialLogs = [
            { time: new Date().toLocaleTimeString(), type: '[INIT]', color: 'text-primary', msg: 'INITIALIZING PROTOCOL...' },
            { time: new Date().toLocaleTimeString(), type: '[NET]', color: 'text-primary', msg: 'CONNECTING TO HEDERA...' },
            { time: new Date().toLocaleTimeString(), type: '[AUTH]', color: 'text-ink-secondary', msg: 'Identity verified: 0x7a...4b9c' },
        ];
        setLogs(initialLogs);

        const interval = setInterval(() => {
            const newLog = {
                time: new Date().toLocaleTimeString(),
                type: '[SYS]',
                color: 'text-primary',
                msg: `System heartbeat: ${Math.random().toFixed(4)}`
            };
            setLogs(prev => [...prev.slice(-19), newLog]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-ink-primary font-header">COMMAND CENTER</h1>
                <div className="flex gap-4">
                    <Button variant="secondary">SYSTEM DIAGNOSTICS</Button>
                    <Button variant="primary">DEPLOY NEW AGENT</Button>
                </div>
            </div>

            {/* Overview Panel */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 border-l-4 border-l-primary">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-ink-secondary text-xs font-mono uppercase">System Status</h3>
                        <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-2xl font-mono text-primary font-bold">OPERATIONAL</p>
                    <p className="text-xs text-ink-secondary mt-2">Uptime: 99.99%</p>
                </Card>
                <Card className="p-6 border-l-4 border-l-primary">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-ink-secondary text-xs font-mono uppercase">Active Agents</h3>
                        <Cpu className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-2xl font-mono text-ink-primary font-bold">12</p>
                    <p className="text-xs text-ink-secondary mt-2">4 Idle / 8 Busy</p>
                </Card>
                <Card className="p-6 border-l-4 border-l-hazard">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-ink-secondary text-xs font-mono uppercase">Threat Level</h3>
                        <Shield className="w-4 h-4 text-hazard" />
                    </div>
                    <p className="text-2xl font-mono text-hazard font-bold animate-pulse">ELEVATED</p>
                    <p className="text-xs text-ink-secondary mt-2">2 Anomalies Detected</p>
                </Card>
                <Card className="p-6 border-l-4 border-l-border-faint">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-ink-secondary text-xs font-mono uppercase">Network Load</h3>
                        <Zap className="w-4 h-4 text-[#D97706]" />
                    </div>
                    <p className="text-2xl font-mono text-[#D97706] font-bold">78%</p>
                    <p className="text-xs text-ink-secondary mt-2">142 TPS</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Transactions */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-ink-primary font-header mb-4">RECENT TRANSACTIONS</h2>
                    <Card className="p-0 overflow-hidden">
                        <table className="w-full text-left text-sm font-mono">
                            <thead className="bg-surface border-b border-border-faint text-ink-secondary uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3">Hash</th>
                                    <th className="px-6 py-3">Type</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-faint bg-canvas/50">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="hover:bg-ink-primary/5 transition-colors">
                                        <td className="px-6 py-4 text-primary">0x7a...4b9c</td>
                                        <td className="px-6 py-4 text-ink-primary">PAYMENT</td>
                                        <td className="px-6 py-4 text-ink-primary">450 USDC</td>
                                        <td className="px-6 py-4"><span className="text-primary text-xs border border-primary/30 px-2 py-0.5 rounded-sm bg-primary/10">CONFIRMED</span></td>
                                        <td className="px-6 py-4 text-ink-secondary">2m ago</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>

                {/* Terminal View */}
                <div className="lg:col-span-1">
                    <h2 className="text-xl font-bold text-ink-primary font-header mb-4">SYSTEM LOGS</h2>
                    <Terminal logs={logs} height="h-[400px]" />
                </div>
            </div>
        </div>
    );
}
