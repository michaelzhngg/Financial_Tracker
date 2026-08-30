import type {
  Account,
  AccountType,
  AuthResponse,
  Budget,
  BudgetPeriod,
  Category,
  CategoryType,
  Dashboard,
  MonthlySummary,
  PagedResult,
  ReceiptRequest,
  Transaction,
  TransactionType,
  User,
} from '../types/api';

const TOKEN_KEY = 'ft.token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (response.status === 401) {
    setToken(null);
    window.dispatchEvent(new CustomEvent('ft:unauthorized'));
    throw new ApiError('Your session has expired. Please sign in again.', 401);
  }

  if (!response.ok) {
    let message = 'Something went wrong. Please try again.';

    try {
      const problem = await response.json();
      message = problem?.detail || problem?.title || message;
    } catch {
      // Response had no JSON body; keep the default message.
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function query(params: Record<string, string | number | boolean | null | undefined>) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      search.append(key, String(value));
    }
  });

  const result = search.toString();

  return result ? `?${result}` : '';
}

export interface TransactionQuery {
  from?: string;
  to?: string;
  accountId?: string;
  categoryId?: string;
  type?: TransactionType | '';
  search?: string;
  page?: number;
  pageSize?: number;
}

export const api = {
  auth: {
    register: (body: { email: string; displayName: string; password: string; baseCurrency: string }) =>
      request<AuthResponse>('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    login: (body: { email: string; password: string }) =>
      request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    me: () => request<User>('/auth/me'),
    updateProfile: (body: { displayName: string; baseCurrency: string }) =>
      request<User>('/auth/me', { method: 'PUT', body: JSON.stringify(body) }),
    changePassword: (body: { currentPassword: string; newPassword: string }) =>
      request<void>('/auth/change-password', { method: 'POST', body: JSON.stringify(body) }),
  },

  accounts: {
    list: (includeInactive = true) => request<Account[]>(`/accounts${query({ includeInactive })}`),
    create: (body: { name: string; type: AccountType; currency: string; initialBalance: number }) =>
      request<Account>('/accounts', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: { name: string; type: AccountType; currency: string }) =>
      request<Account>(`/accounts/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    deactivate: (id: string) => request<Account>(`/accounts/${id}/deactivate`, { method: 'POST' }),
    reactivate: (id: string) => request<Account>(`/accounts/${id}/reactivate`, { method: 'POST' }),
    adjustBalance: (id: string, body: { actualBalance: number; reason?: string; date?: string }) =>
      request<Transaction>(`/accounts/${id}/adjust-balance`, { method: 'POST', body: JSON.stringify(body) }),
    remove: (id: string) => request<void>(`/accounts/${id}`, { method: 'DELETE' }),
  },

  categories: {
    list: (includeInactive = true) => request<Category[]>(`/categories${query({ includeInactive })}`),
    create: (body: { name: string; type: CategoryType; color?: string; icon?: string }) =>
      request<Category>('/categories', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: { name: string; type: CategoryType; color?: string; icon?: string }) =>
      request<Category>(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    deactivate: (id: string) => request<Category>(`/categories/${id}/deactivate`, { method: 'POST' }),
    reactivate: (id: string) => request<Category>(`/categories/${id}/reactivate`, { method: 'POST' }),
    remove: (id: string) => request<void>(`/categories/${id}`, { method: 'DELETE' }),
  },

  transactions: {
    list: (filter: TransactionQuery = {}) =>
      request<PagedResult<Transaction>>(`/transactions${query({ ...filter })}`),
    get: (id: string) => request<Transaction>(`/transactions/${id}`),
    create: (body: {
      type: TransactionType;
      accountId: string;
      toAccountId?: string | null;
      categoryId?: string | null;
      amount: number;
      description?: string;
      transactionDate?: string;
      receipt?: ReceiptRequest | null;
    }) => request<Transaction>('/transactions', { method: 'POST', body: JSON.stringify(body) }),
    update: (
      id: string,
      body: {
        accountId: string;
        toAccountId?: string | null;
        categoryId?: string | null;
        amount: number;
        description?: string;
        transactionDate?: string;
        receipt?: ReceiptRequest | null;
      },
    ) => request<Transaction>(`/transactions/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    remove: (id: string) => request<void>(`/transactions/${id}`, { method: 'DELETE' }),
  },

  budgets: {
    list: (includeInactive = true) => request<Budget[]>(`/budgets${query({ includeInactive })}`),
    create: (body: { categoryId: string; amount: number; period: BudgetPeriod }) =>
      request<Budget>('/budgets', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: { categoryId: string; amount: number; period: BudgetPeriod }) =>
      request<Budget>(`/budgets/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    deactivate: (id: string) => request<Budget>(`/budgets/${id}/deactivate`, { method: 'POST' }),
    reactivate: (id: string) => request<Budget>(`/budgets/${id}/reactivate`, { method: 'POST' }),
    remove: (id: string) => request<void>(`/budgets/${id}`, { method: 'DELETE' }),
  },

  summary: {
    dashboard: () => request<Dashboard>('/summary/dashboard'),
    monthly: (year: number, month: number) => request<MonthlySummary>(`/summary/monthly${query({ year, month })}`),
  },
};

