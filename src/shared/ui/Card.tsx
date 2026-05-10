import { HTMLAttributes } from 'react';
import { cn } from '../../core/utils';

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-white border-2 border-ink shadow-card', className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeading({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] mb-5', className)} {...props}>
      {children}
    </div>
  );
}
