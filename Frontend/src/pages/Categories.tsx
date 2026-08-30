import { useEffect, useMemo, useState } from 'react';
import Icon from '../components/Icon';
import Modal from '../components/Modal';
import { ErrorBanner, Field, LoadingState, PrimaryButton, fieldInputClass } from '../components/ui';
import { api } from '../lib/api';
import { CATEGORY_COLORS } from '../lib/constants';
import { CATEGORY_ICON_CHOICES, categoryIcon } from '../lib/icons';
import { cn } from '../lib/utils';
import { useFinanceStore } from '../store/useFinanceStore';
import type { Category, CategoryType } from '../types/api';

interface CategoryCardProps {
  category: Category;
  accent: 'secondary' | 'error';
  compact?: boolean;
  transactionCount: number;
  onClick: () => void;
}

function CategoryCard({ category, accent, compact, transactionCount, onClick }: CategoryCardProps) {
  const hoverBorder = accent === 'secondary' ? 'group-hover:border-secondary/30' : 'group-hover:border-error/30';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'glass-card group flex flex-col justify-between rounded-xl text-left transition-colors hover:bg-white/[0.08]',
        compact ? 'p-5' : 'p-6',
        !category.isActive && 'opacity-50',
      )}
    >
      <div className={cn('flex items-start justify-between', compact ? 'mb-4' : 'mb-6')}>
        <div
          className={cn(
            'flex items-center justify-center rounded-lg border border-white/10 bg-surface-container-high transition-colors',
            hoverBorder,
            compact ? 'h-10 w-10' : 'h-12 w-12',
          )}
        >
          <Icon
            name={categoryIcon(category.name, category.icon)}
            size={compact ? 20 : 24}
            className="text-on-surface"
          />
        </div>
        {!category.isActive && (
          <span className="font-label-md text-label-md rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-on-surface-variant">
            Inactive
          </span>
        )}
      </div>
      <div>
        <h3
          className={cn(
            'mb-1 truncate text-on-surface',
            compact ? 'font-body-md text-body-md font-semibold' : 'font-body-lg text-body-lg',
          )}
        >
          {category.name}
        </h3>
        <p
          className={cn(
            'flex items-center gap-1 text-on-surface-variant',
            compact ? 'font-label-md text-label-md text-xs opacity-60' : 'font-body-md text-body-md opacity-80',
          )}
        >
          {!compact && <Icon name="receipt_long" size={16} />}
          {transactionCount} {transactionCount === 1 ? 'transaction' : 'transactions'}
        </p>
      </div>
    </button>
  );
}

function AddCard({ label, onClick, minHeight }: { label: string; onClick: () => void; minHeight: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-card group flex flex-col items-center justify-center rounded-xl border-dashed border-white/20 p-6 transition-colors hover:bg-white/[0.08]"
      style={{ minHeight }}
    >
      <Icon name="add_circle" className="mb-2 text-on-surface-variant opacity-50" />
      <p className="font-label-md text-label-md text-on-surface-variant opacity-70">{label}</p>
    </button>
  );
}

