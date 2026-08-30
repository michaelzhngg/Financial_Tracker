import { useMemo } from 'react';
import type { ChargeType, ReceiptChargeRequest, ReceiptItemRequest } from '../types/api';
import { cn, formatMoney } from '../lib/utils';
import Icon from './Icon';
import NumberField from './NumberField';

export interface ReceiptDraft {
  merchant: string;
  notes: string;
  items: ReceiptItemRequest[];
  charges: ReceiptChargeRequest[];
}

export const emptyReceiptDraft = (): ReceiptDraft => ({
  merchant: '',
  notes: '',
  items: [{ name: '', quantity: 1, unitPrice: 0 }],
  charges: [],
});

/** Common Malaysian receipt charges offered as one-tap presets. */
const CHARGE_PRESETS: { label: string; type: ChargeType; value: number }[] = [
  { label: 'SST', type: 'Percentage', value: 6 },
  { label: 'Service Charge', type: 'Percentage', value: 10 },
  { label: 'Rounding', type: 'Fixed', value: 0 },
];

const round2 = (value: number) => Math.round(value * 100) / 100;

/** Mirrors the backend calculation so the UI can preview the final total. */
export function computeReceiptTotals(draft: ReceiptDraft) {
  const subtotal = round2(
    draft.items.reduce((sum, item) => sum + round2((Number(item.quantity) || 0) * (Number(item.unitPrice) || 0)), 0),
  );

  const resolved = draft.charges.map((charge) => {
    const value = Number(charge.value) || 0;
    const amount = charge.type === 'Percentage' ? round2((subtotal * value) / 100) : round2(value);

    return { ...charge, amount };
  });

  const chargesTotal = round2(resolved.reduce((sum, charge) => sum + charge.amount, 0));

  return { subtotal, chargesTotal, total: round2(subtotal + chargesTotal), resolved };
}

interface ReceiptEditorProps {
  draft: ReceiptDraft;
  currency: string;
  onChange: (draft: ReceiptDraft) => void;
  onRemove: () => void;
}

