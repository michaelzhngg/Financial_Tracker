export interface NavTab {
  name: string;
  path: string;
  /** Material Symbols ligature name. */
  icon: string;
}

export const navTabs: NavTab[] = [
  { name: 'Dashboard', path: '/', icon: 'dashboard' },
  { name: 'Accounts', path: '/accounts', icon: 'account_balance' },
  { name: 'Transactions', path: '/transactions', icon: 'receipt_long' },
  { name: 'Categories', path: '/categories', icon: 'category' },
  { name: 'Budgets', path: '/budgets', icon: 'monitoring' },
];