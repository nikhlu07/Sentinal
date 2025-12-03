import React from 'react';
import { Play, RotateCcw, Terminal as TerminalIcon } from 'lucide-react';
import { SentinelCard } from '../components/ui/SentinelCard';
import { Button } from '../components/ui/Button';
import { recentMissions } from '../lib/mockData';

export const Manager: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <h1 className="text-2xl font-bold text-ink-primary tracking-tight">TASK ORCHESTRATION</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input & Control */}
                <div className="lg:col-span-2 space-y-6">
                    <SentinelCard className="p-6 space-y-6">
                        <div className="flex items-center gap-2 text-primary mb-4">
                            <TerminalIcon className="w-5 h-5" />
                            <span className="font-mono font-bold">MISSION PARAMETERS</span>
                        </div>

                        <textarea
                            className="w-full h-40 bg-canvas border border-border-faint p-4 font-mono text-sm text-ink-primary focus:outline-none focus:border-primary resize-none"
                            placeholder="// ENTER MISSION OBJECTIVES...
> TARGET: ARBITRAGE
> RISK_TOLERANCE: LOW
> MAX_BUDGET: 500 HBAR"
                        ></textarea>

                        <div className="flex justify-end gap-4">
                            <Button variant="secondary">CLEAR</Button>
                            <Button variant="primary" className="flex items-center gap-2">
                                <Play className="w-4 h-4" /> EXECUTE MISSION
                            </Button>
                        </div>
                    </SentinelCard>

                    {/* Process Visualization */}
                    <div className="space-y-4">
                        <h3 className="font-mono text-sm text-ink-secondary uppercase">Execution Pipeline</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-surface border border-primary/30 p-4 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                                <div className="text-xs font-mono text-primary mb-2">STEP 01</div>
                                <div className="font-bold text-ink-primary">DECOMPOSITION</div>
                                <div className="mt-2 w-full bg-canvas h-1">
                                    <div className="bg-primary h-full w-full"></div>
                                </div>
                            </div>
                            <div className="bg-surface border border-border-faint p-4 opacity-50">
                                <div className="text-xs font-mono text-ink-secondary mb-2">STEP 02</div>
                                <div className="font-bold text-ink-primary">AGENT SELECTION</div>
                                <div className="mt-2 w-full bg-canvas h-1"></div>
                            </div>
                            <div className="bg-surface border border-border-faint p-4 opacity-50">
                                <div className="text-xs font-mono text-ink-secondary mb-2">STEP 03</div>
                                <div className="font-bold text-ink-primary">EXECUTION</div>
                                <div className="mt-2 w-full bg-canvas h-1"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Missions */}
                <div className="space-y-6">
                    <h2 className="text-lg font-bold text-ink-primary">RECENT MISSIONS</h2>
                    <div className="space-y-4">
                        {recentMissions.map((mission) => (
                            <SentinelCard key={mission.id} className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-mono text-xs text-ink-secondary">{mission.id}</span>
                                    <span className={`font-mono text-xs px-2 py-0.5 rounded-sm ${mission.status === 'SUCCESS' ? 'text-primary bg-primary/10' :
                                            mission.status === 'IN_PROGRESS' ? 'text-[#FFB74D] bg-[#FFB74D]/10' :
                                                'text-ink-secondary bg-ink-secondary/10'
                                        }`}>{mission.status}</span>
                                </div>
                                <p className="text-sm text-ink-primary mb-3 font-mono">{mission.goal}</p>
                                <div className="flex justify-between items-center text-xs font-mono border-t border-border-faint pt-2">
                                    <span className="text-ink-secondary">OUTCOME</span>
                                    <span className={mission.profit.startsWith('+') ? 'text-primary' : 'text-ink-primary'}>
                                        {mission.profit}
                                    </span>
                                </div>
                            </SentinelCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
