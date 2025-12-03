import React from 'react';
import clsx from 'clsx';

interface SentinelCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'hazard' | 'busy';
    title?: string;
    icon?: React.ReactNode;
}

export const SentinelCard: React.FC<SentinelCardProps> = ({
    children,
    className,
    variant = 'default',
    title,
    icon
}) => {
    const borderClass = {
        default: 'border-border-faint hover:border-primary hover:shadow-sentinel-glow',
        hazard: 'border-hazard/40 hover:border-hazard hover:shadow-hazard-glow',
        busy: 'border-border-faint hover:border-[#FFB74D]',
    }[variant];

    return (
        <div className={clsx(
            "sentinel-card group bg-surface border p-5 relative overflow-hidden transition-all duration-300",
            borderClass,
            className
        )}>
            {title && (
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        {icon && <span className={clsx(
                            variant === 'hazard' ? 'text-hazard' : variant === 'busy' ? 'text-[#FFB74D]' : 'text-primary'
                        )}>{icon}</span>}
                        <h3 className="font-mono text-lg text-ink-primary">{title}</h3>
                    </div>
                </div>
            )}
            {children}
        </div>
    );
};
