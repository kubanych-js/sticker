import { useState } from 'react';
import { Card, CardHeading } from '../../../../shared/ui/Card';
import type { BuilderState } from '../../../../core/types';
import { cn } from '../../../../core/utils';

interface Props {
  state: BuilderState;
  onChange: (u: Partial<BuilderState>) => void;
}

const inputBase = 'w-full border-2 border-ink bg-white font-mono text-sm px-3.5 py-2.5 outline-none transition-[background,border-color] duration-150 focus:bg-signal';

export function CompanyInfoCard({ state, onChange }: Props) {
  const [nameBlurred,  setNameBlurred]  = useState(false);
  const [usdotBlurred, setUsdotBlurred] = useState(false);

  const nameOk  = state.name.trim().length > 0;
  const usdotOk = /^\d{5,8}$/.test(state.usdot);
  const nameLen  = state.name.length;
  const usdotLen = state.usdot.length;

  // Match HTML .char-count.warn: signal bg when 6–7 digits (within 2 of max 8)
  const usdotWarn = usdotLen >= 6 && usdotLen < 8;

  return (
    <Card className="p-6">
      <CardHeading>
        <span className="w-5 h-5 border-2 border-ink grid place-items-center text-[0.65rem] font-bold">1</span>
        Company Info
      </CardHeading>

      <div className="space-y-4">
        {/* Company name */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-mono text-[0.68rem] uppercase tracking-[0.07em] text-mute" htmlFor="f-name">
              Legal company name *
            </label>
            {/* char count: warn when ≤10 remaining (matches HTML warn logic) */}
            <span className={cn(
              'font-mono text-[0.68rem]',
              nameLen >= 50 ? 'text-ink font-bold' : 'text-mute',
            )}>
              {nameLen}/60
            </span>
          </div>
          <input
            id="f-name" type="text" maxLength={60}
            placeholder="REDLINE TRANSPORT LLC"
            value={state.name}
            onChange={e => onChange({ name: e.target.value })}
            onBlur={() => setNameBlurred(true)}
            className={cn(
              inputBase,
              nameBlurred && !nameOk && 'border-rust',
              nameBlurred && nameOk  && 'border-ok',
            )}
            autoComplete="organization"
          />
          {nameBlurred && !nameOk && (
            <p className="font-mono text-[0.68rem] text-rust mt-1">Company name is required.</p>
          )}
        </div>

        {/* USDOT + MC row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-mono text-[0.68rem] uppercase tracking-[0.07em] text-mute" htmlFor="f-usdot">
                USDOT # *
              </label>
              {/* Match HTML .char-count.warn: bg-signal highlight when 6–7 digits */}
              {usdotLen > 0 && (
                <span className={cn(
                  'font-mono text-[0.68rem] rounded-sm',
                  usdotWarn ? 'bg-signal text-ink px-1' : 'text-mute',
                )}>
                  {usdotLen}/8
                </span>
              )}
            </div>
            <input
              id="f-usdot" type="text" maxLength={8}
              placeholder="3214567"
              value={state.usdot}
              onChange={e => onChange({ usdot: e.target.value.replace(/\D/g, '') })}
              onBlur={() => setUsdotBlurred(true)}
              className={cn(
                inputBase,
                usdotBlurred && !usdotOk && 'border-rust',
                usdotBlurred && usdotOk  && 'border-ok',
              )}
              inputMode="numeric"
            />
            {usdotBlurred && !usdotOk && (
              <p className="font-mono text-[0.68rem] text-rust mt-1">Must be 5–8 digits.</p>
            )}
          </div>

          {/* MC (hidden in upload mode) */}
          {state.mode !== 'upload' && (
            <div>
              <label className="font-mono text-[0.68rem] uppercase tracking-[0.07em] text-mute block mb-1" htmlFor="f-mc">
                MC #
              </label>
              <input
                id="f-mc" type="text" maxLength={8}
                placeholder="654321"
                value={state.mc}
                onChange={e => onChange({ mc: e.target.value.replace(/\D/g, '') })}
                disabled={state.noMc}
                className={cn(inputBase, 'disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-neutral-100')}
                inputMode="numeric"
              />
            </div>
          )}
        </div>

        {/* No-MC checkbox (hidden in upload mode) */}
        {state.mode !== 'upload' && (
          <label className="flex items-center gap-2 cursor-pointer select-none" style={{ fontSize: '0.82rem' }}>
            <input
              type="checkbox"
              checked={state.noMc}
              onChange={e => onChange({ noMc: e.target.checked })}
              className="w-4 h-4 border-2 border-ink accent-signal"
            />
            I don't have an MC number
          </label>
        )}
      </div>
    </Card>
  );
}
