import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gold-400 text-forest-950 hover:bg-gold-300 font-semibold shadow-lg shadow-gold-400/20 transition-all duration-200 hover:shadow-gold-400/30",
  secondary:
    "bg-forest-600 text-ivory-100 hover:bg-forest-500 border border-forest-400/30 transition-all duration-200",
  ghost:
    "text-ivory-300 hover:text-gold-200 hover:bg-forest-600/50 transition-all duration-200",
  outline:
    "border border-gold-400/50 text-gold-200 hover:bg-gold-400/10 hover:border-gold-400 transition-all duration-200",
  danger:
    "bg-burgundy-700 text-ivory-50 hover:bg-burgundy-800 transition-all duration-200",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 rounded-lg",
  md: "text-base px-5 py-2.5 rounded-xl",
  lg: "text-lg px-7 py-3.5 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-sans transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
