import { cn } from '@/lib/utils';

/** Labelled text input with inline validation messaging. */
export function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: 'numeric' | 'text';
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 font-sans text-[0.82rem] font-medium text-cocoa">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'min-h-[52px] rounded-2xl border bg-cream px-4 font-sans text-input text-cocoa',
          'placeholder:text-cocoa-soft/60 transition focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-ivory',
          error ? 'border-[#B3261E]' : 'border-cocoa/15 focus:border-terracotta/50',
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[0.82rem] font-medium text-[#B3261E]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
