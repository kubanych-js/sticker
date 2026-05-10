import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/ui/Card';
import { Button, LinkButton } from '../../../shared/ui/Button';
import { StickerText } from '../../../shared/ui/StickerText';
import type { Template } from '../../../core/types';
import { cn } from '../../../core/utils';

const TEMPLATES: Template[] = ['classic', 'fleet', 'heavy', 'custom'];
const TPL_LABELS: Record<Template, string> = { classic: 'Classic', fleet: 'Fleet', heavy: 'Heavy-Duty', custom: 'Custom' };

export function HeroSection() {
  const navigate = useNavigate();
  const [name,     setName]     = useState('');
  const [usdot,    setUsdot]    = useState('');
  const [mc,       setMc]       = useState('');
  const [template, setTemplate] = useState<Template>('classic');

  const handleDesign = useCallback(() => {
    try {
      localStorage.setItem('dot_builder', JSON.stringify({ name, usdot, mc, template, mode: 'design' }));
    } catch { /* quota */ }
    navigate('/order/step-1');
  }, [name, usdot, mc, template, navigate]);

  return (
    <section id="builder" className="relative border-b-2 border-ink" style={{ minHeight: '60vh' }}>
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="pulse-dot" />
              <span className="font-mono text-xs uppercase tracking-widest">Live preview · No account · Instant PDF</span>
            </div>

            <h1 className="display" style={{ fontSize: 'clamp(2.4rem,4.2vw,3.8rem)' }}>
              DOT-STICKERS<br />
              <span className="bg-signal px-2">FOR YOUR RIG.</span><br />
              <span className="italic font-light" style={{ fontSize: '0.82em' }}>in 48 hours.</span>
            </h1>

            <p className="text-base text-neutral-600 max-w-sm -mt-1">
              USDOT &amp; MC compliance decals built to FMCSA spec.
              Type your numbers — see the sticker live. Order from <span className="font-mono font-bold">$5.99</span>.
            </p>

            {/* Mini-builder card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest">Quick Builder</div>
                  <div className="text-xs text-mute mt-0.5">Type your info — sticker updates live</div>
                </div>
                <span className="border border-ink rounded-full px-2.5 py-1 font-mono text-[0.72rem] bg-signal">FMCSA-OK</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wide text-mute block mb-1" htmlFor="q-name">
                    Company name
                  </label>
                  <input
                    id="q-name" type="text" maxLength={60}
                    placeholder="YOUR COMPANY LLC"
                    value={name} onChange={e => setName(e.target.value)}
                    className="w-full border-2 border-ink bg-white font-mono text-sm px-3.5 py-2.5 outline-none focus:bg-signal transition-colors"
                    autoComplete="organization"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-wide text-mute block mb-1" htmlFor="q-usdot">USDOT #</label>
                    <input
                      id="q-usdot" type="text" maxLength={8} placeholder="3214567"
                      value={usdot} onChange={e => setUsdot(e.target.value.replace(/\D/g, ''))}
                      className="w-full border-2 border-ink bg-white font-mono text-sm px-3.5 py-2.5 outline-none focus:bg-signal transition-colors"
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-wide text-mute block mb-1" htmlFor="q-mc">MC #</label>
                    <input
                      id="q-mc" type="text" maxLength={8} placeholder="654321"
                      value={mc} onChange={e => setMc(e.target.value.replace(/\D/g, ''))}
                      className="w-full border-2 border-ink bg-white font-mono text-sm px-3.5 py-2.5 outline-none focus:bg-signal transition-colors"
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wide text-mute mb-1.5">Template</div>
                  <div className="flex flex-wrap gap-2">
                    {TEMPLATES.map(t => (
                      <button
                        key={t}
                        onClick={() => setTemplate(t)}
                        className={cn(
                          'border border-ink rounded-full px-2.5 py-1 font-mono text-[0.72rem] transition-colors',
                          template === t ? 'bg-signal' : 'hover:bg-ink hover:text-paper',
                        )}
                      >
                        {TPL_LABELS[t]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={handleDesign} className="w-full justify-between mt-6 px-5 py-3">
                <span>DESIGN MY STICKER</span><span>→</span>
              </Button>

              <div className="flex items-center gap-3 mt-4">
                <div className="h-px flex-1 bg-ink/10" />
                <span className="font-mono text-[10px] text-mute uppercase">or</span>
                <div className="h-px flex-1 bg-ink/10" />
              </div>

              <LinkButton to="/order/step-1?mode=upload" variant="ghost" className="w-full gap-2 mt-3 px-5 py-2.5">
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>↑</span>
                <span>UPLOAD MY OWN DESIGN</span>
              </LinkButton>

              <p className="font-mono text-[10px] text-mute text-center mt-3">
                No account needed · Instant PDF included with every order
              </p>
            </Card>
          </div>

          {/* RIGHT: door preview */}
          <div className="hidden lg:flex lg:flex-col lg:sticky lg:top-20">
            <div
              className="truck-door rounded-sm flex items-center justify-center relative overflow-visible"
              style={{ height: 'calc(60vh - 2rem)', maxHeight: 560, minHeight: 380 }}
            >
              {/* Window */}
              <div
                className="absolute top-7 left-7 right-16 border border-black/10 rounded-sm"
                style={{ height: '18%', background: 'linear-gradient(160deg,rgba(200,215,245,0.3),rgba(170,195,240,0.12))' }}
              />
              {/* Handle */}
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-[72px] rounded-sm border-2 border-ink"
                style={{ background: '#4a4a4a', boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.35)' }}
              />
              <StickerText
                company={name.toUpperCase()}
                usdot={usdot}
                mc={mc}
                template={template}
                size="lg"
                className="w-[75%] max-w-[280px]"
                style={{ marginTop: '10%' }}
              />
              <span className="absolute -top-3 left-4 border border-ink rounded-full bg-paper font-mono text-[11px] px-2.5 py-1">
                DRIVER SIDE · 2.5" letters
              </span>
              <span className="absolute -bottom-3 right-4 border border-ink rounded-full bg-signal font-mono text-[11px] px-2.5 py-1">
                LIVE PREVIEW
              </span>
            </div>
            <div className="mt-5 flex justify-between font-mono text-xs text-mute">
              <span>↳ Updates as you type</span>
              <span>Drag-free · No login</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI bar */}
      <div className="border-t-2 border-ink bg-white mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-ink border-x-2 border-ink px-6 lg:px-0">
          {[
            { val: '2.3', unit: ' days',  label: 'avg delivery' },
            { val: '1,247', unit: '',     label: 'shipped / mo' },
            { val: '4.9', unit: '/5',     label: '120+ reviews' },
            { val: '$5.99', unit: '',     label: 'starting at' },
          ].map(kpi => (
            <div key={kpi.label} className="p-5">
              <div className="display text-3xl">{kpi.val}<span className="text-base font-normal">{kpi.unit}</span></div>
              <div className="font-mono text-xs uppercase mt-1 text-mute">{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