export default function ReceiptEditor({ draft, currency, onChange, onRemove }: ReceiptEditorProps) {
  const totals = useMemo(() => computeReceiptTotals(draft), [draft]);

  const patch = (changes: Partial<ReceiptDraft>) => onChange({ ...draft, ...changes });

  const updateItem = (index: number, changes: Partial<ReceiptItemRequest>) =>
    patch({ items: draft.items.map((item, i) => (i === index ? { ...item, ...changes } : item)) });

  const updateCharge = (index: number, changes: Partial<ReceiptChargeRequest>) =>
    patch({ charges: draft.charges.map((charge, i) => (i === index ? { ...charge, ...changes } : charge)) });

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-body-md text-on-surface placeholder-on-surface-variant/40 focus:border-primary/50 focus:outline-none';

  return (
    <div className="glass-card flex flex-col gap-6 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="receipt_long" size={20} className="text-primary" />
          <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Receipt</h3>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="font-label-md text-label-md flex items-center gap-1 text-error transition-opacity hover:opacity-80"
        >
          <Icon name="delete" size={16} />
          Remove
        </button>
      </div>

      <input
        value={draft.merchant}
        onChange={(event) => patch({ merchant: event.target.value })}
        placeholder="Merchant (optional)"
        className={inputClass}
      />

      {/* Line items */}
      <div className="flex flex-col gap-3">
        <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant opacity-70">Items</p>

        {draft.items.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 rounded-lg border border-white/5 bg-white/[0.03] p-3">
            <div className="flex items-center gap-2">
              <input
                value={item.name}
                onChange={(event) => updateItem(index, { name: event.target.value })}
                placeholder="Item name"
                className={inputClass}
              />
              <button
                type="button"
                aria-label="Remove item"
                disabled={draft.items.length === 1}
                onClick={() => patch({ items: draft.items.filter((_, i) => i !== index) })}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-on-surface-variant transition-colors hover:bg-white/10 disabled:opacity-30"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex flex-1 items-center gap-2">
                <span className="font-label-md text-label-md shrink-0 text-on-surface-variant opacity-70">Qty</span>
                <NumberField
                  step="0.001"
                  min="0.001"
                  value={item.quantity}
                  onValueChange={(quantity) => updateItem(index, { quantity })}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-[2] items-center gap-2">
                <span className="font-label-md text-label-md shrink-0 text-on-surface-variant opacity-70">Price</span>
                <NumberField
                  step="0.01"
                  min="0"
                  value={item.unitPrice}
                  onValueChange={(unitPrice) => updateItem(index, { unitPrice })}
                  className={inputClass}
                />
              </label>
              <span className="font-body-md text-body-md w-24 shrink-0 text-right text-on-surface">
                {formatMoney(round2((Number(item.quantity) || 0) * (Number(item.unitPrice) || 0)), currency)}
              </span>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => patch({ items: [...draft.items, { name: '', quantity: 1, unitPrice: 0 }] })}
          className="font-label-md text-label-md flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 py-2.5 text-on-surface-variant transition-colors hover:bg-white/5"
        >
          <Icon name="add" size={18} />
          Add Item
        </button>
      </div>

      {/* Extra charges */}
      <div className="flex flex-col gap-3">
        <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant opacity-70">
          Taxes &amp; Charges
        </p>

        {draft.charges.map((charge, index) => (
          <div key={index} className="flex flex-col gap-2 rounded-lg border border-white/5 bg-white/[0.03] p-3">
            <div className="flex items-center gap-2">
              <input
                value={charge.label}
                onChange={(event) => updateCharge(index, { label: event.target.value })}
                placeholder="e.g. SST"
                className={inputClass}
              />
              <button
                type="button"
                aria-label="Remove charge"
                onClick={() => patch({ charges: draft.charges.filter((_, i) => i !== index) })}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-on-surface-variant transition-colors hover:bg-white/10"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* A charge is either a percentage or a nominal amount, never both. */}
              <div className="flex shrink-0 rounded-lg border border-white/10 bg-black/20 p-0.5">
                {(['Percentage', 'Fixed'] as ChargeType[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateCharge(index, { type: option })}
                    className={cn(
                      'font-label-md text-label-md rounded-md px-3 py-1.5 transition-colors',
                      charge.type === option
                        ? 'bg-primary/20 text-primary'
                        : 'text-on-surface-variant hover:text-on-surface',
                    )}
                  >
                    {option === 'Percentage' ? '%' : currency}
                  </button>
                ))}
              </div>

              <NumberField
                step="0.01"
                min="0"
                value={charge.value}
                onValueChange={(value) => updateCharge(index, { value })}
                className={inputClass}
              />

              <span className="font-body-md text-body-md w-24 shrink-0 text-right text-on-surface">
                {formatMoney(totals.resolved[index]?.amount ?? 0, currency)}
              </span>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap gap-2">
          {CHARGE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => patch({ charges: [...draft.charges, { ...preset }] })}
              className="font-label-md text-label-md flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-on-surface-variant transition-colors hover:bg-white/10"
            >
              <Icon name="add" size={16} />
              {preset.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => patch({ charges: [...draft.charges, { label: '', type: 'Percentage', value: 0 }] })}
            className="font-label-md text-label-md flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-on-surface-variant transition-colors hover:bg-white/10"
          >
            <Icon name="add" size={16} />
            Custom
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
        <div className="font-body-md text-body-md flex justify-between text-on-surface-variant">
          <span>Subtotal</span>
          <span>{formatMoney(totals.subtotal, currency)}</span>
        </div>
        {totals.resolved.map((charge, index) => (
          <div key={index} className="font-body-md text-body-md flex justify-between text-on-surface-variant">
            <span>{charge.label || 'Charge'}</span>
            <span>{formatMoney(charge.amount, currency)}</span>
          </div>
        ))}
        <div className="font-headline-md text-headline-md flex justify-between pt-2 text-on-surface">
          <span>Total</span>
          <span>{formatMoney(totals.total, currency)}</span>
        </div>
      </div>
    </div>
  );
}
