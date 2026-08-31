import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router-dom";
import Icon from "../components/Icon";
import Calculator from "../components/Calculator";
import Modal from "../components/Modal";
import Select from "../components/Select";
import ReceiptEditor, { computeReceiptTotals, emptyReceiptDraft, type ReceiptDraft } from "../components/ReceiptEditor";
import { EmptyState, ErrorBanner, Field, LoadingState, Pill, fieldInputClass } from "../components/ui";
import { api, type TransactionQuery } from "../lib/api";
import { transactionTone } from "../lib/constants";
import { TRANSACTION_TYPE_ICONS, categoryIcon } from "../lib/icons";
import { cn, currencySymbol, formatDate, formatDateTime, formatMoney, toDateTimeLocalValue } from "../lib/utils";
import { useFinanceStore } from "../store/useFinanceStore";
import type { Transaction, TransactionType } from "../types/api";

type FormType = Extract<TransactionType, "Income" | "Expense" | "Transfer">;

interface TxnForm {
  type: FormType;
  accountId: string;
  toAccountId: string;
  categoryId: string;
  amount: string;
  description: string;
  transactionDate: string;
}

const PAGE_SIZE = 50;

const TYPE_CHIPS: { value: TransactionType | ""; label: string; className: string }[] = [
  {
    value: "",
    label: "All Transactions",
    className: "bg-primary/20 border-primary text-primary hover:bg-primary/30",
  },
  { value: "Income", label: "Income", className: "bg-secondary/10 border-secondary text-secondary hover:bg-secondary/20" },
  { value: "Expense", label: "Expenses", className: "bg-error/10 border-error text-error hover:bg-error/20" },
  {
    value: "Transfer",
    label: "Transfers",
    className: "bg-primary-fixed-dim/10 border-primary-fixed-dim text-primary-fixed-dim hover:bg-primary-fixed-dim/20",
  },
  {
    value: "Adjustment",
    label: "Adjustments",
    className: "bg-tertiary-fixed-dim/10 border-tertiary-fixed-dim text-tertiary-fixed-dim hover:bg-tertiary-fixed-dim/20",
  },
];

function emptyForm(accountId: string): TxnForm {
  return {
    type: "Expense",
    accountId,
    toAccountId: "",
    categoryId: "",
    amount: "",
    description: "",
    transactionDate: toDateTimeLocalValue(new Date()),
  };
}

export interface DayGroup {
  key: string;
  label: string;
  items: Transaction[];
  net: number;
}

export interface PeriodGroup {
  key: string;
  label: string;
  days: DayGroup[];
  net: number;
}

const netOf = (items: Transaction[]) => items.reduce((sum, item) => sum + item.signedAmount, 0);

/**
 * Groups transactions into fixed calendar blocks of the month (1-7, 8-14,
 * 15-21, 22-28, 29-end), each containing per-day groups. Totals are kept at
 * both levels.
 */
