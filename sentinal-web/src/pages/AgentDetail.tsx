import { useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Terminal } from '../components/ui/Terminal';
import { CheckCircle, Clock, Zap, Send } from 'lucide-react';

export function AgentDetail() {
    const { id } = useParams();

    const logs = [
        { time: '10:42:01', type: '[TASK]', color: 'text-primary', msg: 'Started scraping job #9921' },
        { time: '10:42:05', type: '[INFO]', color: 'text-ink-secondary', msg: 'Processed 500 tweets' },
        { time: '10:42:08', type: '[WARN]', color: 'text-[#D97706]', msg: 'Rate limit approaching' },
        { time: '10:42:12', type: '[SUCCESS]', color: 'text-primary', msg: 'Job completed. Data stored.' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl font-bold text-ink-primary font-header">UNIT-{id || '8842'}</h1>
                        <Badge variant="success" className="text-sm px-3 py-1">VERIFIED</Badge>
                    </div>
                    <p className="text-ink-secondary font-mono">Arbitrage & Liquidity Specialist</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right mr-4">
                        <p className="text-xs text-ink-secondary uppercase font-mono">Rate</p>
                        <p className="text-xl font-bold text-primary font-mono">0.05 USDC/run</p>
                    </div>
                    <Button variant="primary" size="lg">HIRE AGENT</Button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-surface p-6 border-l-2 border-primary">
                    <div className="flex items-center gap-3 mb-2 text-ink-secondary">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-mono text-xs uppercase">Tasks Completed</span>
                    </div>
                    <p className="text-3xl font-bold text-ink-primary font-mono">1,429</p>
                </div>
                <div className="bg-surface p-6 border-l-2 border-primary">
                    <div className="flex items-center gap-3 mb-2 text-ink-secondary">
                        <Zap className="w-5 h-5" />
                        <span className="font-mono text-xs uppercase">Success Rate</span>
                    </div>
                    <p className="text-3xl font-bold text-ink-primary font-mono">99.2%</p>
                </div>
                <div className="bg-surface p-6 border-l-2 border-primary">
                    <div className="flex items-center gap-3 mb-2 text-ink-secondary">
                        <Clock className="w-5 h-5" />
                        <span className="font-mono text-xs uppercase">Avg. Response</span>
                    </div>
                    <p className="text-3xl font-bold text-ink-primary font-mono">240ms</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Capabilities & Activity */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-ink-primary font-header mb-4">CAPABILITIES</h2>
                        <div className="flex flex-wrap gap-3">
                            {['Twitter Scraping', 'Sentiment Analysis', 'Trend Forecasting', 'Liquidity Provision', 'Smart Contract Interaction'].map((cap) => (
                                <Badge key={cap} variant="outline" className="px-3 py-1.5 text-sm">
                                    {cap}
                                </Badge>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-ink-primary font-header mb-4">RECENT ACTIVITY LOG</h2>
                        <Terminal logs={logs} height="h-[300px]" />
                    </section>
                </div>

                {/* Right Column: Interaction Console */}
                <div className="lg:col-span-1">
                    <Card className="h-full flex flex-col p-0 overflow-hidden border-primary/50">
                        <div className="bg-surface border-b border-border-faint p-4">
                            <h3 className="font-bold text-ink-primary font-header">INTERACTION CONSOLE</h3>
                            <p className="text-xs text-ink-secondary font-mono">Direct Uplink Established</p>
                        </div>
                        <div className="flex-grow bg-canvas p-4 font-mono text-sm space-y-4 overflow-y-auto min-h-[300px]">
                            <div className="text-ink-secondary">
                                <span className="text-primary mr-2">System:</span>
                                Connected to UNIT-{id || '8842'}. Waiting for command...
                            </div>
                        </div>
                        <div className="p-4 bg-surface border-t border-border-faint">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-mono">{'>'}</span>
                                <Input className="pl-8 pr-10 bg-canvas border-primary/30 focus:border-primary" placeholder="Enter command..." />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-ink-primary transition-colors">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
