import type { Mode } from '../../../../core/types';
import { cn } from '../../../../core/utils';

interface ModeToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    // Match HTML: display:flex; border:2px solid ink; overflow:hidden
    <div role="tablist" className="flex border-2 border-ink overflow-hidden">
      {([
        { m: 'design' as Mode, icon: (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 13l2-2 8-8L9 1 1 9v2h2" />
          </svg>
        ), label: 'Design from scratch' },
        { m: 'upload' as Mode, icon: (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 1v8M4 4l3-3 3 3M2 11h10v2H2z" />
          </svg>
        ), label: 'Upload my design' },
      ] as const).map(({ m, icon, label }, i) => (
        <button
          key={m}
          role="tab"
          aria-selected={mode === m}
          onClick={() => onChange(m)}
          className={cn(
            // Match HTML .mode-tab button exactly
            'flex-1 py-[11px] px-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.04em] cursor-pointer',
            'flex items-center justify-center gap-1.5',
            // transition: all 150ms cubic-bezier(.2,.7,.2,1)
            'transition-all duration-150',
            // First tab: border-right divider (matches HTML .mode-tab button:first-child)
            i === 0 && 'border-r-2 border-ink',
            // Active state
            mode === m ? 'bg-signal' : 'bg-white hover:bg-paper',
          )}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}
