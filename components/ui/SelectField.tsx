import { cn } from '@/lib/utils';

const chevron =
  "bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%236B5D53' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat";

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = 'Please choose…',
  error,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  error?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="mb-2 font-sans text-[0.82rem] font-medium text-cocoa">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'min-h-[52px] appearance-none rounded-2xl border bg-cream px-4 pr-10 font-sans text-input text-cocoa',
          'transition focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-ivory',
          error ? 'border-[#B3261E]' : 'border-cocoa/15 focus:border-terracotta/50',
          chevron,
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[0.82rem] font-medium text-[#B3261E]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  hint,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="mb-2 font-sans text-[0.82rem] font-medium text-cocoa">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          'rounded-2xl border bg-cream px-4 py-3 font-sans text-input leading-relaxed text-cocoa',
          'placeholder:text-cocoa-soft/60 transition focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-ivory',
          error ? 'border-[#B3261E]' : 'border-cocoa/15 focus:border-terracotta/50',
        )}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-[0.8rem] text-cocoa-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[0.82rem] font-medium text-[#B3261E]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
