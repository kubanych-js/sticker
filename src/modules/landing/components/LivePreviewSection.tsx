import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/ui/Card';
import { Button, LinkButton } from '../../../shared/ui/Button';
import { StickerText } from '../../../shared/ui/StickerText';
import type { Template } from '../../../core/types';
import { cn } from '../../../core/utils';

const TEMPLATES: Template[] = ['classic', 'fleet', 'heavy', 'custom'];
const TPL_LABELS: Record<Template, string> = {
  classic: 'Classic',
  fleet:   'Fleet',
  heavy:   'Heavy-Duty',
  custom:  'Custom',
};

export function LivePreviewSection() {
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
    <section className="border-b-2 border-ink relative">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT — form */}
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="display text-4xl md:text-5xl">Try it live.</h2>
              <p className="font-mono text-xs text-mute mt-2 uppercase">
                Type your numbers — sticker updates instantly
              </p>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest">Quick Builder</div>
                  <div className="text-xs text-mute mt-0.5">Type your info — sticker updates live</div>
                </div>
                <span className="border border-ink rounded-full px-2.5 py-1 font-mono text-[0.72rem] bg-signal">
                  FMCSA-OK
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wide text-mute block mb-1" htmlFor="q-name">
                    Company name
                  </label>
                  <input
                    id="q-name" type="text" maxLength={60}
                    placeholder="YOUR COMPANY LLC"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full border-2 border-ink bg-white font-mono text-sm px-3.5 py-2.5 outline-none focus:bg-signal transition-colors"
                    autoComplete="organization"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-wide text-mute block mb-1" htmlFor="q-usdot">
                      USDOT #
                    </label>
                    <input
                      id="q-usdot" type="text" maxLength={8}
                      placeholder="3214567"
                      value={usdot}
                      onChange={e => setUsdot(e.target.value.replace(/\D/g, ''))}
                      className="w-full border-2 border-ink bg-white font-mono text-sm px-3.5 py-2.5 outline-none focus:bg-signal transition-colors"
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-wide text-mute block mb-1" htmlFor="q-mc">
                      MC #
                    </label>
                    <input
                      id="q-mc" type="text" maxLength={8}
                      placeholder="654321"
                      value={mc}
                      onChange={e => setMc(e.target.value.replace(/\D/g, ''))}
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

          {/* RIGHT — door stretches to match left column height */}
          <div className="hidden lg:flex flex-col gap-4">
            <div
              className="truck-door flex-1 flex items-center justify-center relative overflow-visible"
              style={{ minHeight: 380 }}
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
                className="w-[70%] max-w-[280px]"
                style={{ marginTop: '8%' }}
              />
              <span className="absolute -top-3 left-4 border border-ink rounded-full bg-paper font-mono text-[11px] px-2.5 py-1">
                DRIVER SIDE · 2.5" letters
              </span>
              <span className="absolute -bottom-3 right-4 border border-ink rounded-full bg-signal font-mono text-[11px] px-2.5 py-1">
                LIVE PREVIEW
              </span>
            </div>

            <div className="flex justify-between font-mono text-xs text-mute">
              <span>↳ Updates as you type</span>
              <span>Drag-free · No login</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
