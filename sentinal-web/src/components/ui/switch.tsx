import * as React from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface SwitchProps extends React.HTMLAttributes<HTMLDivElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
    ({ className, checked = false, onCheckedChange, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "w-11 h-6 rounded-full flex items-center cursor-pointer transition-colors p-1",
                    checked ? "bg-primary" : "bg-surface border border-border-faint",
                    className
                )}
                onClick={() => onCheckedChange?.(!checked)}
                {...props}
            >
                <motion.div
                    className={cn(
                        "w-4 h-4 rounded-full shadow-sm",
                        checked ? "bg-white" : "bg-ink-secondary"
                    )}
                    animate={{ x: checked ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </div>
        );
    }
);
Switch.displayName = "Switch";

export { Switch };
