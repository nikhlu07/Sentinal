import * as React from "react";
import { cn } from "../../lib/utils";

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
    status: "online" | "busy" | "offline" | "hazard";
    pulse?: boolean;
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
    ({ className, status, pulse = false, ...props }, ref) => {

        const statusStyles = {
            online: "bg-primary shadow-[0_0_8px_rgba(0,230,118,0.8)]",
            busy: "bg-[#D97706]",
            offline: "border-2 border-hazard bg-transparent",
            hazard: "bg-hazard",
        };

        const pulseAnimation = pulse ? (status === 'busy' ? 'animate-ping' : 'animate-pulse') : '';

        return (
            <div
                ref={ref}
                className={cn(
                    "h-2 w-2 rounded-full",
                    statusStyles[status],
                    pulseAnimation,
                    className
                )}
                {...props}
            />
        );
    }
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator };
