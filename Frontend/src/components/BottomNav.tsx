import { NavLink } from "react-router-dom";
import Icon from "./Icon";
import { navTabs } from "./navTabs";

export default function BottomNav() {
  return (
    <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/10 bg-white/5 px-4 py-3 pb-safe-bottom backdrop-blur-2xl md:hidden">
      {navTabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === "/"}
          className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-90 ${isActive ? "font-bold text-secondary" : "text-on-surface-variant opacity-60 hover:opacity-100"}`}
        >
          {({ isActive }) => (
            <>
              <Icon name={tab.icon} filled={isActive} size={22} />
              <span className="font-label-md text-label-md text-[10px]">{tab.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
