import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderLayout } from '../../../layouts/OrderLayout';
import { Card } from '../../../shared/ui/Card';
import { StickerText } from '../../../shared/ui/StickerText';
import { SIZE_CONFIG, SHIP_CONFIG } from '../../../core/constants';
import type { SuccessData } from '../../../core/types';

const STEPS = [
  { label: 'DESIGN', status: 'done' as const },
  { label: 'SHIP',   status: 'done' as const },
  { label: 'REVIEW', status: 'done' as const },
];

const CONFETTI_COLORS = ['#ffcc00', '#16a34a', '#c2410c', '#fff', '#0b0b0c'];

function ConfettiBurst({ target }: { target: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < 18; i++) {
      const d = document.createElement('div');
      const size = 6 + Math.random() * 8;
      Object.assign(d.style, {
        position: 'absolute', borderRadius: '50%',
        width: `${size}px`, height: `${size}px`,
        background: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        border: '1px solid #0b0b0c',
        left: `${20 + Math.random() * 60}px`,
        top:  `${10 + Math.random() * 40}px`,
        animation: `confetti-fall ${0.6 + Math.random() * 0.8}s ${Math.random() * 0.3}s linear forwards`,
        pointerEvents: 'none',
      });
      el.appendChild(d);
      dots.push(d);
    }
    const t = setTimeout(() => dots.forEach(d => d.remove()), 1500);
    return () => clearTimeout(t);
  }, [target]);
  return null;
}

