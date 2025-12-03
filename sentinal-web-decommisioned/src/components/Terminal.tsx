import React, { useEffect, useRef, useState } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface LogEntry {
    time: string;
    type: string;
    message: string;
    color: string;
}

export const Terminal: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([
        { time: new Date().toLocaleTimeString(), type: '[INIT]', message: 'Uplink established to Core...', color: 'text-primary' },
        { time: new Date().toLocaleTimeString(), type: '[AUTH]', message: 'Handshake verified. ID: Sentinel-Alpha.', color: 'text-primary' },
        { time: new Date().toLocaleTimeString(), type: '[SCAN]', message: 'Sector 4 clean. No rogue agents.', color: 'text-ink-secondary' },
    ]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    useEffect(() => {
        const logTypes = [
            { type: '[INFO]', color: 'text-ink-secondary' },
            { type: '[SCAN]', color: 'text-primary' },
            { type: '[WARN]', color: 'text-[#FFB74D]' },
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
            const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
            const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];

            setLogs(prev => {
                const newLogs = [...prev, {
                    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                    type: randomType.type,
                    message: randomMsg,
                    color: randomType.color
                }];
                if (newLogs.length > 50) return newLogs.slice(1);
                return newLogs;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-canvas border border-border-faint p-1 rounded-sm shadow-2xl h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border-faint shrink-0">
                <div className="flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-primary" />
                    <span className="font-mono text-xs text-ink-secondary uppercase">Transmission Log</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-border-faint"></div>
                    <div className="w-3 h-3 rounded-full bg-border-faint"></div>
                </div>
            </div>
            <div className="p-4 overflow-y-auto font-mono text-xs leading-relaxed flex-1 min-h-[300px]">
                {logs.map((log, i) => (
                    <div key={i} className="mb-1 border-l-2 border-transparent hover:border-border-faint pl-2 transition-all">
                        <span className="text-ink-secondary opacity-50">[{log.time}]</span> <span className={log.color}>{log.type}</span> {log.message}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
