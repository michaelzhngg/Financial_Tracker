import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import Icon from "./Icon";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-2 text-primary">{title}</h1>
        {subtitle && <p className="font-body-md text-body-md text-on-surface-variant">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function PrimaryButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "font-label-md text-label-md flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "font-label-md text-label-md flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-on-background transition-colors hover:bg-white/5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-on-surface-variant">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-primary" />
      <p className="font-label-md text-label-md uppercase tracking-wider">{label}</p>
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="glass-card flex flex-col items-center justify-center gap-3 rounded-xl px-6 py-14 text-center">
      <Icon name="inbox" className="text-on-surface-variant opacity-50" size={32} />
      <p className="font-body-lg text-body-lg text-on-surface">{title}</p>
      {description && <p className="font-body-md text-body-md max-w-sm text-on-surface-variant opacity-80">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <p role="alert" className="font-label-md text-label-md flex items-start gap-2 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-error">
      <Icon name="error" size={18} className="mt-px shrink-0" />
      {message}
    </p>
  );
}

export function SuccessBanner({ message }: { message: string }) {
  return (
    <p className="font-label-md text-label-md flex items-start gap-2 rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-3 text-secondary">
      <Icon name="check_circle" size={18} className="mt-px shrink-0" />
      {message}
    </p>
  );
}

/** Floating-label field wrapper matching the design's "Add Transaction" form. */
export function Field({ label, htmlFor, icon, children, hint }: { label: string; htmlFor?: string; icon?: string; children: ReactNode; hint?: string }) {
  return (
    <div className="group relative">
      <label htmlFor={htmlFor} className="absolute -top-2.5 left-4 z-10 rounded-sm bg-surface-container-lowest px-1 text-[12px] font-semibold uppercase tracking-wider text-on-surface-variant">
        {label}
      </label>
      <div className="glass-input flex items-center rounded-xl border border-white/10 px-4 py-3 transition-colors group-focus-within:border-primary/50">
        {icon && <Icon name={icon} size={20} className="mr-3 shrink-0 text-on-surface-variant" />}
        {children}
      </div>
      {hint && <p className="mt-1.5 px-1 text-[11px] text-on-surface-variant opacity-70">{hint}</p>}
    </div>
  );
}

/** Bare input styling for use inside <Field>. */
export const fieldInputClass = "font-body-lg text-body-lg w-full border-none bg-transparent p-0 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0";

export function Pill({ tone = "neutral", children }: { tone?: "neutral" | "income" | "expense" | "transfer" | "adjustment" | "muted" | "warning"; children: ReactNode }) {
  const tones: Record<string, string> = {
    neutral: "border-primary/20 bg-primary/10 text-primary",
    income: "border-secondary/20 bg-secondary/10 text-secondary",
    expense: "border-error/20 bg-error/10 text-error",
    transfer: "border-primary-fixed-dim/20 bg-primary-fixed-dim/10 text-primary-fixed-dim",
    adjustment: "border-tertiary-fixed-dim/20 bg-tertiary-fixed-dim/10 text-tertiary-fixed-dim",
    warning: "border-yellow-400/20 bg-yellow-400/10 text-yellow-400",
    muted: "border-white/10 bg-white/5 text-on-surface-variant",
  };

  return <span className={cn("font-label-md text-label-md inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs", tones[tone])}>{children}</span>;
}

/** Full-width progress bar used by budgets and summaries. */
export function ProgressBar({ percent, tone = "primary" }: { percent: number; tone?: "primary" | "secondary" | "warning" | "error" }) {
  const tones: Record<string, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    warning: "bg-yellow-400",
    error: "bg-error",
  };

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
      <div className={cn("h-full rounded-full transition-all group-hover:brightness-110", tones[tone])} style={{ width: `${Math.min(100, Math.max(0, percent))}%` }} />
    </div>
  );
}