function groupByPeriod(items: Transaction[]): PeriodGroup[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const days = new Map<string, DayGroup>();

  items.forEach((item) => {
    const date = new Date(item.transactionDate);
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const key = dayStart.toISOString();

    let label = formatDate(date);
    if (key === today.toISOString()) label = "Today";
    else if (key === yesterday.toISOString()) label = "Yesterday";

    const group = days.get(key) ?? { key, label, items: [], net: 0 };
    group.items.push(item);
    days.set(key, group);
  });

  const periods = new Map<string, PeriodGroup>();

  [...days.values()].forEach((day) => {
    day.net = netOf(day.items);

    const date = new Date(day.key);
    // Block index 0..4; the final block absorbs days 29 to the month end.
    const blockIndex = Math.min(4, Math.floor((date.getDate() - 1) / 7));
    const startDay = blockIndex * 7 + 1;
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const endDay = blockIndex === 4 ? lastDay : startDay + 6;

    const periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${blockIndex}`;
    const monthName = date.toLocaleString(undefined, { month: "short" });

    const period =
      periods.get(periodKey) ??
      ({
        key: periodKey,
        label: `${monthName} ${startDay}–${endDay}`,
        days: [],
        net: 0,
      } satisfies PeriodGroup);

    period.days.push(day);
    periods.set(periodKey, period);
  });

  return [...periods.values()]
    .map((period) => ({
      ...period,
      days: period.days.sort((a, b) => b.key.localeCompare(a.key)),
      net: period.days.reduce((sum, day) => sum + day.net, 0),
    }))
    .sort((a, b) => b.key.localeCompare(a.key));
}

type DateRangeKey = "today" | "week" | "month" | "thisMonth" | "custom";

const DATE_RANGES: { key: DateRangeKey; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "Last 7 Days" },
  { key: "month", label: "Last 30 Days" },
  { key: "thisMonth", label: "This Month" },
  { key: "custom", label: "Custom" },
];

const toDateInputValue = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

/** Resolves a preset into concrete from/to dates. Custom keeps the current values. */
function resolveRange(key: DateRangeKey): { from: string; to: string } | null {
  const today = new Date();
  const to = toDateInputValue(today);

  switch (key) {
    case "today":
      return { from: to, to };
    case "week": {
      const from = new Date(today);
      from.setDate(from.getDate() - 6);

      return { from: toDateInputValue(from), to };
    }
    case "month": {
      const from = new Date(today);
      from.setDate(from.getDate() - 29);

      return { from: toDateInputValue(from), to };
    }
    case "thisMonth":
      return { from: toDateInputValue(new Date(today.getFullYear(), today.getMonth(), 1)), to };
    default:
      return null;
  }
}

export default function Transactions() {
  const { accounts, categories, refreshAll, ensureLoaded, dashboard } = useFinanceStore();
  const baseCurrency = dashboard?.baseCurrency ?? "MYR";
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [listError, setListError] = useState("");

  const [filters, setFilters] = useState<TransactionQuery>(() => {
    const today = toDateInputValue(new Date());

    return { from: today, to: today, accountId: "", categoryId: "", type: "", search: "" };
  });
  const [rangeKey, setRangeKey] = useState<DateRangeKey>("today");
  const [showFilters, setShowFilters] = useState(false);

  const [isFormOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [form, setForm] = useState<TxnForm>(emptyForm(""));
  const [formError, setFormError] = useState("");
  const [isSaving, setSaving] = useState(false);
  const [detail, setDetail] = useState<Transaction | null>(null);
  const [isCalculatorOpen, setCalculatorOpen] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptDraft | null>(null);
  const [expandedReceipt, setExpandedReceipt] = useState<string | null>(null);

  // When a receipt is attached the amount is derived from it and locked.
  const receiptTotals = useMemo(() => (receipt ? computeReceiptTotals(receipt) : null), [receipt]);
  const effectiveAmount = receiptTotals ? String(receiptTotals.total) : form.amount;

  const activeAccounts = useMemo(() => accounts.filter((account) => account.isActive), [accounts]);

  const rangeIndex = DATE_RANGES.findIndex((range) => range.key === rangeKey);

  /** Switches the preset and rewrites the date filters to match it. */
  const applyRange = useCallback((key: DateRangeKey) => {
    setRangeKey(key);

    const resolved = resolveRange(key);
    if (resolved) setFilters((current) => ({ ...current, ...resolved }));
    else setShowFilters(true);
  }, []);

  /** Currency shown next to the amount input, falling back to the user's base currency. */
  const formCurrency = accounts.find((account) => account.id === form.accountId)?.currency ?? baseCurrency;

  const load = useCallback(
    async (targetPage: number) => {
      setLoading(true);
      setListError("");

      try {
        const result = await api.transactions.list({
          ...filters,
          from: filters.from ? new Date(`${filters.from}T00:00:00`).toISOString() : undefined,
          to: filters.to ? new Date(`${filters.to}T23:59:59`).toISOString() : undefined,
          page: targetPage,
          pageSize: PAGE_SIZE,
        });

        setItems(result.items);
        setTotal(result.totalCount);
        setPage(result.page);
      } catch (error) {
        setListError(error instanceof Error ? error.message : "Unable to load transactions.");
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    void load(1);
  }, [load]);

  useEffect(() => {
    void ensureLoaded();
  }, [ensureLoaded]);

  const openCreate = useCallback(() => {
    setEditing(null);
    setForm(emptyForm(activeAccounts[0]?.id ?? ""));
    setReceipt(null);
    setFormError("");
    setFormOpen(true);
  }, [activeAccounts]);

  // Allows other screens to deep-link straight into the create form.
  useEffect(() => {
    if (searchParams.get("new") === "1") {
      openCreate();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams, openCreate]);

  const formCategories = useMemo(() => categories.filter((category) => category.isActive && category.type === form.type), [categories, form.type]);

  const openEdit = (transaction: Transaction) => {
    if (transaction.type === "Adjustment") return;

    setEditing(transaction);
    setForm({
      type: transaction.type as FormType,
      accountId: transaction.accountId,
      toAccountId: transaction.toAccountId ?? "",
      categoryId: transaction.categoryId ?? "",
      amount: String(transaction.amount),
      description: transaction.description ?? "",
      transactionDate: toDateTimeLocalValue(new Date(transaction.transactionDate)),
    });
    setReceipt(
      transaction.receipt
        ? {
            merchant: transaction.receipt.merchant,
            notes: transaction.receipt.notes,
            items: transaction.receipt.items.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })),
            charges: transaction.receipt.charges.map((charge) => ({
              label: charge.label,
              type: charge.type,
              value: charge.value,
            })),
          }
        : null,
    );
    setFormError("");
    setDetail(null);
    setFormOpen(true);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setFormError("");

    try {
      // A receipt is only meaningful for income and expenses, and when present
      // it determines the transaction amount.
      const receiptPayload =
        receipt && form.type !== "Transfer" && receipt.items.length > 0
          ? {
              merchant: receipt.merchant || undefined,
              notes: receipt.notes || undefined,
              items: receipt.items.map((item) => ({
                name: item.name,
                quantity: Number(item.quantity) || 0,
                unitPrice: Number(item.unitPrice) || 0,
              })),
              charges: receipt.charges.filter((charge) => charge.label.trim().length > 0).map((charge) => ({ label: charge.label, type: charge.type, value: Number(charge.value) || 0 })),
            }
          : null;

      const payload = {
        accountId: form.accountId,
        toAccountId: form.type === "Transfer" ? form.toAccountId : null,
        categoryId: form.type === "Transfer" ? null : form.categoryId || null,
        amount: Number(effectiveAmount),
        description: form.description || undefined,
        transactionDate: new Date(form.transactionDate).toISOString(),
        receipt: receiptPayload,
      };

      if (editing) {
        await api.transactions.update(editing.id, payload);
      } else {
        await api.transactions.create({ type: form.type, ...payload });
      }

      await Promise.all([load(page), refreshAll()]);
      setFormOpen(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to save the transaction.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (transaction: Transaction) => {
    if (!window.confirm("Delete this transaction? Account balances will be updated.")) return;

    try {
      await api.transactions.remove(transaction.id);
      setDetail(null);
      await Promise.all([load(page), refreshAll()]);
    } catch (error) {
      setListError(error instanceof Error ? error.message : "Unable to delete the transaction.");
    }
  };

  const hasExtraFilters = Boolean(filters.from || filters.to || filters.accountId || filters.categoryId);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const groups = useMemo(() => groupByPeriod(items), [items]);

  return (
    <>
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative mb-6 w-full md:w-96">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
          <input
            className="glass-input font-body-md text-body-md w-full rounded-lg border-x-0 border-b border-t-0 border-white/10 py-3 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant focus:ring-0"
            placeholder="Search transactions..."
            type="text"
            value={filters.search ?? ""}
            onChange={(event) => setFilters({ ...filters, search: event.target.value })}
          />
        </div>

        <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
          {TYPE_CHIPS.map((chip) => {
            const isActive = (filters.type ?? "") === chip.value;

            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => setFilters({ ...filters, type: chip.value })}
                className={cn("font-label-md text-label-md whitespace-nowrap rounded-full border px-4 py-2 transition-colors", isActive ? chip.className : "border-white/10 bg-white/5 text-on-surface-variant hover:bg-white/10")}
              >
                {chip.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setShowFilters((value) => !value)}
            className={cn(
              "font-label-md text-label-md flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 transition-colors",
              hasExtraFilters ? "border-primary bg-primary/20 text-primary" : "border-white/10 bg-white/5 text-on-surface-variant hover:bg-white/10",
            )}
          >
            <Icon name="tune" size={18} />
            More Filters
          </button>
        </div>

        {showFilters && (
          <div className="glass-panel mt-4 grid grid-cols-1 gap-6 rounded-xl p-6 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="From" htmlFor="filter-from" icon="calendar_month">
              <input
                id="filter-from"
                type="date"
                value={filters.from ?? ""}
                onChange={(event) => {
                  setRangeKey("custom");
                  setFilters({ ...filters, from: event.target.value });
                }}
                className={fieldInputClass}
              />
            </Field>
            <Field label="To" htmlFor="filter-to" icon="calendar_month">
              <input
                id="filter-to"
                type="date"
                value={filters.to ?? ""}
                onChange={(event) => {
                  setRangeKey("custom");
                  setFilters({ ...filters, to: event.target.value });
                }}
                className={fieldInputClass}
              />
            </Field>
            <Field label="Account" htmlFor="filter-account" icon="account_balance">
              <Select
                id="filter-account"
                value={filters.accountId ?? ""}
                onChange={(next) => setFilters({ ...filters, accountId: next })}
                placeholder="All accounts"
                options={[{ value: "", label: "All accounts" }, ...accounts.map((account) => ({ value: account.id, label: account.name }))]}
              />
            </Field>
            <Field label="Category" htmlFor="filter-category" icon="category">
              <Select
                id="filter-category"
                value={filters.categoryId ?? ""}
                onChange={(next) => setFilters({ ...filters, categoryId: next })}
                placeholder="All categories"
                options={[{ value: "", label: "All categories" }, ...categories.map((category) => ({ value: category.id, label: category.name }))]}
              />
            </Field>

            <div className="sm:col-span-2 lg:col-span-4">
              <button
                type="button"
                onClick={() => {
                  setRangeKey("custom");
                  setFilters({ from: "", to: "", accountId: "", categoryId: "", type: filters.type, search: filters.search });
                }}
                className="font-label-md text-label-md text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>

      {listError && <div className="mb-6">{<ErrorBanner message={listError} />}</div>}

      {/* Transaction List */}
      {isLoading ? (
        <LoadingState label="Loading transactions" />
      ) : items.length === 0 ? (
        <EmptyState title="No transactions found" description="Try adjusting your filters, or record a new transaction." />
      ) : (
        <div className="flex flex-col gap-6">
          {groups.map((period) => (
            <div key={period.key} className="glass-panel rounded-xl p-4 md:p-6">
              {/* Period header with its combined net total */}
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <h2 className="font-headline-md text-headline-md text-on-background">{period.label}</h2>
                <span className={cn("font-headline-md text-headline-md shrink-0", period.net > 0 ? "text-secondary" : period.net < 0 ? "text-on-surface" : "text-on-surface-variant")}>
                  {period.net > 0 ? "+" : period.net < 0 ? "-" : ""}
                  {formatMoney(Math.abs(period.net), baseCurrency)}
                </span>
              </div>

              <div className="flex flex-col gap-6">
                {period.days.map((group) => (
                  <div key={group.key}>
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">{group.label}</h3>
                      <span className={cn("font-label-md text-label-md shrink-0", group.net > 0 ? "text-secondary" : "text-on-surface-variant")}>
                        {group.net > 0 ? "+" : group.net < 0 ? "-" : ""}
                        {formatMoney(Math.abs(group.net), baseCurrency)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0 overflow-hidden rounded-lg border border-white/5">
                      {group.items.map((transaction) => {
                        const isIncome = transaction.type === "Income";
                        const isExpanded = expandedReceipt === transaction.id;
                        const icon = transaction.categoryName != null ? categoryIcon(transaction.categoryName) : TRANSACTION_TYPE_ICONS[transaction.type];

                        return (
                          <div key={transaction.id} className="border-b border-white/5 last:border-b-0">
                            <div className="flex w-full items-center justify-between bg-white/5 transition-colors hover:bg-white/10">
                              <button type="button" onClick={() => setDetail(transaction)} className="flex min-w-0 flex-1 items-center justify-between gap-4 p-4 text-left">
                                <div className="flex min-w-0 items-center gap-4">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
                                    <Icon name={icon} className={isIncome ? "text-secondary" : transaction.type === "Adjustment" ? "text-tertiary-fixed-dim" : "text-on-surface-variant"} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-headline-md text-body-md truncate font-semibold text-on-surface">{transaction.description || transaction.categoryName || transaction.typeName}</p>
                                    <p className="font-label-md text-label-md truncate text-on-surface-variant opacity-80">
                                      {transaction.type === "Transfer" ? `${transaction.accountName} → ${transaction.toAccountName ?? ""}` : `${transaction.categoryName ?? transaction.typeName} • ${transaction.accountName}`}
                                    </p>
                                  </div>
                                </div>
                                <div className="shrink-0 text-right">
                                  <p className={cn("font-headline-md text-body-md font-semibold", isIncome ? "text-secondary" : "text-on-surface")}>
                                    {transaction.signedAmount > 0 ? "+" : transaction.signedAmount < 0 ? "-" : ""}
                                    {formatMoney(Math.abs(transaction.signedAmount), transaction.currency)}
                                  </p>
                                </div>
                              </button>

                              {/* Only transactions with a receipt can be expanded. */}
                              {transaction.receipt && (
                                <button
                                  type="button"
                                  aria-label={isExpanded ? "Hide receipt" : "Show receipt"}
                                  aria-expanded={isExpanded}
                                  onClick={() => setExpandedReceipt(isExpanded ? null : transaction.id)}
                                  className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
                                >
                                  <Icon name="expand_more" size={20} className={cn("transition-transform", isExpanded && "rotate-180")} />
                                </button>
                              )}
                            </div>

                            {transaction.receipt && isExpanded && (
                              <div className="flex flex-col gap-2 border-t border-white/5 bg-black/20 px-4 py-4">
                                {transaction.receipt.merchant && <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant opacity-70">{transaction.receipt.merchant}</p>}

                                {transaction.receipt.items.map((item) => (
                                  <div key={item.id} className="font-body-md text-body-md flex justify-between gap-3 text-on-surface-variant">
                                    <span className="truncate">
                                      {item.quantity} × {item.name}
                                    </span>
                                    <span className="shrink-0">{formatMoney(item.lineTotal, transaction.currency)}</span>
                                  </div>
                                ))}

                                <div className="font-body-md text-body-md flex justify-between border-t border-white/5 pt-2 text-on-surface-variant">
                                  <span>Subtotal</span>
                                  <span>{formatMoney(transaction.receipt.subtotal, transaction.currency)}</span>
                                </div>

                                {transaction.receipt.charges.map((charge) => (
                                  <div key={charge.id} className="font-body-md text-body-md flex justify-between gap-3 text-on-surface-variant">
                                    <span className="truncate">
                                      {charge.label}
                                      {charge.type === "Percentage" ? ` (${charge.value}%)` : ""}
                                    </span>
                                    <span className="shrink-0">{formatMoney(charge.amount, transaction.currency)}</span>
                                  </div>
                                ))}

                                <div className="font-body-md text-body-md flex justify-between border-t border-white/5 pt-2 font-semibold text-on-surface">
                                  <span>Total</span>
                                  <span>{formatMoney(transaction.receipt.total, transaction.currency)}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
              <span className="font-label-md text-label-md text-on-surface-variant">
                Page {page} of {totalPages} • {total} transactions
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => void load(page - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-surface transition-colors hover:bg-white/10 disabled:opacity-40"
                >
                  <Icon name="chevron_left" size={20} />
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => void load(page + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-surface transition-colors hover:bg-white/10 disabled:opacity-40"
                >
                  <Icon name="chevron_right" size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Date range switcher, pinned just above the bottom navigation */}
      {createPortal(
        <div className="fixed bottom-[calc(88px+env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-surface-container-high/90 px-1 py-1 shadow-lg backdrop-blur-xl md:bottom-8 md:left-8 md:translate-x-0">
          <button
            type="button"
            aria-label="Previous range"
            disabled={rangeIndex === 0}
            onClick={() => applyRange(DATE_RANGES[rangeIndex - 1].key)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface disabled:opacity-30"
          >
            <Icon name="chevron_left" size={20} />
          </button>

          <button
            type="button"
            onClick={() => {
              if (rangeKey === "custom") setShowFilters(true);
            }}
            className="font-label-md text-label-md min-w-[7.5rem] px-2 text-center text-on-surface"
          >
            {DATE_RANGES[rangeIndex].label}
          </button>

          <button
            type="button"
            aria-label="Next range"
            disabled={rangeIndex === DATE_RANGES.length - 1}
            onClick={() => applyRange(DATE_RANGES[rangeIndex + 1].key)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface disabled:opacity-30"
          >
            <Icon name="chevron_right" size={20} />
          </button>
        </div>,
        document.body,
      )}

      {/* FAB */}
      {createPortal(
        <button
          type="button"
          onClick={openCreate}
          aria-label="Add transaction"
          className="fixed bottom-[calc(148px+env(safe-area-inset-bottom))] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg shadow-primary/30 transition-transform hover:opacity-90 active:scale-95 md:bottom-8 md:right-8"
        >
          <Icon name="add" filled size={30} />
        </button>,
        document.body,
      )}

      {/* Add / edit transaction */}
      <Modal
        open={isFormOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit Transaction" : "New Transaction"}
        footer={
          <button
            type="submit"
            form="txn-form"
            disabled={isSaving}
            className="font-label-md text-label-md flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 uppercase tracking-wider text-on-primary shadow-[0_0_20px_rgba(216,226,255,0.1)] transition-all hover:bg-primary-container hover:shadow-[0_0_30px_rgba(216,226,255,0.2)] disabled:opacity-50"
          >
            {isSaving ? "Saving" : "Confirm Transaction"}
            <Icon name="check" size={20} />
          </button>
        }
      >
        <form id="txn-form" onSubmit={handleSave} className="space-y-8">
          {/* Type Toggle */}
          <div className="flex rounded-xl border border-white/5 bg-black/30 p-1">
            {(
              [
                { value: "Income", label: "Income", icon: "arrow_downward" },
                { value: "Expense", label: "Expense", icon: "arrow_upward" },
                { value: "Transfer", label: "Transfer", icon: "swap_horiz" },
              ] as { value: FormType; label: string; icon: string }[]
            ).map((option) => {
              const isActive = form.type === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={Boolean(editing)}
                  onClick={() => setForm({ ...form, type: option.value, categoryId: "", toAccountId: "" })}
                  className={cn(
                    "font-label-md text-label-md flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 transition-all disabled:cursor-not-allowed",
                    isActive && option.value === "Income" && "border border-secondary/20 bg-secondary/10 text-secondary",
                    isActive && option.value === "Expense" && "border border-error/20 bg-error/10 text-error",
                    isActive && option.value === "Transfer" && "border border-primary/20 bg-primary/10 text-primary",
                    !isActive && "text-on-surface-variant hover:bg-white/5",
                  )}
                >
                  <Icon name={option.icon} size={18} />
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Amount Input */}
          <div className="relative flex items-center justify-center py-6">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-2xl font-semibold leading-none text-on-surface-variant">{currencySymbol(formCurrency)}</span>
              <input
                required
                type="text"
                inputMode="text"
                step="0.01"
                min="0.01"
                readOnly={Boolean(receipt)}
                value={effectiveAmount}
                onChange={(event) => setForm({ ...form, amount: event.target.value })}
                className={cn(
                  "no-zoom-fix w-44 border-none bg-transparent p-0 text-center text-5xl font-bold leading-none tracking-tight text-on-surface placeholder-on-surface-variant/30 focus:outline-none focus:ring-0 md:w-52",
                  receipt && "cursor-not-allowed opacity-80",
                )}
                placeholder="0.00"
              />
            </div>

            {!receipt && (
              <button
                type="button"
                onClick={() => setCalculatorOpen(true)}
                aria-label="Open calculator"
                className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-colors hover:bg-primary/20 active:scale-95"
              >
                <Icon name="calculate" size={22} />
              </button>
            )}
          </div>

          {/* Receipt */}
          {form.type !== "Transfer" && (
            <div>
              {receipt ? (
                <ReceiptEditor draft={receipt} currency={currencySymbol(formCurrency)} onChange={setReceipt} onRemove={() => setReceipt(null)} />
              ) : (
                <button
                  type="button"
                  onClick={() => setReceipt(emptyReceiptDraft())}
                  className="font-label-md text-label-md flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-on-surface-variant transition-colors hover:bg-white/5"
                >
                  <Icon name="receipt_long" size={20} />
                  Add Receipt Details
                </button>
              )}
            </div>
          )}

          {/* Fields */}
          <div className="space-y-6">
            <Field label="Description" htmlFor="txn-description" icon="storefront">
              <input id="txn-description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="e.g. Whole Foods" className={fieldInputClass} />
            </Field>

            <Field label="Date" htmlFor="txn-date" icon="calendar_month">
              <input id="txn-date" type="datetime-local" required value={form.transactionDate} onChange={(event) => setForm({ ...form, transactionDate: event.target.value })} className={fieldInputClass} />
            </Field>

            <Field label={form.type === "Transfer" ? "From Account" : "Account"} htmlFor="txn-account" icon="account_balance">
              <Select
                id="txn-account"
                required
                value={form.accountId}
                onChange={(next) => setForm({ ...form, accountId: next })}
                placeholder="Select an account"
                options={activeAccounts.map((account) => ({
                  value: account.id,
                  label: `${account.name} (${account.currency})`,
                }))}
              />
            </Field>

            {form.type === "Transfer" ? (
              <Field label="To Account" htmlFor="txn-to-account" icon="south_east">
                <Select
                  id="txn-to-account"
                  required
                  value={form.toAccountId}
                  onChange={(next) => setForm({ ...form, toAccountId: next })}
                  placeholder="Select a destination"
                  options={activeAccounts.filter((account) => account.id !== form.accountId).map((account) => ({ value: account.id, label: `${account.name} (${account.currency})` }))}
                />
              </Field>
            ) : (
              <Field label="Category (Optional)" htmlFor="txn-category" icon="category">
                <Select
                  id="txn-category"
                  value={form.categoryId}
                  onChange={(next) => setForm({ ...form, categoryId: next })}
                  placeholder="Select a category"
                  options={formCategories.map((category) => ({ value: category.id, label: category.name }))}
                />
              </Field>
            )}
          </div>

          {formError && <ErrorBanner message={formError} />}
        </form>
      </Modal>

      <Calculator open={isCalculatorOpen} currency={currencySymbol(formCurrency)} initialValue={form.amount} onClose={() => setCalculatorOpen(false)} onApply={(value) => setForm((current) => ({ ...current, amount: value }))} />

      {/* Transaction details */}
      <Modal
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title="Transaction Details"
        footer={
          detail && (
            <div className="flex gap-3">
              {detail.type !== "Adjustment" && (
                <button type="button" onClick={() => openEdit(detail)} className="font-label-md text-label-md flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-on-primary transition-opacity hover:opacity-90">
                  <Icon name="edit" size={18} />
                  Edit
                </button>
              )}
              <button
                type="button"
                onClick={() => void handleDelete(detail)}
                className="font-label-md text-label-md flex flex-1 items-center justify-center gap-2 rounded-xl border border-error/30 bg-error/10 py-3 text-error transition-colors hover:bg-error/20"
              >
                <Icon name="delete" size={18} />
                Delete
              </button>
            </div>
          )
        }
      >
        {detail && (
          <>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Icon name={detail.categoryName ? categoryIcon(detail.categoryName) : TRANSACTION_TYPE_ICONS[detail.type]} size={32} className="text-on-surface-variant" />
              </div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background">{detail.description || detail.categoryName || detail.typeName}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">{formatDateTime(detail.transactionDate)}</p>
              <div className={cn("font-headline-xl text-headline-xl font-bold", detail.signedAmount > 0 ? "text-secondary" : "text-primary")}>
                {detail.signedAmount > 0 ? "+" : detail.signedAmount < 0 ? "-" : ""}
                {formatMoney(Math.abs(detail.signedAmount), detail.currency)}
              </div>
              <Pill tone={transactionTone(detail.type)}>{detail.typeName}</Pill>
            </div>

            <div className="glass-card flex flex-col rounded-xl">
              <div className="flex items-center justify-between border-b border-white/[0.04] p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Icon name="account_balance_wallet" size={20} className="text-on-surface-variant" />
                  </div>
                  <span className="font-label-md text-label-md text-on-surface">Account</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface-variant">{detail.accountName}</span>
              </div>

              {detail.toAccountName && (
                <div className="flex items-center justify-between border-b border-white/[0.04] p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <Icon name="south_east" size={20} className="text-on-surface-variant" />
                    </div>
                    <span className="font-label-md text-label-md text-on-surface">To Account</span>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface-variant">{detail.toAccountName}</span>
                </div>
              )}

              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Icon name="category" size={20} className="text-on-surface-variant" />
                  </div>
                  <span className="font-label-md text-label-md text-on-surface">Category</span>
                </div>
                <span className="font-body-md text-body-md text-on-surface-variant">{detail.categoryName ?? "—"}</span>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
