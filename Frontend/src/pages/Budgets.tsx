import { useEffect, useMemo, useState } from 'react';
import Icon from '../components/Icon';
import Modal from '../components/Modal';
import Select from '../components/Select';
import { EmptyState, ErrorBanner, Field, LoadingState, fieldInputClass } from '../components/ui';
import { api } from '../lib/api';
import { BUDGET_PERIODS } from '../lib/constants';
import { categoryIcon } from '../lib/icons';
import { cn, formatMoney, monthLabel } from '../lib/utils';
import { useFinanceStore } from '../store/useFinanceStore';
import type { Budget, BudgetPeriod } from '../types/api';

type Status = 'healthy' | 'warning' | 'over';

function statusOf(budget: Budget): Status {
  if (budget.isOverBudget) return 'over';
  if (budget.percentUsed >= 80) return 'warning';
  return 'healthy';
}

const STATUS_STYLES: Record<Status, { label: string; text: string; bg: string; border: string; bar: string }> = {
  healthy: {
    label: 'Healthy',
    text: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/20',
    bar: 'bg-secondary',
  },
  warning: {
    label: 'Warning',
    text: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-500/20',
    bar: 'bg-yellow-400',
  },
  over: { label: 'Over Budget', text: 'text-error', bg: 'bg-error/10', border: 'border-error/20', bar: 'bg-error' },
};

interface BudgetForm {
  categoryId: string;
  amount: string;
  period: BudgetPeriod;
}

const emptyForm: BudgetForm = { categoryId: '', amount: '', period: 'Monthly' };

