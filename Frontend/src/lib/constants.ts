import type { AccountType, BudgetPeriod, CategoryType, TransactionType } from '../types/api';

export const CURRENCIES = [
  { code: 'MYR', name: 'Malaysian Ringgit' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'THB', name: 'Thai Baht' },
  { code: 'IDR', name: 'Indonesian Rupiah' },
];

export const ACCOUNT_TYPES: { value: AccountType; label: string }[] = [
  { value: 'Bank', label: 'Bank account' },
  { value: 'Cash', label: 'Cash' },
  { value: 'EWallet', label: 'E-wallet' },
  { value: 'CreditCard', label: 'Credit card' },
  { value: 'Savings', label: 'Savings' },
  { value: 'Other', label: 'Other' },
];

export const CATEGORY_TYPES: { value: CategoryType; label: string }[] = [
  { value: 'Expense', label: 'Expense' },
  { value: 'Income', label: 'Income' },
];

export const TRANSACTION_TYPES: { value: TransactionType; label: string }[] = [
  { value: 'Expense', label: 'Expense' },
  { value: 'Income', label: 'Income' },
  { value: 'Transfer', label: 'Transfer' },
  { value: 'Adjustment', label: 'Adjustment' },
];

export const BUDGET_PERIODS: { value: BudgetPeriod; label: string }[] = [
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Yearly', label: 'Yearly' },
];

export const CATEGORY_COLORS = [
  '#4647d3',
  '#00628c',
  '#9e00b4',
  '#10a86c',
  '#f5a623',
  '#e44870',
  '#008b87',
  '#9b7cff',
  '#d28700',
  '#747779',
];

export function transactionTone(type: TransactionType) {
  switch (type) {
    case 'Income':
      return 'income' as const;
    case 'Expense':
      return 'expense' as const;
    case 'Transfer':
      return 'transfer' as const;
    default:
      return 'adjustment' as const;
  }
}
