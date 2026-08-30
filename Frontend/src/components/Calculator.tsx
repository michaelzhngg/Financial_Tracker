import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import Icon from './Icon';
import Modal from './Modal';

type Op = '+' | '-' | '*' | '/';

const OPS: Op[] = ['+', '-', '*', '/'];
const OP_LABELS: Record<Op, string> = { '+': '+', '-': '−', '*': '×', '/': '÷' };

function apply(left: number, op: Op, right: number) {
  switch (op) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      return right === 0 ? 0 : left / right;
  }
}

/** Rounds to 2dp so results stay valid monetary values. */
function round(value: number) {
  return Math.round(value * 100) / 100;
}

interface CalculatorProps {
  open: boolean;
  currency: string;
  initialValue?: string;
  onClose: () => void;
  onApply: (value: string) => void;
}

/**
 * Simple chained calculator. The running result is written back into the
 * transaction amount field when the user confirms.
 */
export default function Calculator({ open, currency, initialValue, onClose, onApply }: CalculatorProps) {
  const [entry, setEntry] = useState('0');
  const [accumulator, setAccumulator] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<Op | null>(null);
  const [expression, setExpression] = useState('');
  const [isFreshEntry, setFreshEntry] = useState(true);

  useEffect(() => {
    if (!open) return;

    const seed = initialValue && Number(initialValue) > 0 ? initialValue : '0';
    setEntry(seed);
    setAccumulator(null);
    setPendingOp(null);
    setExpression('');
    setFreshEntry(true);
  }, [open, initialValue]);

  const pressDigit = (digit: string) => {
    setEntry((current) => {
      if (isFreshEntry) return digit;
      if (current === '0') return digit;
      return current + digit;
    });
    setFreshEntry(false);
  };

  const pressDot = () => {
    if (isFreshEntry) {
      setEntry('0.');
      setFreshEntry(false);
      return;
    }

    setEntry((current) => (current.includes('.') ? current : `${current}.`));
  };

  const pressOp = (op: Op) => {
    const value = Number(entry) || 0;
    const next = accumulator !== null && pendingOp ? round(apply(accumulator, pendingOp, value)) : value;

    setAccumulator(next);
    setPendingOp(op);
    setEntry(String(next));
    setExpression(`${next} ${OP_LABELS[op]}`);
    setFreshEntry(true);
  };

  const pressEquals = () => {
    if (accumulator === null || !pendingOp) return Number(entry) || 0;

    const value = Number(entry) || 0;
    const result = round(apply(accumulator, pendingOp, value));

    setEntry(String(result));
    setAccumulator(null);
    setPendingOp(null);
    setExpression('');
    setFreshEntry(true);

    return result;
  };

  const clearAll = () => {
    setEntry('0');
    setAccumulator(null);
    setPendingOp(null);
    setExpression('');
    setFreshEntry(true);
  };

  const backspace = () => {
    setEntry((current) => (current.length <= 1 ? '0' : current.slice(0, -1)));
    setFreshEntry(false);
  };

  const handleApply = () => {
    const result = round(pressEquals());
    onApply(result > 0 ? String(result) : '');
    onClose();
  };

  const keyClass =
    'flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-headline-md text-headline-md text-on-surface transition-colors hover:bg-white/10 active:scale-95';

  return (
    <Modal open={open} onClose={onClose} title="Calculator" className="md:max-w-sm">
      <div className="flex flex-col gap-6">
        <div className="glass-card flex flex-col items-end gap-1 rounded-xl p-5">
          <span className="font-label-md text-label-md h-5 text-on-surface-variant opacity-70">{expression}</span>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-md text-headline-md text-on-surface-variant">{currency}</span>
            <span className="font-headline-xl text-headline-xl truncate text-on-surface">{entry}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button type="button" onClick={clearAll} className={cn(keyClass, 'text-error')}>
            AC
          </button>
          <button type="button" onClick={backspace} className={cn(keyClass, 'text-on-surface-variant')}>
            <Icon name="backspace" size={22} />
          </button>
          {OPS.slice(3).map((op) => (
            <button key={op} type="button" onClick={() => pressOp(op)} className={cn(keyClass, 'text-primary')}>
              {OP_LABELS[op]}
            </button>
          ))}
          <button type="button" onClick={() => pressOp('*')} className={cn(keyClass, 'text-primary')}>
            ×
          </button>

          {['7', '8', '9'].map((digit) => (
            <button key={digit} type="button" onClick={() => pressDigit(digit)} className={keyClass}>
              {digit}
            </button>
          ))}
          <button type="button" onClick={() => pressOp('-')} className={cn(keyClass, 'text-primary')}>
            −
          </button>

          {['4', '5', '6'].map((digit) => (
            <button key={digit} type="button" onClick={() => pressDigit(digit)} className={keyClass}>
              {digit}
            </button>
          ))}
          <button type="button" onClick={() => pressOp('+')} className={cn(keyClass, 'text-primary')}>
            +
          </button>

          {['1', '2', '3'].map((digit) => (
            <button key={digit} type="button" onClick={() => pressDigit(digit)} className={keyClass}>
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={pressEquals}
            className={cn(keyClass, 'row-span-2 h-auto bg-primary/20 text-primary')}
          >
            =
          </button>

          <button type="button" onClick={() => pressDigit('0')} className={cn(keyClass, 'col-span-2')}>
            0
          </button>
          <button type="button" onClick={pressDot} className={keyClass}>
            .
          </button>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="font-label-md text-label-md flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 uppercase tracking-wider text-on-primary transition-all hover:bg-primary-container"
        >
          Use Amount
          <Icon name="check" size={20} />
        </button>
      </div>
    </Modal>
  );
}

