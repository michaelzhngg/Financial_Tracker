import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import Icon from "./Icon";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const MOBILE_BREAKPOINT = 768;

/**
 * Custom dropdown. Native <select> popups are drawn by the OS and cannot be
 * styled, so the listbox is rendered in the app's own glass styling instead.
 *
 * The panel is portalled to the body: inside a scrollable modal an absolutely
 * positioned panel gets clipped, which made long option lists unscrollable on
 * mobile. Small screens get a bottom sheet, larger screens an anchored panel.
 */
export default function Select({ id, value, options, onChange, placeholder = "Select an option", required, className }: SelectProps) {
  const [isOpen, setOpen] = useState(false);
  const [isMobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT);
  const [anchor, setAnchor] = useState<{ top: number; left: number; width: number; maxHeight: number } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < MOBILE_BREAKPOINT);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** Positions the desktop panel below the trigger, flipping up when tight. */
  const reposition = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const gap = 8;
    const below = window.innerHeight - rect.bottom - gap;
    const above = rect.top - gap;
    const openUp = below < 200 && above > below;
    const maxHeight = Math.min(288, openUp ? above : below);

    setAnchor({
      top: openUp ? rect.top - gap - maxHeight : rect.bottom + gap,
      left: rect.left,
      width: rect.width,
      maxHeight,
    });
  };

  useLayoutEffect(() => {
    if (!isOpen || isMobile) return;

    reposition();

    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);

    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;

      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const optionList = (
    <>
      {options.length === 0 ? (
        <p className="font-body-md text-body-md px-3 py-3 text-on-surface-variant opacity-70">No options</p>
      ) : (
        options.map((option) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                "font-body-md text-body-md flex w-full items-center justify-between gap-2 rounded-lg px-3 text-left transition-colors",
                isMobile ? "py-3.5" : "py-2.5",
                isSelected ? "bg-primary/15 text-primary" : "text-on-surface hover:bg-white/10 hover:text-on-surface",
              )}
            >
              <span className="truncate">{option.label}</span>
              {isSelected && <Icon name="check" size={18} className="shrink-0" />}
            </button>
          );
        })
      )}
    </>
  );

  return (
    <div className={cn("relative w-full", className)}>
      {/* Mirrors the value so native form validation still applies. */}
      <input id={id} value={value} required={required} readOnly tabIndex={-1} aria-hidden className="sr-only" />

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="font-body-lg text-body-lg flex w-full items-center justify-between gap-2 bg-transparent text-left text-on-surface focus:outline-none"
      >
        <span className={cn("truncate", !selected && "text-on-surface-variant/50")}>{selected?.label ?? placeholder}</span>
        <Icon name="expand_more" size={20} className={cn("shrink-0 text-on-surface-variant transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen &&
        createPortal(
          isMobile ? (
            <div className="fixed inset-0 z-[100] flex flex-col justify-end">
              <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />

              <div ref={panelRef} role="listbox" className="relative flex max-h-[70dvh] flex-col rounded-t-2xl border-t border-white/15 bg-surface-container p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-2xl shadow-black/50">
                <div className="mx-auto mb-2 h-1 w-10 shrink-0 rounded-full bg-white/20" />
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{optionList}</div>
              </div>
            </div>
          ) : (
            <div
              ref={panelRef}
              role="listbox"
              style={{
                top: anchor?.top ?? 0,
                left: anchor?.left ?? 0,
                width: anchor?.width ?? 0,
                maxHeight: anchor?.maxHeight ?? 288,
                visibility: anchor ? "visible" : "hidden",
              }}
              className="fixed z-[100] overflow-y-auto overscroll-contain rounded-xl border border-white/15 bg-surface-container/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-2xl"
            >
              {optionList}
            </div>
          ),
          document.body,
        )}
    </div>
  );
}
