import { Fragment } from 'react';
import { cn } from '../../core/utils';

export type StepStatus = 'done' | 'active' | 'pending';

export interface StepDef {
  label: string;
  status: StepStatus;
}

export function StepProgress({ steps }: { steps: StepDef[] }) {
  return (
    <div className="flex items-center gap-2 flex-1 max-w-xs">
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          <div className="flex items-center gap-1.5">
            <div className={cn(
              'w-7 h-7 rounded-full border-2 border-ink grid place-items-center font-mono text-[0.65rem] font-bold flex-shrink-0',
              step.status === 'done'   && 'bg-ink text-paper',
              step.status === 'active' && 'bg-signal',
            )}>
              {step.status === 'done' ? '✓' : `0${i + 1}`}
            </div>
            <span className={cn(
              'font-mono text-xs hidden sm:block',
              step.status === 'pending' && 'text-mute',
              step.status === 'active'  && 'font-bold',
            )}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn('flex-1 h-0.5 bg-ink', step.status === 'done' ? 'opacity-50' : 'opacity-20')} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
