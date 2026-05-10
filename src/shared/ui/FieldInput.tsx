import { InputHTMLAttributes, SelectHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '../../core/utils';

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
}

type InputProps = FieldProps & InputHTMLAttributes<HTMLInputElement>;
type SelectProps = FieldProps & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode };

const inputBase = 'w-full border-2 border-ink bg-white font-mono text-sm px-3.5 py-2.5 outline-none transition-colors duration-150 focus:bg-signal';

export const FieldInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => (
    <div>
      <label className="block font-mono text-[0.68rem] uppercase tracking-[0.07em] text-mute mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={cn(inputBase, error && 'border-rust', className)}
        {...props}
      />
      {error && <p className="font-mono text-[0.68rem] text-rust mt-1">{error}</p>}
      {hint && !error && <p className="font-mono text-[0.68rem] text-mute mt-1">{hint}</p>}
    </div>
  ),
);
FieldInput.displayName = 'FieldInput';

export function FieldSelect({ label, error, hint, className, id, children, ...props }: SelectProps) {
  return (
    <div>
      <label className="block font-mono text-[0.68rem] uppercase tracking-[0.07em] text-mute mb-1" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className={cn(
          inputBase,
          'appearance-none bg-[image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%230b0b0c\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_14px_center] pr-9',
          error && 'border-rust',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="font-mono text-[0.68rem] text-rust mt-1">{error}</p>}
      {hint && !error && <p className="font-mono text-[0.68rem] text-mute mt-1">{hint}</p>}
    </div>
  );
}
