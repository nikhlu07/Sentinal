import { useEffect, useState, useRef } from 'react';
import { Cpu, Lock, Shield, Zap, Terminal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { StatusIndicator } from '../components/ui/StatusIndicator';
import { Link } from 'react-router-dom';

export function Landing() {
    const [logs, setLogs] = useState<{ time: string; type: string; color: string; msg: string }[]>([]);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Initial logs
    useEffect(() => {
        const initialLogs = [
            { time: new Date().toLocaleTimeString('en-US', { hour12: false }), type: '[INIT]', color: 'text-primary', msg: 'Uplink established to Core...' },
            { time: new Date().toLocaleTimeString('en-US', { hour12: false }), type: '[AUTH]', color: 'text-primary', msg: 'Handshake verified. ID: Sentinel-Alpha.' },
            { time: new Date().toLocaleTimeString('en-US', { hour12: false }), type: '[SCAN]', color: 'text-ink-secondary', msg: 'Sector 4 clean. No rogue agents.' },
        ];
        setLogs(initialLogs);
    }, []);

    // Log simulator
    useEffect(() => {
        const logTypes = [
            { type: '[INFO]', color: 'text-ink-secondary' },
            { type: '[SCAN]', color: 'text-primary' },
            { type: '[WARN]', color: 'text-[#D97706]' },
            { type: '[TX]', color: 'text-ink-primary' }
        ];

        const logMessages = [
            "New block decoded: #884921",
            "Agent 8842 requesting liquidity pool access.",
            "Sentiment analysis complete. Trend: Bullish.",
            "Handshake verified with external node.",
            "Packet loss detected in Sector 7. Retrying...",
            "Transfer verified. Hash logged.",
            "Updating global state tree...",
            "Garbage collection initiated.",
            "Optimizing execution path for Unit-9921."
        ];

        const interval = setInterval(() => {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { hour12: false });
            const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
            const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];

            setLogs(prev => {
                const newLogs = [...prev, { time, type: randomType.type, color: randomType.color, msg: randomMsg }];
                if (newLogs.length > 50) newLogs.shift();
                return newLogs;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Auto-scroll terminal
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <>
            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/30 bg-primary-dim mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="font-mono text-xs text-primary tracking-widest uppercase">System Online</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink-primary mb-6">
                        THE WATCHTOWER FOR THE <br />
                        <span className="text-primary">AUTONOMOUS ECONOMY</span>
                    </h1>

                    <p className="text-ink-secondary text-lg max-w-lg mb-8 font-light leading-relaxed">
                        A secure HUD for monitoring agentic transactions. Real-time surveillance, threat detection, and verification for the machine workforce.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link to="/dashboard">
                            <Button variant="primary" size="lg">
                                [ DEPLOY SENTINEL ]
                            </Button>
                        </Link>
                        <Link to="/registry">
                            <Button variant="secondary" size="lg">
                // READ PROTOCOLS
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Hero Visual: Radar/Abstract UI */}
                <div className="relative flex items-center justify-center lg:justify-end">
                    <div className="relative w-full max-w-md aspect-square border border-border-faint rounded-full flex items-center justify-center bg-surface/30">
                        {/* Radar Sweep */}
                        <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_4s_linear_infinite] origin-center" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 230, 118, 0.1) 60deg, transparent 61deg)' }}></div>
                        {/* Inner Circles */}
                        <div className="absolute w-[70%] h-[70%] border border-border-faint rounded-full"></div>
                        <div className="absolute w-[40%] h-[40%] border border-primary/30 rounded-full flex items-center justify-center">
                            <img src="/logo.svg" alt="Sentinel Logo" className="w-12 h-12 text-primary" />
                        </div>

                        {/* Decorative HUD elements around */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-canvas px-2 font-mono text-xs text-primary">NORTH_SECTOR</div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 bg-canvas px-2 font-mono text-xs text-ink-secondary">SYS_ID: 994-A</div>
                        <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 bg-canvas py-2 font-mono text-xs text-ink-secondary rotate-180" style={{ writingMode: 'vertical-rl' }}>SCANNING...</div>
                    </div>
                </div>
            </section>

            {/* Stats / Dashboard Bar */}
            <section className="border-y border-border-faint bg-surface/50 backdrop-blur-md sticky top-16 z-30" id="monitor">
                <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border-l-2 border-primary pl-4">
                        <div className="text-xs font-mono text-ink-secondary uppercase">Active Units</div>
                        <div className="text-2xl font-mono text-ink-primary mt-1">04</div>
                    </div>
                    <div className="border-l-2 border-border-faint pl-4">
                        <div className="text-xs font-mono text-ink-secondary uppercase">Total Hashrate</div>
                        <div className="text-2xl font-mono text-ink-primary mt-1">842 <span className="text-sm text-ink-secondary">TH/s</span></div>
                    </div>
                    <div className="border-l-2 border-hazard pl-4">
                        <div className="text-xs font-mono text-ink-secondary uppercase text-hazard">Threat Level</div>
                        <div className="text-2xl font-mono text-hazard mt-1 animate-pulse">ELEVATED</div>
                    </div>
                    <div className="border-l-2 border-border-faint pl-4">
                        <div className="text-xs font-mono text-ink-secondary uppercase">Network</div>
                        <div className="text-2xl font-mono text-primary mt-1">SECURE</div>
                    </div>
                </div>
            </section>

            {/* Agent Monitor Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="agents">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-ink-primary flex items-center gap-2">
                            <Cpu className="text-primary w-6 h-6" />
                            ACTIVE AGENTS
                        </h2>
                        <p className="font-mono text-sm text-ink-secondary mt-2">// SECTOR SCAN: 4 UNITS DETECTED</p>
                    </div>
                    <button className="hidden md:block text-xs font-mono text-primary border border-primary/50 px-3 py-1 hover:bg-primary/10 transition-colors uppercase">
                        Refresh Grid
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Agent Card 1: Active */}
                    <Card variant="default">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 -mr-8 -mt-8 rounded-full blur-xl group-hover:bg-primary/20 transition-all"></div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-xs text-primary border border-primary/30 px-2 py-0.5 rounded-sm bg-primary/5">ALPHA</span>
                            <StatusIndicator status="online" />
                        </div>
                        <h3 className="font-mono text-lg text-ink-primary mb-1">UNIT-8842</h3>
                        <p className="text-xs text-ink-secondary mb-6">Arbitrage & Liquidity</p>
                        <div className="space-y-3 font-mono text-xs">
                            <div className="flex justify-between border-b border-border-faint pb-2">
                                <span className="text-ink-secondary">STATUS</span>
                                <span className="text-primary">ONLINE</span>
                            </div>
                            <div className="flex justify-between border-b border-border-faint pb-2">
                                <span className="text-ink-secondary">UPTIME</span>
                                <span className="text-ink-primary">14h 22m</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-ink-secondary">LOAD</span>
                                <span className="text-ink-primary">42%</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-dashed border-border-faint">
                            <div className="w-full bg-canvas h-1 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[42%]"></div>
                            </div>
                        </div>
                    </Card>

                    {/* Agent Card 2: Active */}
                    <Card variant="default">
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-xs text-primary border border-primary/30 px-2 py-0.5 rounded-sm bg-primary/5">BETA</span>
                            <StatusIndicator status="online" />
                        </div>
                        <h3 className="font-mono text-lg text-ink-primary mb-1">UNIT-9921</h3>
                        <p className="text-xs text-ink-secondary mb-6">Social Sentiment Analysis</p>
                        <div className="space-y-3 font-mono text-xs">
                            <div className="flex justify-between border-b border-border-faint pb-2">
                                <span className="text-ink-secondary">STATUS</span>
                                <span className="text-primary">ONLINE</span>
                            </div>
                            <div className="flex justify-between border-b border-border-faint pb-2">
                                <span className="text-ink-secondary">UPTIME</span>
                                <span className="text-ink-primary">02h 45m</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-ink-secondary">LOAD</span>
                                <span className="text-ink-primary">89%</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-dashed border-border-faint">
                            <div className="w-full bg-canvas h-1 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[89%]"></div>
                            </div>
                        </div>
                    </Card>

                    {/* Agent Card 3: Hazard/Warning */}
                    <Card variant="hazard">
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-xs text-hazard border border-hazard/30 px-2 py-0.5 rounded-sm bg-hazard/5">DELTA</span>
                            <StatusIndicator status="hazard" pulse />
                        </div>
                        <h3 className="font-mono text-lg text-ink-primary mb-1">UNIT-7710</h3>
                        <p className="text-xs text-ink-secondary mb-6">Contract Auditor</p>
                        <div className="space-y-3 font-mono text-xs">
                            <div className="flex justify-between border-b border-border-faint pb-2">
                                <span className="text-ink-secondary">STATUS</span>
                                <span className="text-hazard blink-text">FLAGGED</span>
                            </div>
                            <div className="flex justify-between border-b border-border-faint pb-2">
                                <span className="text-ink-secondary">UPTIME</span>
                                <span className="text-ink-primary">--</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-ink-secondary">ERR</span>
                                <span className="text-hazard">HIGH LATENCY</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-dashed border-border-faint">
                            <button className="w-full py-1 text-xs font-mono text-hazard border border-hazard bg-hazard/10 hover:bg-hazard hover:text-white transition-colors uppercase">
                                [ REBOOT SYSTEM ]
                            </button>
                        </div>
                    </Card>

                    {/* Agent Card 4: Busy/Caution */}
                    <Card variant="caution">
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-xs text-[#D97706] border border-[#D97706]/30 px-2 py-0.5 rounded-sm bg-[#D97706]/5">GAMMA</span>
                            <StatusIndicator status="busy" pulse />
                        </div>
                        <h3 className="font-mono text-lg text-ink-primary mb-1">UNIT-1029</h3>
                        <p className="text-xs text-ink-secondary mb-6">Data Aggregation</p>
                        <div className="space-y-3 font-mono text-xs">
                            <div className="flex justify-between border-b border-border-faint pb-2">
                                <span className="text-ink-secondary">STATUS</span>
                                <span className="text-[#D97706]">BUSY</span>
                            </div>
                            <div className="flex justify-between border-b border-border-faint pb-2">
                                <span className="text-ink-secondary">UPTIME</span>
                                <span className="text-ink-primary">119h 20m</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-ink-secondary">LOAD</span>
                                <span className="text-ink-primary">99%</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-dashed border-border-faint">
                            <div className="w-full bg-canvas h-1 rounded-full overflow-hidden">
                                <div className="bg-[#D97706] h-full w-[99%]"></div>
                            </div>
                        </div>
                    </Card>

                </div>
            </section>

            {/* Live Terminal / Logs Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8" id="logs">
                {/* Terminal Panel */}
                <div className="lg:col-span-2 bg-canvas border border-border-faint p-1 rounded-sm shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border-faint">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-primary" />
                            <span className="font-mono text-xs text-ink-secondary uppercase">Transmission Log</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-border-faint"></div>
                            <div className="w-3 h-3 rounded-full bg-border-faint"></div>
                        </div>
                    </div>
                    <div className="p-4 h-[300px] overflow-y-auto font-mono text-xs leading-relaxed" ref={terminalRef}>
                        {logs.map((log, index) => (
                            <div key={index} className="mb-1 border-l-2 border-transparent hover:border-border-faint pl-2 transition-all">
                                <span className="text-ink-secondary opacity-50">[{log.time}]</span> <span className={log.color}>{log.type}</span> {log.msg}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Side Panel Details */}
                <div className="bg-surface border border-border-faint p-6 flex flex-col justify-between">
                    <div>
                        <h4 className="font-bold text-ink-primary text-sm uppercase mb-4 tracking-widest">System Protocols</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-sm text-ink-secondary group cursor-pointer hover:text-primary transition-colors">
                                <Lock className="w-4 h-4" />
                                <span className="font-mono">ENCRYPTION: AES-256</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-ink-secondary group cursor-pointer hover:text-primary transition-colors">
                                <Shield className="w-4 h-4" />
                                <span className="font-mono">FIREWALL: ACTIVE</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-ink-secondary group cursor-pointer hover:text-primary transition-colors">
                                <Zap className="w-4 h-4" />
                                <span className="font-mono">LATENCY: 12ms</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border-faint">
                        <div className="text-xs text-ink-secondary uppercase font-mono mb-2">System Hash</div>
                        <div className="font-mono text-xs text-primary truncate bg-canvas p-2 border border-border-faint rounded-sm">
                            0x7a29...4b9c
                        </div>
                        <Button variant="secondary" className="mt-4 w-full text-xs py-2">
                            View Full Ledger
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
