import { useEffect, useState } from 'react';

interface NumberFieldProps {
  value: number;
  onValueChange: (value: number) => void;
  step?: string;
  min?: string;
  className?: string;
  placeholder?: string;
  inputMode?: 'decimal' | 'numeric';
}

/**
 * Numeric input that keeps the raw text the user typed. A plain controlled
 * `type="number"` bound straight to a number re-renders "0" back into the field,
 * which makes values look like "020" while typing.
 */
export default function NumberField({
  value,
  onValueChange,
  step,
  min,
  className,
  placeholder,
  inputMode = 'decimal',
}: NumberFieldProps) {
  const [text, setText] = useState(() => (value === 0 ? '' : String(value)));

  useEffect(() => {
    // Re-sync only when the outside value no longer matches what is displayed,
    // so typing "1." or "" is never clobbered mid-edit.
    if ((Number(text) || 0) !== value) setText(value === 0 ? '' : String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      type="text"
      inputMode={inputMode}
      step={step}
      min={min}
      placeholder={placeholder ?? '0'}
      value={text}
      onChange={(event) => {
        const raw = event.target.value;
        if (raw !== '' && !/^\d*\.?\d*$/.test(raw)) return;

        setText(raw);
        onValueChange(raw === '' ? 0 : Number(raw));
      }}
      onBlur={() => setText(value === 0 ? '' : String(value))}
      className={className}
    />
  );
}

