import { create } from "zustand";
import { api } from "../lib/api";
import type { Account, Budget, Category, Dashboard } from "../types/api";

interface FinanceState {
  accounts: Account[];
  categories: Category[];
  budgets: Budget[];
  dashboard: Dashboard | null;
  isLoading: boolean;
  hasLoaded: boolean;
  error: string | null;
  ensureLoaded: () => Promise<void>;
  loadReferenceData: () => Promise<void>;
  loadDashboard: () => Promise<void>;
  refreshAll: () => Promise<void>;
  reset: () => void;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  accounts: [],
  categories: [],
  budgets: [],
  dashboard: null,
  isLoading: false,
  hasLoaded: false,
  error: null,

  ensureLoaded: async () => {
    const { hasLoaded, isLoading } = get();
    if (hasLoaded || isLoading) return;
    await get().refreshAll();
  },

  loadReferenceData: async () => {
    const [accounts, categories, budgets] = await Promise.all([api.accounts.list(true), api.categories.list(true), api.budgets.list(true)]);

    set({ accounts, categories, budgets });
  },

  loadDashboard: async () => {
    const dashboard = await api.summary.dashboard();
    set({ dashboard });
  },

  refreshAll: async () => {
    set({ isLoading: true, error: null });

    try {
      await Promise.all([get().loadReferenceData(), get().loadDashboard()]);
      set({ hasLoaded: true });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to load your data.", hasLoaded: true });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set({ accounts: [], categories: [], budgets: [], dashboard: null, error: null, hasLoaded: false }),
}));
