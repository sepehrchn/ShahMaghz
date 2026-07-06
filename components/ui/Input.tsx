import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ivory-200">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-forest-900/60 border text-ivory-100 placeholder:text-ivory-400/50",
            "border-forest-500/40 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20",
            "transition-all duration-200 outline-none",
            error && "border-burgundy-700/60 focus:border-burgundy-700 focus:ring-burgundy-700/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-burgundy-700">{error}</p>}
        {hint && !error && <p className="text-xs text-ivory-400/60">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-ivory-200">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-forest-900/60 border text-ivory-100 placeholder:text-ivory-400/50",
            "border-forest-500/40 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20",
            "transition-all duration-200 outline-none resize-none",
            error && "border-burgundy-700/60",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-burgundy-700">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