export function SuccessPage() {
  const navigate  = useNavigate();
  const confRef   = useRef<HTMLDivElement>(null);

  let conf: SuccessData | null = null;
  try {
    const raw = sessionStorage.getItem('dot_success');
    if (raw) conf = JSON.parse(raw) as SuccessData;
  } catch { /* noop */ }

  useEffect(() => {
    if (!conf) navigate('/', { replace: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!conf) return null;

  const uploadUrl = conf.uploadUrl || (() => {
    try { return sessionStorage.getItem('dot_upload_img') || ''; } catch { return ''; }
  })();

  const size = conf.size in SIZE_CONFIG ? conf.size : 'B';
  const ship = conf.ship in SHIP_CONFIG ? conf.ship : 'standard';

  return (
    <OrderLayout steps={STEPS} stepLabel="Order confirmed">
      {/* Signal banner */}
      <div className="bg-signal border-b-2 border-ink py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3 font-mono text-xs">
          <span className="font-bold uppercase tracking-widest">Order confirmed</span>
          <span className="text-ink/60">·</span>
          <span className="font-bold">{conf.orderNum}</span>
          <span className="ml-auto text-ink/60">PDF being prepared…</span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* LEFT */}
          <div className="lg:col-span-7 space-y-6">

            {/* Hero check */}
            <div className="anim-pop flex flex-col items-start gap-4">
              <div className="relative">
                <div
                  ref={confRef}
                  className="w-20 h-20 bg-ok border-2 border-ink grid place-items-center relative overflow-visible"
                  style={{ boxShadow: '5px 5px 0 #0b0b0c', fontSize: '2.5rem' }}
                >
                  ✓
                </div>
                <ConfettiBurst target={confRef} />
              </div>
              <div>
                <p className="font-mono text-xs text-mute uppercase tracking-widest mb-1">You're good to go</p>
                <h1 className="display" style={{ fontSize: 'clamp(3rem,6vw,5rem)' }}>Order<br />placed!</h1>
              </div>
            </div>

            {/* What's next */}
            <Card className="p-6 anim-up-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute mb-5">What happens next</p>
              {[
                { n: '1', title: 'PDF sent to your inbox', body: <>Your print-ready DOT sticker PDF lands in <strong>{conf.email}</strong> within minutes.</> },
                { n: '2', title: 'Production starts today', body: 'Your vinyl stickers enter production within 2 hours. UV-resistant, outdoor-grade material.' },
                { n: '3', title: `Ships in ${SHIP_CONFIG[ship].eta}`, body: "You'll receive a tracking number by email as soon as your package leaves our facility." },
              ].map(s => (
                <div key={s.n} className="flex gap-4 items-start mb-5 last:mb-0">
                  <div className="w-8 h-8 bg-signal border-2 border-ink grid place-items-center font-mono text-xs font-bold flex-shrink-0">{s.n}</div>
                  <div><div className="font-bold">{s.title}</div><p className="font-mono text-xs text-mute mt-0.5">{s.body}</p></div>
                </div>
              ))}
            </Card>

            {/* Order details */}
            <Card className="p-6 anim-up-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute mb-5">Order details</p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="font-mono text-[10px] text-mute uppercase mb-2">Your sticker</div>
                  <div className="truck-door-sm rounded-sm overflow-hidden flex items-center justify-center" style={{ width: 100, height: 130 }}>
                    {conf.mode === 'upload' && uploadUrl ? (
                      <img src={uploadUrl} alt="Sticker"
                        style={{ width: 80, maxHeight: 108, objectFit: 'contain', border: '1.5px solid #000', boxShadow: '2px 2px 0 #000' }} />
                    ) : (
                      <StickerText
                        company={(conf.name || 'YOUR COMPANY').toUpperCase()}
                        usdot={conf.usdot || '———'}
                        mc={conf.mc || '———'}
                        size="sm"
                        style={{ width: '90%' }}
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <div><div className="font-mono text-[10px] text-mute uppercase">Order #</div><div className="font-bold font-mono mt-0.5">{conf.orderNum}</div></div>
                  <div><div className="font-mono text-[10px] text-mute uppercase">Sticker size</div><div className="font-bold mt-0.5">{SIZE_CONFIG[size].label}</div></div>
                  <div><div className="font-mono text-[10px] text-mute uppercase">Quantity</div><div className="font-bold mt-0.5">{conf.qty} sticker{conf.qty > 1 ? 's' : ''}</div></div>
                  <div><div className="font-mono text-[10px] text-mute uppercase">Shipping</div><div className="font-bold mt-0.5">{SHIP_CONFIG[ship].label}</div></div>
                  <div><div className="font-mono text-[10px] text-mute uppercase">Total paid</div><div className="display text-2xl mt-0.5">${conf.total}</div></div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 anim-up-3">
              <Link to="/"
                className="inline-flex items-center justify-center font-mono font-bold border-2 border-ink bg-signal text-ink shadow-card-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-card transition-all px-6 py-3 text-sm">
                ← BACK TO HOME
              </Link>
              <button
                onClick={() => alert(`Your PDF has been emailed to ${conf!.email}.`)}
                className="inline-flex items-center justify-center font-mono font-bold border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper transition-all px-6 py-3 text-sm">
                ↓ DOWNLOAD PDF
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4 anim-up-4">
            <Card className="p-6 bg-ink text-paper">
              <div className="font-mono text-[10px] text-signal uppercase tracking-widest mb-3">FMCSA Reminder</div>
              <p className="font-mono text-xs leading-relaxed mb-4">
                Per 49 CFR § 390.21, markings must appear on <strong className="text-signal">both sides</strong> of the power unit.
              </p>
              <div className="border border-white/20 p-3 font-mono text-xs space-y-1">
                <div className="flex justify-between"><span className="text-white/60">Driver side</span><span className="text-ok">✓ Covered</span></div>
                <div className="flex justify-between"><span className="text-white/60">Passenger side</span><span className="text-ok">✓ Covered</span></div>
                <div className="flex justify-between"><span className="text-white/60">PDF copy</span><span className="text-ok">✓ Emailed</span></div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-mute mb-3">Need help?</div>
              <ul className="space-y-2 font-mono text-xs text-mute">
                <li className="flex gap-2"><span>📧</span><span>Check spam if the PDF doesn't arrive within 5 minutes.</span></li>
                <li className="flex gap-2"><span>🔁</span><span>Wrong info? Reply to the confirmation email for a free reprint.</span></li>
                <li className="flex gap-2"><span>📦</span><span>Tracking number sent within 48 hours of production.</span></li>
              </ul>
            </Card>

            <div className="border-2 border-ink p-5 bg-signal">
              <div className="font-black text-lg mb-1">Need more stickers?</div>
              <p className="font-mono text-xs mb-4">Order 4+ and get 10% off automatically.</p>
              <Link to="/"
                className="flex items-center justify-center font-mono font-bold border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper transition-all px-4 py-2.5 text-sm">
                ORDER ANOTHER →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </OrderLayout>
  );
}
