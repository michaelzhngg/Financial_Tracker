import { useEffect, useMemo, useState } from "react";
import Icon from "../components/Icon";
import { ErrorBanner, LoadingState } from "../components/ui";
import { api } from "../lib/api";
import { categoryIcon } from "../lib/icons";
import { cn, formatDate, formatMoney, monthLabel } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";
import { useFinanceStore } from "../store/useFinanceStore";
import type { MonthlySummary } from "../types/api";

type View = "income" | "expenses";

const BAR_TONES = ["bg-primary-container", "bg-secondary", "bg-tertiary", "bg-primary-fixed-dim", "bg-error"];
const ICON_TONES = [
  "bg-primary-container/20 text-primary-container border-primary-container/30",
  "bg-secondary-container/20 text-secondary border-secondary-container/30",
  "bg-tertiary-container/20 text-tertiary border-tertiary-container/30",
  "bg-primary/20 text-primary border-primary/30",
  "bg-error/20 text-error border-error/30",
];

export default function Summary() {
  const baseCurrency = useAuthStore((state) => state.user?.baseCurrency) ?? "MYR";
  const dashboard = useFinanceStore((state) => state.dashboard);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [view, setView] = useState<View>("expenses");

  const [summary, setSummary] = useState<MonthlySummary | null>(null);
  const [previous, setPrevious] = useState<MonthlySummary | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");

      const previousMonth = month === 1 ? 12 : month - 1;
      const previousYear = month === 1 ? year - 1 : year;

      try {
        const [current, prior] = await Promise.all([api.summary.monthly(year, month), api.summary.monthly(previousYear, previousMonth)]);

        if (cancelled) return;
        setSummary(current);
        setPrevious(prior);
      } catch (loadError) {
        if (cancelled) return;
        setError(loadError instanceof Error ? loadError.message : "Unable to load the summary.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [year, month]);

  const shiftMonth = (delta: number) => {
    const date = new Date(year, month - 1 + delta, 1);
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
  };

  const isIncome = view === "income";

  const total = summary ? (isIncome ? summary.totalIncome : summary.totalExpenses) : 0;
  const priorTotal = previous ? (isIncome ? previous.totalIncome : previous.totalExpenses) : 0;
  const changePercent = priorTotal > 0 ? ((total - priorTotal) / priorTotal) * 100 : 0;

  const breakdown = useMemo(() => {
    if (!summary) return [];
    return isIncome ? summary.incomeByCategory : summary.spendingByCategory;
  }, [summary, isIncome]);

  /** Recent activity is filtered from the dashboard feed to match the selected view. */
  const activity = useMemo(() => {
    const wanted = isIncome ? "Income" : "Expense";

    return (dashboard?.recentTransactions ?? []).filter((transaction) => transaction.type === wanted).slice(0, 5);
  }, [dashboard, isIncome]);

  if (isLoading && !summary) return <LoadingState label="Loading summary" />;
  if (error) return <ErrorBanner message={error} />;
  if (!summary) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Month selector */}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          aria-label="Previous month"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-surface transition-colors hover:bg-white/10"
        >
          <Icon name="chevron_left" size={20} />
        </button>
        <span className="font-headline-md text-headline-md min-w-[200px] text-center text-primary">{monthLabel(year, month)}</span>
        <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-surface transition-colors hover:bg-white/10">
          <Icon name="chevron_right" size={20} />
        </button>
      </div>

      {/* Toggle Header Section */}
      <div className="flex w-full justify-center">
        <div className="glass-panel flex w-full max-w-sm rounded-full border border-white/10 p-1">
          {(["income", "expenses"] as View[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              className={cn(
                "font-label-md text-label-md flex-1 rounded-full px-4 py-2 text-center capitalize transition-all duration-300",
                view === option ? (option === "income" ? "bg-secondary/20 text-secondary" : "bg-error/20 text-error") : "text-on-surface-variant",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Summary Card */}
      <section className="glass-panel relative flex flex-col items-center justify-center overflow-hidden rounded-xl p-8 text-center">
        <div className={cn("absolute inset-0 opacity-50", isIncome ? "bg-secondary/5" : "bg-error/5")} />
        <h2 className="font-body-md text-body-md relative z-10 mb-2 text-on-surface-variant">
          Total {isIncome ? "Income" : "Expenses"} ({monthLabel(year, month)})
        </h2>
        <div className="font-headline-xl text-headline-xl relative z-10 tracking-tight text-primary">{formatMoney(total, baseCurrency)}</div>
        {priorTotal > 0 && (
          <div className={cn("relative z-10 mt-4 flex items-center gap-2 rounded-full border px-3 py-1", changePercent >= 0 ? "border-secondary/20 bg-secondary/10" : "border-error/20 bg-error/10")}>
            <Icon name={changePercent >= 0 ? "trending_up" : "trending_down"} filled size={16} className={changePercent >= 0 ? "text-secondary" : "text-error"} />
            <span className={cn("font-label-md text-label-md", changePercent >= 0 ? "text-secondary" : "text-error")}>
              {changePercent >= 0 ? "+" : ""}
              {changePercent.toFixed(1)}% vs last month
            </span>
          </div>
        )}
      </section>

      {/* Net change / transfers / adjustments */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "Net Change", value: summary.netChange, icon: "savings" },
          { label: "Transfers", value: summary.totalTransfers, icon: "swap_horiz" },
          { label: "Adjustments", value: summary.totalAdjustments, icon: "tune" },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel flex flex-col gap-3 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-label-md text-label-md text-on-surface-variant">{stat.label}</h3>
              <Icon name={stat.icon} className="text-on-surface-variant" />
            </div>
            <div className={cn("font-headline-md text-headline-md", stat.value < 0 ? "text-error" : "text-on-surface")}>{formatMoney(stat.value, baseCurrency)}</div>
          </div>
        ))}
      </section>

      {/* Category Breakdown */}
      <section className="flex flex-col gap-4">
        <h3 className="font-headline-md text-headline-md mb-2 text-primary">Category Breakdown</h3>

        {breakdown.length === 0 ? (
          <p className="font-body-md text-body-md text-on-surface-variant opacity-80">No {isIncome ? "income" : "spending"} recorded for this month.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {breakdown.map((entry, index) => (
              <div key={entry.categoryId} className="glass-panel flex flex-col gap-4 rounded-lg p-5 transition-colors hover:bg-white/[0.08]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full border", ICON_TONES[index % ICON_TONES.length])}>
                      <Icon name={categoryIcon(entry.categoryName)} />
                    </div>
                    <span className="font-body-md text-body-md truncate font-semibold text-on-surface">{entry.categoryName}</span>
                  </div>
                  <span className="font-body-md text-body-md shrink-0 text-on-surface">{formatMoney(entry.amount, baseCurrency)}</span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  <div className={cn("h-full rounded-full", BAR_TONES[index % BAR_TONES.length])} style={{ width: `${Math.min(100, entry.percentOfTotal)}%` }} />
                </div>

                <div className="font-label-md text-label-md text-right text-on-surface-variant/60">{entry.percentOfTotal.toFixed(0)}%</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Activity */}
      {activity.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="mb-2 flex items-end justify-between">
            <h3 className="font-headline-md text-headline-md text-primary">Recent Activity</h3>
          </div>

          <div className="glass-panel overflow-hidden rounded-xl">
            {activity.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between border-b border-white/[0.08] p-4 transition-colors last:border-b-0 hover:bg-white/[0.04]">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant">
                    <Icon name={categoryIcon(transaction.categoryName ?? "")} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-body-md text-body-md truncate font-semibold text-on-surface">{transaction.description || transaction.categoryName || transaction.typeName}</div>
                    <div className="font-label-md text-label-md truncate text-on-surface-variant/60">
                      {formatDate(transaction.transactionDate)} • {transaction.categoryName ?? transaction.typeName}
                    </div>
                  </div>
                </div>
                <div className={cn("font-body-md text-body-md shrink-0 font-semibold", isIncome ? "text-secondary" : "text-on-surface")}>
                  {isIncome ? "+" : "-"}
                  {formatMoney(transaction.amount, transaction.currency)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
