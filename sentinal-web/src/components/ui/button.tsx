import * as React from "react";
import { cn } from "../../lib/utils";

// Since we didn't install class-variance-authority, I'll implement a simpler version or just use clsx/tailwind-merge directly for now, 
// OR I can install it. The prompt didn't explicitly ask for it, but it's standard.
// Actually, I'll just use standard props and cn for simplicity as I didn't install cva.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "hazard" | "ghost";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {

        const baseStyles = "font-bold uppercase tracking-wide transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center";

        const variants = {
            primary: "bg-primary text-canvas hover:shadow-sentinel-glow border border-transparent clip-corners",
            secondary: "bg-transparent text-primary border border-primary hover:bg-primary-dim",
            hazard: "bg-hazard text-white hover:shadow-hazard-glow border border-transparent",
            ghost: "bg-transparent text-ink-secondary hover:text-primary hover:bg-ink-primary/5",
        };

        const sizes = {
            sm: "px-3 py-1 text-xs",
            md: "px-5 py-2 text-sm",
            lg: "px-8 py-4 text-base tracking-widest",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
