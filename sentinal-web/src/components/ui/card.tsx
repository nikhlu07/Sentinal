import * as React from "react";
import { cn } from "../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "hazard" | "caution";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", children, ...props }, ref) => {

        const baseStyles = "bg-surface border p-5 relative overflow-hidden transition-all duration-300 group";

        const variants = {
            default: "border-border-faint hover:border-primary hover:shadow-sentinel-glow",
            hazard: "border-hazard/40 hover:border-hazard hover:shadow-hazard-glow",
            caution: "border-border-faint hover:border-[#D97706]",
        };

        return (
            <div
                ref={ref}
                className={cn(baseStyles, variants[variant], className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = "Card";

export { Card };
