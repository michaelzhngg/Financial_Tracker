import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { ErrorBanner, LoadingState, ProgressBar } from "../components/ui";
import { categoryIcon } from "../lib/icons";
import { formatMoney } from "../lib/utils";
import { useFinanceStore } from "../store/useFinanceStore";
import type { Budget } from "../types/api";

/** Colour ramp for a budget's progress bar based on how much has been used. */
function budgetTone(budget: Budget) {
  if (budget.isOverBudget) return "error" as const;
  if (budget.percentUsed >= 80) return "warning" as const;
  if (budget.percentUsed >= 50) return "primary" as const;
  return "secondary" as const;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { dashboard, hasLoaded, error } = useFinanceStore();

  if (!hasLoaded) return <LoadingState label="Loading dashboard" />;
  if (error) return <ErrorBanner message={error} />;
  if (!dashboard) return null;

  const { baseCurrency, totalBalance, currentMonth, budgets } = dashboard;
  const activeBudgets = budgets.filter((budget) => budget.isActive);

  const income = currentMonth.totalIncome;
  const expenses = currentMonth.totalExpenses;
  const net = currentMonth.netChange;

  // Bars are relative to the largest of the three so they stay comparable.
  const peak = Math.max(income, expenses, Math.abs(net), 1);
  const netChangePercent = income > 0 ? (net / income) * 100 : 0;

  return (
    <div className="flex flex-col gap-gutter">
      {/* Hero: Net Worth */}
      <section className="glass-panel flex flex-col items-center gap-8 rounded-xl border-primary/20 bg-surface-bright/20 p-12 text-center md:p-16">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary opacity-80">Total Net Worth</h2>
          <div className="font-headline-xl text-headline-xl text-5xl font-bold tracking-tight text-on-surface md:text-7xl">{formatMoney(totalBalance, baseCurrency)}</div>
        </div>
        <div className={`mx-auto flex items-center gap-3 rounded-full px-4 py-2 ${net >= 0 ? "border border-secondary/20 bg-secondary/10" : "border border-error/20 bg-error/10"}`}>
          <Icon name={net >= 0 ? "trending_up" : "trending_down"} className={net >= 0 ? "text-secondary" : "text-error"} />
          <span className={`font-label-md text-label-md ${net >= 0 ? "text-secondary" : "text-error"}`}>
            {net >= 0 ? "+" : ""}
            {netChangePercent.toFixed(1)}% this month
          </span>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="grid grid-cols-1 gap-gutter md:grid-cols-3">
        <div className="glass-panel flex flex-col gap-4 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-label-md text-label-md text-on-surface-variant">Monthly Income</h3>
            <Icon name="arrow_downward" className="text-primary-fixed-dim" />
          </div>
          <div className="font-headline-lg text-headline-lg text-on-surface">{formatMoney(income, baseCurrency)}</div>
          <div className="mt-2 h-1 w-full rounded-full bg-white/5">
            <div className="h-full rounded-full bg-primary-fixed-dim" style={{ width: `${(income / peak) * 100}%` }} />
          </div>
        </div>

        <div className="glass-panel flex flex-col gap-4 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-label-md text-label-md text-on-surface-variant">Monthly Expenses</h3>
            <Icon name="arrow_upward" className="text-error" />
          </div>
          <div className="font-headline-lg text-headline-lg text-on-surface">{formatMoney(expenses, baseCurrency)}</div>
          <div className="mt-2 h-1 w-full rounded-full bg-white/5">
            <div className="h-full rounded-full bg-error" style={{ width: `${(expenses / peak) * 100}%` }} />
          </div>
        </div>

        <div className="glass-panel flex flex-col gap-4 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-label-md text-label-md text-on-surface-variant">Net Savings</h3>
            <Icon name="savings" className="text-secondary" />
          </div>
          <div className={`font-headline-lg text-headline-lg ${net >= 0 ? "text-on-surface" : "text-error"}`}>{formatMoney(net, baseCurrency)}</div>
          <div className="mt-2 h-1 w-full rounded-full bg-white/5">
            <div className={`h-full rounded-full ${net >= 0 ? "bg-secondary" : "bg-error"}`} style={{ width: `${(Math.abs(net) / peak) * 100}%` }} />
          </div>
        </div>
      </section>

      {/* Budget Status */}
      <section className="glass-panel flex flex-col gap-6 rounded-xl p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-primary">Budget Status</h2>
          <button type="button" onClick={() => navigate("/budgets")} className="font-label-md text-label-md text-primary-fixed-dim transition-colors hover:text-primary">
            View All
          </button>
        </div>

        {activeBudgets.length === 0 ? (
          <p className="font-body-md text-body-md text-on-surface-variant opacity-80">No budgets yet. Create one to track your spending limits.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {activeBudgets.map((budget) => (
              <div key={budget.id} className="group flex flex-col gap-2">
                <div className="flex items-end justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
                      <Icon name={categoryIcon(budget.categoryName)} size={16} className="text-on-surface-variant" />
                    </div>
                    <span className="font-body-md text-body-md truncate text-on-surface">{budget.categoryName}</span>
                  </div>
                  <span className="font-body-md text-body-md shrink-0 text-on-surface-variant">
                    {formatMoney(budget.spent, baseCurrency)} / {formatMoney(budget.amount, baseCurrency)}
                  </span>
                </div>
                <ProgressBar percent={budget.percentUsed} tone={budgetTone(budget)} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
