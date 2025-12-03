import React from 'react';
import clsx from 'clsx';

interface StatusBadgeProps {
    status: 'ONLINE' | 'BUSY' | 'OFFLINE' | 'FLAGGED' | 'THREAT';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const styles = {
        ONLINE: { text: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/30', dot: 'bg-primary shadow-[0_0_8px_rgba(0,230,118,0.8)]' },
        BUSY: { text: 'text-[#FFB74D]', bg: 'bg-[#FFB74D]/5', border: 'border-[#FFB74D]/30', dot: 'bg-[#FFB74D] animate-ping' },
        OFFLINE: { text: 'text-ink-secondary', bg: 'bg-ink-secondary/5', border: 'border-ink-secondary/30', dot: 'bg-ink-secondary border border-ink-secondary' },
        FLAGGED: { text: 'text-hazard', bg: 'bg-hazard/5', border: 'border-hazard/30', dot: 'bg-hazard animate-pulse' },
        THREAT: { text: 'text-hazard', bg: 'bg-hazard/5', border: 'border-hazard/30', dot: 'bg-hazard animate-pulse' },
    }[status];

    return (
        <div className="flex justify-between items-start mb-4">
            <span className={clsx("font-mono text-xs border px-2 py-0.5 rounded-sm", styles.text, styles.border, styles.bg)}>
                {status}
            </span>
            <div className={clsx("h-2 w-2 rounded-full", styles.dot)}></div>
        </div>
    );
};
