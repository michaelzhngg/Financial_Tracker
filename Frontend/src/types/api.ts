export type AccountType = "Bank" | "Cash" | "EWallet" | "CreditCard" | "Savings" | "Other";

export type CategoryType = "Income" | "Expense";

export type TransactionType = "Income" | "Expense" | "Transfer" | "Adjustment";

export type BudgetPeriod = "Monthly" | "Weekly" | "Yearly";

export interface User {
  id: string;
  email: string;
  displayName: string;
  baseCurrency: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: User;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  typeName: string;
  currency: string;
  balance: number;
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  typeName: string;
  color: string;
  icon: string;
  isActive: boolean;
}

export type ChargeType = "Percentage" | "Fixed";

export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  sortOrder: number;
}

export interface ReceiptCharge {
  id: string;
  label: string;
  type: ChargeType;
  typeName: string;
  /** Percent value when type is Percentage, otherwise a nominal amount. */
  value: number;
  /** Resolved currency amount for this charge. */
  amount: number;
  sortOrder: number;
}

export interface Receipt {
  id: string;
  merchant: string;
  notes: string;
  subtotal: number;
  chargesTotal: number;
  total: number;
  items: ReceiptItem[];
  charges: ReceiptCharge[];
}

export interface ReceiptItemRequest {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface ReceiptChargeRequest {
  label: string;
  type: ChargeType;
  value: number;
}

export interface ReceiptRequest {
  merchant?: string;
  notes?: string;
  items: ReceiptItemRequest[];
  charges: ReceiptChargeRequest[];
}

export interface Transaction {
  id: string;
  type: TransactionType;
  typeName: string;
  accountId: string;
  accountName: string;
  currency: string;
  toAccountId: string | null;
  toAccountName: string | null;
  categoryId: string | null;
  categoryName: string | null;
  categoryColor: string | null;
  amount: number;
  signedAmount: number;
  description: string;
  transactionDate: string;
  createdAt: string;
  receipt: Receipt | null;
}

export interface Budget {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
  period: BudgetPeriod;
  periodName: string;
  isActive: boolean;
  spent: number;
  remaining: number;
  percentUsed: number;
  daysRemaining: number;
  totalDaysInPeriod: number;
  dailyAllowance: number;
  isOverBudget: boolean;
  periodStart: string;
  periodEnd: string;
}

export interface CategorySpend {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
  percentOfTotal: number;
}

export interface AccountBalance {
  accountId: string;
  accountName: string;
  currency: string;
  balance: number;
}

export interface MonthlySummary {
  year: number;
  month: number;
  monthLabel: string;
  totalIncome: number;
  totalExpenses: number;
  netChange: number;
  totalAdjustments: number;
  totalTransfers: number;
  transactionCount: number;
  spendingByCategory: CategorySpend[];
  incomeByCategory: CategorySpend[];
}

export interface Dashboard {
  baseCurrency: string;
  totalBalance: number;
  accounts: AccountBalance[];
  balanceByCurrency: Record<string, number>;
  currentMonth: MonthlySummary;
  budgets: Budget[];
  recentTransactions: Transaction[];
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
