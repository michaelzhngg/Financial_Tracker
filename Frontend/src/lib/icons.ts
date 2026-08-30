import type { AccountType, TransactionType } from '../types/api';

export const ACCOUNT_TYPE_ICONS: Record<AccountType, string> = {
  Bank: 'account_balance',
  Cash: 'payments',
  EWallet: 'account_balance_wallet',
  CreditCard: 'credit_card',
  Savings: 'savings',
  Other: 'category',
};

export const TRANSACTION_TYPE_ICONS: Record<TransactionType, string> = {
  Income: 'arrow_downward',
  Expense: 'arrow_upward',
  Transfer: 'swap_horiz',
  Adjustment: 'tune',
};

/**
 * Category icons are stored free-form on the backend. When the stored value is
 * not a Material Symbols ligature we fall back to a keyword match on the name.
 */
const NAME_ICON_RULES: [RegExp, string][] = [
  [/food|dining|restaurant|meal|eat/i, 'restaurant'],
  [/grocer|market|supermarket/i, 'shopping_cart'],
  [/transport|travel|car|fuel|petrol|grab|taxi|commute/i, 'commute'],
  [/entertain|movie|game|music/i, 'movie'],
  [/shop|clothe|retail/i, 'shopping_bag'],
  [/bill|utilit|electric|water|internet|phone/i, 'receipt'],
  [/educat|school|course|book/i, 'school'],
  [/health|medic|doctor|hospital|gym|fitness/i, 'favorite'],
  [/hous|rent|home|mortgage/i, 'home'],
  [/salary|wage|payroll|job/i, 'work'],
  [/freelance|contract|client/i, 'computer'],
  [/allowance|gift|bonus/i, 'redeem'],
  [/invest|dividend|interest|stock/i, 'trending_up'],
  [/saving/i, 'savings'],
  [/insur/i, 'shield'],
  [/pet/i, 'pets'],
  [/child|kid|family/i, 'family_restroom'],
  [/subscri/i, 'autorenew'],
];

export function categoryIcon(name: string, storedIcon?: string | null) {
  if (storedIcon && /^[a-z0-9_]+$/.test(storedIcon)) return storedIcon;

  const match = NAME_ICON_RULES.find(([pattern]) => pattern.test(name));

  return match ? match[1] : 'category';
}

/** Icon set offered when creating or editing a category. */
export const CATEGORY_ICON_CHOICES = [
  'restaurant',
  'shopping_cart',
  'shopping_bag',
  'commute',
  'directions_car',
  'flight_takeoff',
  'home',
  'receipt',
  'bolt',
  'school',
  'favorite',
  'fitness_center',
  'movie',
  'sports_esports',
  'music_note',
  'pets',
  'work',
  'computer',
  'trending_up',
  'savings',
  'redeem',
  'shield',
  'autorenew',
  'family_restroom',
  'category',
];


