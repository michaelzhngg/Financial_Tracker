import { useNavigate } from "react-router-dom";
import { initialsOf } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";
import Icon from "./Icon";

/** Mobile-only top header. The page title changes per route. */
export default function MobileHeader({ title }: { title: string }) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-white/10 bg-white/5 px-margin-mobile py-unit backdrop-blur-xl md:hidden">
      <button
        type="button"
        onClick={() => navigate("/profile")}
        aria-label="Profile"
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-surface-container-high text-[11px] font-bold text-primary"
      >
        {initialsOf(user?.displayName ?? "FT")}
      </button>

      <span className="font-headline-md text-headline-md truncate px-3 text-xl font-bold text-primary">{title}</span>

      <button type="button" onClick={() => navigate("/summary")} aria-label="Monthly summary" className="text-primary transition-transform active:scale-95">
        <Icon name="pie_chart" />
      </button>
    </header>
  );
}
