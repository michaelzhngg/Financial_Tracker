import { create } from 'zustand';
import { api, getToken, setToken } from '../lib/api';
import type { User } from '../types/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  bootstrap: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, displayName: string, password: string, baseCurrency: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isBootstrapping: true,

  bootstrap: async () => {
    if (!getToken()) {
      set({ isBootstrapping: false, isAuthenticated: false, user: null });
      return;
    }

    try {
      const user = await api.auth.me();
      set({ user, isAuthenticated: true, isBootstrapping: false });
    } catch {
      setToken(null);
      set({ user: null, isAuthenticated: false, isBootstrapping: false });
    }
  },

  login: async (email, password) => {
    const response = await api.auth.login({ email, password });
    setToken(response.token);
    set({ user: response.user, isAuthenticated: true, isBootstrapping: false });
  },

  register: async (email, displayName, password, baseCurrency) => {
    const response = await api.auth.register({ email, displayName, password, baseCurrency });
    setToken(response.token);
    set({ user: response.user, isAuthenticated: true, isBootstrapping: false });
  },

  logout: () => {
    setToken(null);
    set({ user: null, isAuthenticated: false });
  },

  setUser: (user) => set({ user }),
}));

// The api client raises this when a request comes back 401 so the app can drop to the sign-in screen.
window.addEventListener('ft:unauthorized', () => {
  useAuthStore.setState({ user: null, isAuthenticated: false });
});

