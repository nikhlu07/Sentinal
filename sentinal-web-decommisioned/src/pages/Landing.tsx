import React, { useEffect } from 'react';
import { Cpu, Lock, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SentinelCard } from '../components/ui/SentinelCard';
import { Button } from '../components/ui/Button';
import { Terminal } from '../components/Terminal';
import { agents } from '../lib/mockData';
import { useWallet } from '../context/WalletContext';

export const Landing: React.FC = () => {
    const { isConnected, connect } = useWallet();
    const navigate = useNavigate();

    // Redirect to dashboard if already connected
    useEffect(() => {
        if (isConnected) {
            navigate('/dashboard');
        }
    }, [isConnected, navigate]);

    // Simulated Uptime Counter Update
    useEffect(() => {
        const interval = setInterval(() => {
            // In a real app, this would update state
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-20">
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
                        <Button
                            variant="primary"
                            className="px-8 py-4"
                            onClick={connect}
                        >
                            [ DEPLOY SENTINEL ]
                        </Button>
                        <Button variant="secondary" className="px-8 py-4">
                            // READ PROTOCOLS
                        </Button>
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
                            {/* Logo Placeholder */}
                            <div className="w-12 h-12 bg-primary/20 rounded-full border border-primary/50 flex items-center justify-center">
                                <div className="w-6 h-6 bg-primary rounded-full"></div>
                            </div>
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
                    {agents.map((agent) => (
                        <SentinelCard
                            key={agent.id}
                            variant={agent.status === 'FLAGGED' ? 'hazard' : agent.status === 'BUSY' ? 'busy' : 'default'}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className={`font-mono text-xs border px-2 py-0.5 rounded-sm ${agent.status === 'FLAGGED' ? 'text-hazard border-hazard/30 bg-hazard/5' :
                                    agent.status === 'BUSY' ? 'text-[#FFB74D] border-[#FFB74D]/30 bg-[#FFB74D]/5' :
                                        'text-primary border-primary/30 bg-primary/5'
                                    }`}>
                                    {agent.name.toUpperCase()}
                                </span>
                                <div className={`h-2 w-2 rounded-full ${agent.status === 'FLAGGED' ? 'bg-hazard animate-pulse' :
                                    agent.status === 'BUSY' ? 'bg-[#FFB74D] animate-ping' :
                                        'bg-primary shadow-[0_0_8px_rgba(0,230,118,0.8)]'
                                    }`}></div>
                            </div>

                            <h3 className="font-mono text-lg text-ink-primary mb-1">{agent.id}</h3>
                            <p className="text-xs text-ink-secondary mb-6">{agent.type}</p>

                            <div className="space-y-3 font-mono text-xs">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-ink-secondary">STATUS</span>
                                    <span className={
                                        agent.status === 'FLAGGED' ? 'text-hazard blink-text' :
                                            agent.status === 'BUSY' ? 'text-[#FFB74D]' : 'text-primary'
                                    }>{agent.status}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-ink-secondary">UPTIME</span>
                                    <span className="text-ink-primary">{agent.uptime}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-ink-secondary">{agent.status === 'FLAGGED' ? 'ERR' : 'LOAD'}</span>
                                    <span className={agent.status === 'FLAGGED' ? 'text-hazard' : 'text-ink-primary'}>
                                        {agent.status === 'FLAGGED' ? 'HIGH LATENCY' : `${agent.load}%`}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-dashed border-border-faint">
                                {agent.status === 'FLAGGED' ? (
                                    <button className="w-full py-1 text-xs font-mono text-hazard border border-hazard bg-hazard/10 hover:bg-hazard hover:text-white transition-colors uppercase">
                                        [ REBOOT SYSTEM ]
                                    </button>
                                ) : (
                                    <div className="w-full bg-canvas h-1 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${agent.status === 'BUSY' ? 'bg-[#FFB74D]' : 'bg-primary'}`}
                                            style={{ width: `${agent.load}%` }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        </SentinelCard>
                    ))}
                </div>
            </section>

            {/* Live Terminal / Logs Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8" id="logs">
                {/* Terminal Panel */}
                <div className="lg:col-span-2">
                    <Terminal />
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
                        <button className="mt-4 w-full border border-primary text-primary hover:bg-primary hover:text-black font-bold uppercase text-xs py-2 transition-all">
                            View Full Ledger
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
