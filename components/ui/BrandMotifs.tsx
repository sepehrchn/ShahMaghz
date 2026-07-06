import { cn } from "@/lib/utils";

/**
 * Wax-seal stamp badge for premium products.
 * Hand-crafted feel with rotation and gold gradient.
 */
export function WaxSeal({ className, label = "ممتاز" }: { className?: string; label?: string }) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center w-16 h-16 select-none",
        className
      )}
      aria-label={label}
    >
      <svg
        viewBox="0 0 64 64"
        className="absolute inset-0 w-full h-full animate-seal-stamp"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="wax-grad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#E7C873" />
            <stop offset="60%" stopColor="#C9A24B" />
            <stop offset="100%" stopColor="#9A6F23" />
          </radialGradient>
        </defs>
        <path
          d="M32 4 C38 5, 44 3, 48 7 C53 11, 58 14, 59 20 C61 26, 62 31, 59 37 C57 43, 58 49, 53 53 C48 57, 44 61, 37 60 C31 59, 25 62, 19 59 C13 56, 8 52, 6 46 C4 40, 3 34, 5 28 C7 22, 4 16, 9 12 C14 8, 19 4, 25 5 C28 5, 30 4, 32 4 Z"
          fill="url(#wax-grad)"
          stroke="#9A6F23"
          strokeWidth="0.5"
          opacity="0.95"
        />
        <circle cx="32" cy="32" r="22" fill="none" stroke="#0F1D14" strokeWidth="0.8" opacity="0.3" />
        <circle cx="32" cy="32" r="20" fill="none" stroke="#0F1D14" strokeWidth="0.5" opacity="0.2" />
      </svg>
      <span className="relative z-10 text-[10px] font-display font-bold text-forest-950 leading-tight text-center">
        {label}
      </span>
    </div>
  );
}

/**
 * Hand-drawn-style decorative divider.
 */
export function HandDrawnDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center py-6", className)} aria-hidden="true">
      <svg
        width="180"
        height="20"
        viewBox="0 0 180 20"
        className="text-gold-400/60"
        fill="none"
      >
        <path
          d="M5 10 C 25 7, 35 13, 55 10 S 85 7, 105 10 S 135 13, 155 10 S 170 8, 175 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="3" cy="10" r="1.5" fill="currentColor" />
        <circle cx="177" cy="10" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * Section wrapper with kraft-paper or linen texture background.
 */
export function TexturedSection({
  children,
  variant = "kraft",
  className,
}: {
  children: React.ReactNode;
  variant?: "kraft" | "linen" | "plain";
  className?: string;
}) {
  return (
    <section
      className={cn(
        variant === "kraft" && "bg-kraft-texture bg-forest-900",
        variant === "linen" && "bg-linen-texture bg-forest-800",
        variant === "plain" && "bg-forest-950",
        className
      )}
    >
      {children}
    </section>
  );
}
