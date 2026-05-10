import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../core/utils';

type Variant = 'primary' | 'ghost';

const base = 'inline-flex items-center justify-center font-mono font-bold border-2 border-ink transition-all duration-150 cursor-pointer text-sm';

const variants: Record<Variant, string> = {
  primary: 'bg-signal text-ink shadow-card-sm hover:enabled:-translate-x-0.5 hover:enabled:-translate-y-0.5 hover:enabled:shadow-card disabled:opacity-40 disabled:cursor-not-allowed',
  ghost:   'bg-transparent text-ink hover:bg-ink hover:text-paper',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

interface LinkButtonProps extends Omit<LinkProps, 'className'> {
  variant?: Variant;
  className?: string;
}

export function LinkButton({ variant = 'primary', className, ...props }: LinkButtonProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}

interface AnchorButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
}

export function AnchorButton({ variant = 'primary', className, ...props }: AnchorButtonProps) {
  return <a className={cn(base, variants[variant], className)} {...props} />;
}
