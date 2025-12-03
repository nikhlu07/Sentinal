import { useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TerminalProps {
    logs: { time?: string; type?: string; color?: string; msg: string }[];
    title?: string;
    className?: string;
    height?: string;
}

export function Terminal({ logs, title = "System Log", className, height = "h-[300px]" }: TerminalProps) {
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className={cn("bg-canvas border border-border-faint p-1 rounded-sm shadow-2xl", className)}>
            <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border-faint">
                <div className="flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-primary" />
                    <span className="font-mono text-xs text-ink-secondary uppercase">{title}</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-border-faint"></div>
                    <div className="w-3 h-3 rounded-full bg-border-faint"></div>
                </div>
            </div>
            <div className={cn("p-4 overflow-y-auto font-mono text-xs leading-relaxed", height)} ref={terminalRef}>
                {logs.map((log, index) => (
                    <div key={index} className="mb-1 border-l-2 border-transparent hover:border-border-faint pl-2 transition-all">
                        {log.time && <span className="text-ink-secondary opacity-50">[{log.time}]</span>}{' '}
                        {log.type && <span className={log.color}>{log.type}</span>}{' '}
                        <span className={log.color || 'text-ink-primary'}>{log.msg}</span>
                    </div>
                ))}
                <div className="animate-pulse text-primary">_</div>
            </div>
        </div>
    );
}
