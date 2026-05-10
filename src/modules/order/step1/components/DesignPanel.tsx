import { Card, CardHeading } from '../../../../shared/ui/Card';
import { StickerText } from '../../../../shared/ui/StickerText';
import { TEMPLATE_NAMES } from '../../../../core/constants';
import type { BuilderState, Template } from '../../../../core/types';
import { cn } from '../../../../core/utils';

interface Props {
  state: BuilderState;
  onChange: (u: Partial<BuilderState>) => void;
}

const TEMPLATES = Object.keys(TEMPLATE_NAMES) as Template[];

export function DesignPanel({ state, onChange }: Props) {
  return (
    <Card className="p-6">
      <CardHeading>
        <span className="w-5 h-5 border-2 border-ink grid place-items-center text-[0.65rem] font-bold">2</span>
        Template
      </CardHeading>

      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map(t => {
          const active = state.template === t;
          return (
            <button
              key={t}
              onClick={() => onChange({ template: t })}
              className={cn(
                'relative border-2 border-ink p-3 text-left transition-all duration-150',
                active ? 'bg-signal shadow-card-sm' : 'bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-card-sm',
              )}
            >
              {active && (
                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-ink text-paper grid place-items-center font-mono text-[10px]">✓</span>
              )}
              <div className="mb-2 scale-75 origin-top-left" style={{ width: '133%' }}>
                <StickerText
                  company={state.name || 'COMPANY'}
                  usdot={state.usdot || '1234567'}
                  mc={state.mc || '654321'}
                  template={t}
                  size="sm"
                />
              </div>
              <div className="font-mono text-xs font-bold">{TEMPLATE_NAMES[t]}</div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
