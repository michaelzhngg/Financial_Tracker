import { AnimatePresence, motion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import Icon from "./Icon";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Bottom sheet on mobile, centred dialog on desktop, matching the design's
 * "New Transaction" modal shell.
 */
export default function Modal({ open, title, description, onClose, children, footer, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex h-[100dvh] items-end justify-center overflow-hidden bg-background/60 backdrop-blur-sm md:items-center md:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn("glass-panel z-50 flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-[32px] md:max-h-[85dvh] md:max-w-md md:rounded-[32px]", className)}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-6 py-6">
              <div className="min-w-0">
                <h2 className="font-headline-md text-headline-md truncate tracking-tight text-on-surface">{title}</h2>
                {description && <p className="font-body-md text-body-md mt-1 text-on-surface-variant opacity-80">{description}</p>}
              </div>
              <button type="button" onClick={onClose} aria-label="Close" className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10">
                <Icon name="close" size={20} className="text-on-surface-variant transition-colors group-hover:text-on-surface" />
              </button>
            </div>

            <div className="no-scrollbar flex-1 space-y-8 overflow-y-auto px-6 py-8">{children}</div>

            {footer && <div className="shrink-0 border-t border-white/5 bg-black/20 px-6 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