export default function Categories() {
  const { categories, dashboard, hasLoaded, refreshAll, ensureLoaded } = useFinanceStore();

  const [isFormOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [type, setType] = useState<CategoryType>('Expense');
  const [color, setColor] = useState(CATEGORY_COLORS[0]);
  const [icon, setIcon] = useState('category');
  const [error, setError] = useState('');
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    void ensureLoaded();
  }, [ensureLoaded]);

  const income = useMemo(() => categories.filter((category) => category.type === 'Income'), [categories]);
  const expense = useMemo(() => categories.filter((category) => category.type === 'Expense'), [categories]);

  /** Recent transactions give a rough per-category usage count for the card subtitle. */
  const counts = useMemo(() => {
    const map = new Map<string, number>();

    dashboard?.recentTransactions.forEach((transaction) => {
      if (!transaction.categoryId) return;
      map.set(transaction.categoryId, (map.get(transaction.categoryId) ?? 0) + 1);
    });

    return map;
  }, [dashboard]);

  const openCreate = (categoryType: CategoryType) => {
    setEditing(null);
    setName('');
    setType(categoryType);
    setColor(CATEGORY_COLORS[Math.floor(Math.random() * CATEGORY_COLORS.length)]);
    setIcon('category');
    setError('');
    setFormOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setName(category.name);
    setType(category.type);
    setColor(category.color || CATEGORY_COLORS[0]);
    setIcon(categoryIcon(category.name, category.icon));
    setError('');
    setFormOpen(true);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (editing) {
        await api.categories.update(editing.id, { name, type, color, icon });
      } else {
        await api.categories.create({ name, type, color, icon });
      }

      await refreshAll();
      setFormOpen(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save the category.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (category: Category) => {
    try {
      if (category.isActive) {
        await api.categories.deactivate(category.id);
      } else {
        await api.categories.reactivate(category.id);
      }

      await refreshAll();
      setFormOpen(false);
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Unable to update the category.');
    }
  };

  const handleDelete = async (category: Category) => {
    if (!window.confirm(`Delete "${category.name}"? This only works if it has no transactions.`)) return;

    try {
      await api.categories.remove(category.id);
      await refreshAll();
      setFormOpen(false);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete the category.');
    }
  };

  if (!hasLoaded) return <LoadingState label="Loading categories" />;

  // The design gives the first outflow category a full-width hero slot and pairs
  // the rest into a two-column grid.
  const [primaryExpense, ...restExpense] = expense;

  return (
    <>
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-2 text-primary">
            Manage Categories
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Organize your financial flows into streams and channels.
          </p>
        </div>
        <PrimaryButton type="button" onClick={() => openCreate('Expense')} className="hidden md:flex">
          <Icon name="add" filled size={20} />
          Create Custom
        </PrimaryButton>
      </div>

      {error && <div className="mb-6">{<ErrorBanner message={error} />}</div>}

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
        {/* Inflow Streams */}
        <section className="flex flex-col gap-6">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/20 bg-secondary/10">
              <Icon name="water_drop" className="text-secondary" />
            </div>
            <h2 className="font-headline-md text-headline-md text-secondary">Inflow Streams</h2>
          </div>

          {income.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              accent="secondary"
              transactionCount={counts.get(category.id) ?? 0}
              onClick={() => openEdit(category)}
            />
          ))}

          <AddCard label="Add Inflow Stream" minHeight="140px" onClick={() => openCreate('Income')} />
        </section>

        {/* Outflow Channels */}
        <section className="flex flex-col gap-6">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-error/20 bg-error/10">
              <Icon name="logout" className="text-error" />
            </div>
            <h2 className="font-headline-md text-headline-md text-error">Outflow Channels</h2>
          </div>

          {primaryExpense && (
            <CategoryCard
              category={primaryExpense}
              accent="error"
              transactionCount={counts.get(primaryExpense.id) ?? 0}
              onClick={() => openEdit(primaryExpense)}
            />
          )}

          {restExpense.length > 0 && (
            <div className="grid grid-cols-2 gap-6">
              {restExpense.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  accent="error"
                  compact
                  transactionCount={counts.get(category.id) ?? 0}
                  onClick={() => openEdit(category)}
                />
              ))}
            </div>
          )}

          <AddCard label="Add Outflow Channel" minHeight="120px" onClick={() => openCreate('Expense')} />
        </section>
      </div>

      {/* Mobile FAB */}
      <button
        type="button"
        onClick={() => openCreate('Expense')}
        aria-label="Create category"
        className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg shadow-primary/30 transition-transform active:scale-90 md:hidden"
      >
        <Icon name="add" filled size={28} />
      </button>

      <Modal
        open={isFormOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Edit Category' : 'New Category'}
        footer={
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              form="category-form"
              disabled={isSaving}
              className="font-label-md text-label-md flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 uppercase tracking-wider text-on-primary transition-all hover:bg-primary-container disabled:opacity-50"
            >
              {isSaving ? 'Saving' : 'Save Changes'}
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
                  Delete
                </button>
              </div>
            )}
          </div>
        }
      >
        <form id="category-form" onSubmit={handleSave} className="space-y-8">
          <div className="flex rounded-xl border border-white/5 bg-black/30 p-1">
            {(['Income', 'Expense'] as CategoryType[]).map((option) => {
              const isActive = type === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setType(option)}
                  className={cn(
                    'font-label-md text-label-md flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 transition-all',
                    isActive && option === 'Income' && 'border border-secondary/20 bg-secondary/10 text-secondary',
                    isActive && option === 'Expense' && 'border border-error/20 bg-error/10 text-error',
                    !isActive && 'text-on-surface-variant hover:bg-white/5',
                  )}
                >
                  <Icon name={option === 'Income' ? 'arrow_downward' : 'arrow_upward'} size={18} />
                  {option}
                </button>
              );
            })}
          </div>

          <Field label="Category Name" htmlFor="category-name" icon={icon}>
            <input
              id="category-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Groceries"
              className={fieldInputClass}
            />
          </Field>

          <div>
            <h3 className="font-label-md text-label-md mb-4 uppercase tracking-wider text-on-surface-variant">
              Category Icon
            </h3>
            <div className="grid grid-cols-6 gap-2">
              {CATEGORY_ICON_CHOICES.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  aria-label={choice}
                  onClick={() => setIcon(choice)}
                  className={cn(
                    'flex h-11 w-full items-center justify-center rounded-lg border transition-colors',
                    icon === choice
                      ? 'border-primary/50 bg-primary/20 text-primary'
                      : 'border-white/10 bg-white/5 text-on-surface-variant hover:bg-white/10',
                  )}
                >
                  <Icon name={choice} size={20} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-label-md text-label-md mb-4 uppercase tracking-wider text-on-surface-variant">
              Colour
            </h3>
            <div className="flex flex-wrap gap-3">
              {CATEGORY_COLORS.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  aria-label={`Colour ${choice}`}
                  onClick={() => setColor(choice)}
                  style={{ backgroundColor: choice }}
                  className={cn(
                    'h-9 w-9 rounded-full border-2 transition-transform',
                    color === choice ? 'scale-110 border-white' : 'border-transparent',
                  )}
                />
              ))}
            </div>
          </div>

          {error && <ErrorBanner message={error} />}
        </form>
      </Modal>
    </>
  );
}
