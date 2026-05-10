import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { StepProgress, type StepDef } from '../shared/ui/StepProgress';

interface OrderLayoutProps {
  children: ReactNode;
  steps: StepDef[];
  stepLabel: string;
}

export function OrderLayout({ children, steps, stepLabel }: OrderLayoutProps) {
  return (
    <div className="overflow-x-hidden min-h-screen bg-paper">
      <header className="border-b-2 border-ink sticky top-0 bg-paper z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-black tracking-tight shrink-0">
            <span className="w-7 h-7 bg-signal border-2 border-ink grid place-items-center font-mono text-xs">D</span>
            <span className="hidden sm:block">DOT STICKER PRO</span>
          </Link>
          <div className="w-px h-6 bg-ink/20 shrink-0 hidden sm:block" />
          <StepProgress steps={steps} />
          <span className="ml-auto font-mono text-xs text-mute shrink-0 hidden md:block">{stepLabel}</span>
        </div>
      </header>
      {children}
    </div>
  );
}
