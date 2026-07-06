import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "gold" | "forest" | "burgundy" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: "bg-gold-400/15 text-gold-200 border-gold-400/30",
  forest: "bg-forest-600/50 text-ivory-200 border-forest-400/30",
  burgundy: "bg-burgundy-700/30 text-burgundy-700 border-burgundy-700/30",
  outline: "border-gold-400/40 text-gold-200 bg-transparent",
};

export function Badge({ className, variant = "gold", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