export default function Budgets() {
  const { budgets, categories, dashboard, hasLoaded, refreshAll, ensureLoaded } = useFinanceStore();

  const [isFormOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Budget | null>(null);
  const [form, setForm] = useState<BudgetForm>(emptyForm);
  const [error, setError] = useState('');
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    void ensureLoaded();
  }, [ensureLoaded]);

  const baseCurrency = dashboard?.baseCurrency ?? 'MYR';
  const activeBudgets = useMemo(() => budgets.filter((budget) => budget.isActive), [budgets]);
  const expenseCategories = useMemo(
    () => categories.filter((category) => category.isActive && category.type === 'Expense'),
    [categories],
  );

  /** Only cross-cutting figures; budget limits themselves are never pooled. */
  const totals = useMemo(() => {
    const daysRemaining = activeBudgets.reduce((max, budget) => Math.max(max, budget.daysRemaining), 0);

    return {
      daysRemaining,
      overCount: activeBudgets.filter((budget) => budget.isOverBudget).length,
    };
  }, [activeBudgets]);

  const now = new Date();

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, categoryId: expenseCategories[0]?.id ?? '' });
    setError('');
    setFormOpen(true);
  };

  const openEdit = (budget: Budget) => {
    setEditing(budget);
    setForm({ categoryId: budget.categoryId, amount: String(budget.amount), period: budget.period });
    setError('');
    setFormOpen(true);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = { categoryId: form.categoryId, amount: Number(form.amount), period: form.period };

      if (editing) {
        await api.budgets.update(editing.id, payload);
      } else {
        await api.budgets.create(payload);
      }

      await refreshAll();
      setFormOpen(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save the budget.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (budget: Budget) => {
    try {
      if (budget.isActive) {
        await api.budgets.deactivate(budget.id);
      } else {
        await api.budgets.reactivate(budget.id);
      }

      await refreshAll();
      setFormOpen(false);
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Unable to update the budget.');
    }
  };

  const handleDelete = async (budget: Budget) => {
    if (!window.confirm(`Remove the budget for "${budget.categoryName}"?`)) return;

    try {
      await api.budgets.remove(budget.id);
      await refreshAll();
      setFormOpen(false);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to remove the budget.');
    }
  };

  if (!hasLoaded) return <LoadingState label="Loading budgets" />;

  const inactiveBudgets = budgets.filter((budget) => !budget.isActive);

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-headline-xl text-headline-xl mb-2 text-on-background">Budgets</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Manage your spending limits for {monthLabel(now.getFullYear(), now.getMonth() + 1)}.
        </p>
      </div>

      {error && <div className="mb-6">{<ErrorBanner message={error} />}</div>}

      {activeBudgets.length === 0 && inactiveBudgets.length === 0 ? (
        <EmptyState
          title="No budgets yet"
          description="Set a monthly limit on an expense category to see your daily spending allowance."
          action={
            <button
              type="button"
              onClick={openCreate}
              className="font-label-md text-label-md mt-2 flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-on-primary"
            >
              <Icon name="add" filled size={18} />
              Create Budget
            </button>
          }
        />
      ) : (
        /* Bento Grid Layout */
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          {/* Hero Card: Daily Allowance */}
          <div className="glass-panel flex min-h-[300px] flex-col justify-between rounded-xl p-8 md:col-span-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-background">Daily Allowance</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Per-category limits, tracked independently
                </p>
              </div>
              <div className="shrink-0 rounded-full border border-white/10 bg-surface-container-low px-4 py-2">
                <span className="font-label-md text-label-md text-secondary">{totals.daysRemaining} Days Left</span>
              </div>
            </div>

            {/* Each category keeps its own limit, so allowances are listed per
                category rather than pooled into a single figure. */}
            <div className="flex flex-col gap-4">
              {activeBudgets.length === 0 ? (
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Create a budget to see a daily allowance for each category.
                </p>
              ) : (
                activeBudgets.map((budget) => {
                  const style = STATUS_STYLES[statusOf(budget)];
                  const isOver = budget.isOverBudget;

                  return (
                    <div key={budget.id} className="flex flex-col gap-2">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-2">
                          <Icon name={categoryIcon(budget.categoryName)} size={18} className={style.text} />
                          <span className="font-body-md text-body-md truncate text-on-surface">
                            {budget.categoryName}
                          </span>
                        </div>
                        <div className="shrink-0 text-right">
                          <span
                            className={cn('font-headline-md text-headline-md', isOver ? 'text-error' : 'text-primary')}
                          >
                            {isOver ? 'Over budget' : `${formatMoney(budget.dailyAllowance, baseCurrency)}/day`}
                          </span>
                        </div>
                      </div>

                      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                        <div
                          className={cn('h-full rounded-full', style.bar)}
                          style={{ width: `${Math.min(100, budget.percentUsed)}%` }}
                        />
                      </div>

                      <div className="font-label-md text-label-md flex justify-between text-on-surface-variant">
                        <span>
                          {formatMoney(budget.spent, baseCurrency)} of {formatMoney(budget.amount, baseCurrency)}
                        </span>
                        <span className={isOver ? 'text-error' : undefined}>
                          {formatMoney(budget.remaining, baseCurrency)} left · {budget.daysRemaining}d
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Insight Card */}
          <div className="glass-panel flex flex-col gap-4 rounded-xl p-6 md:col-span-4">
            <div className={cn('flex items-center gap-3', totals.overCount > 0 ? 'text-error' : 'text-secondary')}>
              <Icon name={totals.overCount > 0 ? 'warning' : 'trending_up'} />
              <h3 className="font-headline-md text-headline-md">{totals.overCount > 0 ? 'Over Budget' : 'On Track'}</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {totals.overCount > 0
                ? `${totals.overCount} of your ${activeBudgets.length} budgets ${
                    totals.overCount === 1 ? 'has' : 'have'
                  } been exceeded. Review them below to get back on track.`
                : `All ${activeBudgets.length} of your category budgets are within their limits, with ${
                    totals.daysRemaining
                  } days remaining. Keep it up to hit your savings goal.`}
            </p>
            <div className="mt-auto">
              <button
                type="button"
                onClick={openCreate}
                className="font-label-md text-label-md w-full rounded-lg border border-white/20 px-4 py-3 text-on-background transition-colors hover:bg-white/5"
              >
                Add Budget
              </button>
            </div>
          </div>

          {/* Detailed Categories Header */}
          <div className="mb-2 mt-4 md:col-span-12">
            <h3 className="font-headline-md text-headline-md text-on-background">Category Budgets</h3>
          </div>

          {[...activeBudgets, ...inactiveBudgets].map((budget) => {
            const status = statusOf(budget);
            const style = STATUS_STYLES[status];

            return (
              <button
                key={budget.id}
                type="button"
                onClick={() => openEdit(budget)}
                className={cn(
                  'glass-panel group rounded-xl p-6 text-left transition-colors hover:bg-white/5 md:col-span-4',
                  !budget.isActive && 'opacity-50',
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border',
                      style.bg,
                      style.border,
                      style.text,
                    )}
                  >
                    <Icon name={categoryIcon(budget.categoryName)} />
                  </div>
                  <span
                    className={cn('font-label-md text-label-md rounded-full px-2 py-1', style.text, style.bg)}
                  >
                    {budget.isActive ? style.label : 'Inactive'}
                  </span>
                </div>

                <h4 className="font-headline-md text-headline-md mb-1 truncate text-on-background">
                  {budget.categoryName}
                </h4>

                <div className="mb-4 flex items-end gap-2">
                  <span
                    className={cn(
                      'font-headline-lg text-headline-lg',
                      status === 'over' ? 'text-error' : 'text-on-background',
                    )}
                  >
                    {formatMoney(budget.spent, baseCurrency)}
                  </span>
                  <span className="font-body-md text-body-md pb-1 text-on-surface-variant">
                    / {formatMoney(budget.amount, baseCurrency)}
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                  <div
                    className={cn('h-full rounded-full transition-all group-hover:brightness-110', style.bar)}
                    style={{ width: `${Math.min(100, budget.percentUsed)}%` }}
                  />
                </div>

                <div className="font-label-md text-label-md mt-4 grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                  <div>
                    <p className="mb-1 uppercase tracking-wider text-on-surface-variant opacity-60">Remaining</p>
                    <p className={status === 'over' ? 'text-error' : 'text-on-surface'}>
                      {formatMoney(budget.remaining, baseCurrency)}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 uppercase tracking-wider text-on-surface-variant opacity-60">Daily Allowance</p>
                    <p className={status === 'over' ? 'text-error' : 'text-on-surface'}>
                      {status === 'over' ? '—' : formatMoney(budget.dailyAllowance, baseCurrency)}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Mobile FAB */}
      <button
        type="button"
        onClick={openCreate}
        aria-label="Create budget"
        className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg shadow-primary/30 transition-transform active:scale-90 md:hidden"
      >
        <Icon name="add" filled size={28} />
      </button>

      <Modal
        open={isFormOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Edit Budget' : 'New Budget'}
        footer={
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              form="budget-form"
              disabled={isSaving}
              className="font-label-md text-label-md flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 uppercase tracking-wider text-on-primary transition-all hover:bg-primary-container disabled:opacity-50"
            >
              {isSaving ? 'Saving' : 'Save Budget'}
              <Icon name="check" size={20} />
            </button>

            {editing && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => void handleToggleActive(editing)}
                  className="font-label-md text-label-md flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-on-surface transition-colors hover:bg-white/10"
                >
                  {editing.isActive ? 'Deactivate' : 'Reactivate'}
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(editing)}
                  className="font-label-md text-label-md flex-1 rounded-xl border border-error/30 bg-error/10 py-3 text-error transition-colors hover:bg-error/20"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        }
      >
        <form id="budget-form" onSubmit={handleSave} className="space-y-6">
          <Field label="Expense Category" htmlFor="budget-category" icon="category">
            <Select
              id="budget-category"
              required
              value={form.categoryId}
              onChange={(next) => setForm({ ...form, categoryId: next })}
              placeholder="Select a category"
              options={expenseCategories.map((category) => ({ value: category.id, label: category.name }))}
            />
          </Field>

          <Field label="Budget Amount" htmlFor="budget-amount" icon="payments">
            <input
              id="budget-amount"
              type="text"
              inputMode="text"
              step="0.01"
              min="0.01"
              required
              value={form.amount}
              onChange={(event) => setForm({ ...form, amount: event.target.value })}
              placeholder="500.00"
              className={fieldInputClass}
            />
          </Field>

          <Field label="Period" htmlFor="budget-period" icon="calendar_month">
            <Select
              id="budget-period"
              value={form.period}
              onChange={(next) => setForm({ ...form, period: next as BudgetPeriod })}
              options={BUDGET_PERIODS.map((period) => ({ value: period.value, label: period.label }))}
            />
          </Field>

          {editing && (
            <div className="glass-card font-label-md text-label-md grid grid-cols-2 gap-4 rounded-xl p-5">
              <div>
                <p className="mb-1 uppercase tracking-wider text-on-surface-variant opacity-60">Spent</p>
                <p className="text-on-surface">{formatMoney(editing.spent, baseCurrency)}</p>
              </div>
              <div>
                <p className="mb-1 uppercase tracking-wider text-on-surface-variant opacity-60">Remaining</p>
                <p className={editing.isOverBudget ? 'text-error' : 'text-on-surface'}>
                  {formatMoney(editing.remaining, baseCurrency)}
                </p>
              </div>
              <div>
                <p className="mb-1 uppercase tracking-wider text-on-surface-variant opacity-60">Days Left</p>
                <p className="text-on-surface">{editing.daysRemaining}</p>
              </div>
              <div>
                <p className="mb-1 uppercase tracking-wider text-on-surface-variant opacity-60">Daily Allowance</p>
                <p className={editing.isOverBudget ? 'text-error' : 'text-on-surface'}>
                  {editing.isOverBudget ? 'Over budget' : formatMoney(editing.dailyAllowance, baseCurrency)}
                </p>
              </div>
            </div>
          )}

          {error && <ErrorBanner message={error} />}
        </form>
      </Modal>
    </>
  );
}

