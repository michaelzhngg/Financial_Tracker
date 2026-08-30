import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import MobileHeader from "./components/MobileHeader";
import TopAppBar from "./components/TopAppBar";
import Accounts from "./pages/Accounts";
import Budgets from "./pages/Budgets";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Summary from "./pages/Summary";
import Transactions from "./pages/Transactions";
import { useAuthStore } from "./store/useAuthStore";
import { useFinanceStore } from "./store/useFinanceStore";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/accounts": "Accounts",
  "/transactions": "Transactions",
  "/categories": "Categories",
  "/budgets": "Budgets",
  "/summary": "Summary",
  "/profile": "Profile",
};

function AtmosphericGlow() {
  return (
    <>
      <div className="atmospheric-glow-1" aria-hidden="true" />
      <div className="atmospheric-glow-2" aria-hidden="true" />
    </>
  );
}

function AuthRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/signin" replace state={{ from: location.pathname }} />} />
    </Routes>
  );
}

function AppShell() {
  const location = useLocation();
  const refreshAll = useFinanceStore((state) => state.refreshAll);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  return (
    <div className="relative min-h-screen pb-[80px] md:pb-0">
      <AtmosphericGlow />
      <TopAppBar />
      <MobileHeader title={PAGE_TITLES[location.pathname] ?? "Aura Finance"} />

      <main className="relative z-10 mx-auto w-full max-w-container-max px-margin-mobile py-8 pb-32 md:px-margin-desktop md:pb-12">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <BottomNav />
    </div>
  );
}

function Root() {
  const { isAuthenticated, isBootstrapping, bootstrap } = useAuthStore();

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  if (isBootstrapping) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-primary" />
      </div>
    );
  }

  if (isAuthenticated) return <AppShell />;

  return (
    <div className="relative min-h-screen">
      <AtmosphericGlow />
      <AuthRoutes />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}
