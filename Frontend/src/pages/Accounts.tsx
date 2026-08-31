import { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import Modal from '../components/Modal';
import Select from '../components/Select';
import {
  EmptyState,
  ErrorBanner,
  Field,
  GhostButton,
  LoadingState,
  PrimaryButton,
  fieldInputClass,
} from '../components/ui';
import { api } from '../lib/api';
import { ACCOUNT_TYPES, CURRENCIES } from '../lib/constants';
import { ACCOUNT_TYPE_ICONS } from '../lib/icons';
import { formatMoney, toDateTimeLocalValue } from '../lib/utils';
import { useFinanceStore } from '../store/useFinanceStore';
import type { Account, AccountType } from '../types/api';

interface AccountForm {
  name: string;
  type: AccountType;
  currency: string;
  initialBalance: string;
}

const emptyForm: AccountForm = { name: '', type: 'Bank', currency: 'MYR', initialBalance: '0' };

export default function Accounts() {
  const { accounts, dashboard, hasLoaded, refreshAll, ensureLoaded } = useFinanceStore();

  const [editing, setEditing] = useState<Account | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<AccountForm>(emptyForm);
  const [adjusting, setAdjusting] = useState<Account | null>(null);
  const [actualBalance, setActualBalance] = useState('');
  const [reason, setReason] = useState('');
  const [adjustDate, setAdjustDate] = useState(toDateTimeLocalValue(new Date()));
  const [error, setError] = useState('');
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    void ensureLoaded();
  }, [ensureLoaded]);

  const baseCurrency = dashboard?.baseCurrency ?? 'MYR';
  const totalBalance = dashboard?.totalBalance ?? 0;

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, currency: baseCurrency });
    setError('');
    setFormOpen(true);
  };

  const openEdit = (account: Account) => {
    setEditing(account);
    setForm({
      name: account.name,
      type: account.type,
      currency: account.currency,
      initialBalance: String(account.balance),
    });
    setError('');
    setFormOpen(true);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (editing) {
        await api.accounts.update(editing.id, { name: form.name, type: form.type, currency: form.currency });
      } else {
        await api.accounts.create({
          name: form.name,
          type: form.type,
          currency: form.currency,
          initialBalance: Number(form.initialBalance) || 0,
        });
      }

      await refreshAll();
      setFormOpen(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save the account.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (account: Account) => {
    try {
      if (account.isActive) {
        await api.accounts.deactivate(account.id);
      } else {
        await api.accounts.reactivate(account.id);
      }

      await refreshAll();
      setFormOpen(false);
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Unable to update the account.');
    }
  };

  const handleDelete = async (account: Account) => {
    if (!window.confirm(`Delete "${account.name}"? This only works if it has no transactions.`)) return;

    try {
      await api.accounts.remove(account.id);
      await refreshAll();
      setFormOpen(false);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete the account.');
    }
  };

  const openAdjust = (account: Account) => {
    setAdjusting(account);
    setActualBalance(String(account.balance));
    setReason('');
    setAdjustDate(toDateTimeLocalValue(new Date()));
    setError('');
  };

  const handleAdjust = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!adjusting) return;

    setSaving(true);
    setError('');

    try {
      await api.accounts.adjustBalance(adjusting.id, {
        actualBalance: Number(actualBalance),
        reason: reason || undefined,
        date: new Date(adjustDate).toISOString(),
      });

      await refreshAll();
      setAdjusting(null);
    } catch (adjustError) {
      setError(adjustError instanceof Error ? adjustError.message : 'Unable to adjust the balance.');
    } finally {
      setSaving(false);
    }
  };

  const difference = adjusting ? Number(actualBalance || 0) - adjusting.balance : 0;

  if (!hasLoaded) return <LoadingState label="Loading accounts" />;

  const [whole, cents] = formatMoney(totalBalance, baseCurrency).split('.');

  return (
    <>
      {/* Total Balance Header */}
      <section className="mb-12 flex flex-col items-center justify-center text-center">
        <h1 className="font-body-lg text-body-lg mb-2 text-on-surface-variant">Total Balance</h1>
        <div className="font-headline-xl text-headline-xl tracking-tight text-on-background">
          {whole}
          <span className="text-headline-md text-on-surface-variant">.{cents}</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <GhostButton type="button" onClick={() => setAdjusting(accounts.find((a) => a.isActive) ?? null)}>
            <Icon name="tune" size={18} />
            Balance Adjustment
          </GhostButton>
          <PrimaryButton type="button" onClick={openCreate}>
            <Icon name="add" filled size={18} />
            Add Account
          </PrimaryButton>
        </div>
      </section>

      {error && <div className="mb-6">{<ErrorBanner message={error} />}</div>}

      {accounts.length === 0 ? (
        <EmptyState
          title="No accounts yet"
          description="Add your first bank account, cash wallet or credit card to start tracking."
          action={
            <PrimaryButton type="button" onClick={openCreate} className="mt-2">
              <Icon name="add" filled size={18} />
              Add Account
            </PrimaryButton>
          }
        />
      ) : (
        /* Bento Grid for Accounts */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={`glass-card group flex cursor-pointer flex-col justify-between rounded-xl p-6 transition-colors hover:bg-white/[0.06] lg:col-span-6 ${
                account.isActive ? '' : 'opacity-60'
              }`}
              onClick={() => openEdit(account)}
            >
              <div className="mb-8 flex items-start justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 transition-transform group-hover:scale-105">
                    <Icon name={ACCOUNT_TYPE_ICONS[account.type]} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline-md text-headline-md truncate text-on-background">{account.name}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {account.typeName} • {account.currency}
                    </p>
                  </div>
                </div>
                <Icon
                  name="arrow_forward"
                  className="text-on-surface-variant opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="font-headline-lg text-headline-lg mb-1 text-on-background">
                    {formatMoney(account.balance, account.currency)}
                  </div>
                  <div
                    className={`font-label-md text-label-md ${
                      account.isActive ? 'text-secondary-fixed-dim' : 'text-on-surface-variant'
                    }`}
                  >
                    {account.isActive ? 'Available Balance' : 'Inactive'}
                  </div>
                </div>

                <div className="flex shrink-0 gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    aria-label={`Adjust balance for ${account.name}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      openAdjust(account);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
                  >
                    <Icon name="tune" size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label={account.isActive ? `Deactivate ${account.name}` : `Reactivate ${account.name}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      void handleToggleActive(account);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
                  >
                    <Icon name={account.isActive ? 'toggle_on' : 'toggle_off'} size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit account */}
      <Modal
        open={isFormOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Edit Account' : 'New Account'}
        footer={
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              form="account-form"
              disabled={isSaving}
              className="font-label-md text-label-md flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 uppercase tracking-wider text-on-primary shadow-[0_0_20px_rgba(216,226,255,0.1)] transition-all hover:bg-primary-container hover:shadow-[0_0_30px_rgba(216,226,255,0.2)] disabled:opacity-50"
            >
              {isSaving ? 'Saving' : editing ? 'Save Changes' : 'Create Account'}
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
        <form id="account-form" onSubmit={handleSave} className="space-y-8">
          <div className="space-y-6">
            <Field label="Account Name" htmlFor="account-name" icon="account_balance">
              <input
                id="account-name"
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="e.g. Maybank Savings"
                className={fieldInputClass}
              />
            </Field>

            <Field label="Account Type" htmlFor="account-type" icon="category">
              <Select
                id="account-type"
                value={form.type}
                onChange={(next) => setForm({ ...form, type: next as AccountType })}
                options={ACCOUNT_TYPES.map((type) => ({ value: type.value, label: type.label }))}
              />
            </Field>

            <Field label="Currency" htmlFor="account-currency" icon="payments">
              <Select
                id="account-currency"
                value={form.currency}
                onChange={(next) => setForm({ ...form, currency: next })}
                options={CURRENCIES.map((currency) => ({
                  value: currency.code,
                  label: `${currency.code} — ${currency.name}`,
                }))}
              />
            </Field>

            {!editing && (
              <Field label="Starting Balance" htmlFor="account-balance" icon="account_balance_wallet">
                <input
                  id="account-balance"
                  type="text"
                  inputMode="text"
                  step="0.01"
                  value={form.initialBalance}
                  onChange={(event) => setForm({ ...form, initialBalance: event.target.value })}
                  className={fieldInputClass}
                />
              </Field>
            )}
          </div>

          {error && <ErrorBanner message={error} />}
        </form>
      </Modal>

      {/* Balance adjustment */}
      <Modal
        open={Boolean(adjusting)}
        onClose={() => setAdjusting(null)}
        title="Balance Adjustment"
        description="Correct a balance when the recorded amount doesn't match reality."
        footer={
          <button
            type="submit"
            form="adjust-form"
            disabled={isSaving}
            className="font-label-md text-label-md flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 uppercase tracking-wider text-on-primary transition-all hover:bg-primary-container disabled:opacity-50"
          >
            {isSaving ? 'Saving' : 'Apply Adjustment'}
            <Icon name="check" size={20} />
          </button>
        }
      >
        {adjusting && (
          <form id="adjust-form" onSubmit={handleAdjust} className="space-y-8">
            <div className="glass-card flex flex-col gap-2 rounded-xl p-5">
              <div className="flex justify-between">
                <span className="font-body-md text-body-md text-on-surface-variant">Recorded balance</span>
                <span className="font-body-md text-body-md text-on-surface">
                  {formatMoney(adjusting.balance, adjusting.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-body-md text-body-md text-on-surface-variant">Adjustment</span>
                <span
                  className={`font-body-md text-body-md font-semibold ${
                    difference === 0 ? 'text-on-surface' : difference > 0 ? 'text-secondary' : 'text-error'
                  }`}
                >
                  {difference > 0 ? '+' : ''}
                  {formatMoney(difference, adjusting.currency)}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <Field label="Account" htmlFor="adjust-account" icon="account_balance">
                <Select
                  id="adjust-account"
                  value={adjusting.id}
                  onChange={(nextId) => {
                    const next = accounts.find((account) => account.id === nextId);
                    if (next) {
                      setAdjusting(next);
                      setActualBalance(String(next.balance));
                    }
                  }}
                  options={accounts
                    .filter((account) => account.isActive)
                    .map((account) => ({ value: account.id, label: account.name }))}
                />
              </Field>

              <Field label="Actual Balance" htmlFor="adjust-actual" icon="account_balance_wallet">
                <input
                  id="adjust-actual"
                  type="text"
                  inputMode="text"
                  step="0.01"
                  required
                  value={actualBalance}
                  onChange={(event) => setActualBalance(event.target.value)}
                  className={fieldInputClass}
                />
              </Field>

              <Field label="Date" htmlFor="adjust-date" icon="calendar_month">
                <input
                  id="adjust-date"
                  type="datetime-local"
                  value={adjustDate}
                  onChange={(event) => setAdjustDate(event.target.value)}
                  className={fieldInputClass}
                />
              </Field>

              <Field label="Reason (Optional)" htmlFor="adjust-reason" icon="notes">
                <input
                  id="adjust-reason"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  placeholder="e.g. Bank balance reconciliation"
                  className={fieldInputClass}
                />
              </Field>
            </div>

            {error && <ErrorBanner message={error} />}
          </form>
        )}
      </Modal>
    </>
  );
}

