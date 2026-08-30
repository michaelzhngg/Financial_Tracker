import { cn } from "../lib/utils";

interface IconProps {
  /** Material Symbols Outlined ligature name, e.g. "dashboard". */
  name: string;
  filled?: boolean;
  className?: string;
  /** Optical size in px; also drives the rendered font-size. */
  size?: number;
}

export default function Icon({ name, filled = false, className, size }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-outlined select-none leading-none", className)}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'opsz' ${size ?? 24}`,
        ...(size ? { fontSize: `${size}px` } : {}),
      }}
    >
      {name}
    </span>
  );
}
