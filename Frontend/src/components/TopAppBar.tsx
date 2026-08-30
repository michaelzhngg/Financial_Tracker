import { NavLink, useNavigate } from "react-router-dom";
import { initialsOf } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";
import Icon from "./Icon";
import { navTabs } from "./navTabs";

/** Desktop top app bar. Hidden below the md breakpoint, where MobileHeader takes over. */
export default function TopAppBar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-40 hidden w-full max-w-container-max mx-auto items-center justify-between border-b border-white/10 bg-white/5 px-margin-desktop py-unit backdrop-blur-xl md:flex">
      <button type="button" onClick={() => navigate("/")} className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-surface-container text-label-md font-bold text-primary">{initialsOf(user?.displayName ?? "FT")}</div>
        <span className="font-headline-md text-headline-md font-bold text-primary">Aura Finance</span>
      </button>

      <nav className="flex items-center gap-8">
        {navTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === "/"}
            className={({ isActive }) => `font-label-md text-label-md flex items-center gap-2 transition-opacity hover:opacity-80 active:scale-95 ${isActive ? "font-bold text-primary" : "text-on-surface-variant"}`}
          >
            {({ isActive }) => (
              <>
                <Icon name={tab.icon} filled={isActive} size={22} />
                {tab.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button type="button" onClick={() => navigate("/summary")} aria-label="Monthly summary" className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-white/5">
          <Icon name="pie_chart" />
        </button>
        <button type="button" onClick={() => navigate("/profile")} aria-label="Profile" className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-white/5">
          <Icon name="settings" />
        </button>
      </div>
    </header>
  );
}
