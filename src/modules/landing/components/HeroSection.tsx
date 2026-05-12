import { StickerText } from '../../../shared/ui/StickerText';
import { LinkButton } from '../../../shared/ui/Button';
import type { Template } from '../../../core/types';

interface CardData {
  company: string;
  usdot: string;
  mc: string;
  noMc?: boolean;
  template: Template;
  tag: string;
}

const CARDS: CardData[] = [
  { company: 'REDLINE TRANSPORT',   usdot: '3214567', mc: '654321', template: 'classic', tag: 'USDOT DECAL'    },
  { company: 'BLUE RIDGE FREIGHT',  usdot: '2918300', mc: '993181', template: 'fleet',   tag: 'FLEET LOGO'    },
  { company: 'PATRIOT HAUL',        usdot: '4027189', mc: '879123', template: 'heavy',   tag: 'HEAVY DUTY'    },
  { company: 'BLACKLINE LOGISTICS', usdot: '1834920', mc: '234567', template: 'classic', tag: 'CLEAN VINYL'   },
  { company: 'GOLDEN STATE',        usdot: '5678901', mc: '',  noMc: true, template: 'custom', tag: 'CUSTOM DESIGN' },
  { company: 'IRON RIDGE HAUL',     usdot: '9012345', mc: '456789', template: 'heavy',   tag: 'TRUCK DOOR'    },
];

const ROW1 = [...CARDS, ...CARDS];
const ROW2 = [...CARDS.slice(3), ...CARDS.slice(0, 3), ...CARDS.slice(3), ...CARDS.slice(0, 3)];

function PreviewCard({ company, usdot, mc, noMc, template, tag }: CardData) {
  return (
    <div className="shrink-0 bg-white border-2 border-ink p-3" style={{ width: 196 }}>
      <div className="font-mono text-[9px] text-mute uppercase tracking-wide mb-2 flex items-center justify-between">
        <span>{tag}</span>
        <span className="w-2 h-2 rounded-full bg-ok flex-shrink-0" />
      </div>
      <StickerText
        company={company}
        usdot={usdot}
        mc={mc}
        noMc={noMc}
        template={template}
        size="sm"
      />
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="builder" className="relative border-b-2 border-ink overflow-hidden" style={{ minHeight: '65vh' }}>
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="pulse-dot" />
              <span className="font-mono text-xs uppercase tracking-widest">Live preview · No account · Instant PDF</span>
            </div>

            <h1 className="display" style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4.2rem)' }}>
              Build truck decals<br />
              <span className="bg-signal px-2">&amp; fleet logos</span><br />
              in minutes.
            </h1>

            <p className="text-base text-neutral-600 max-w-md">
              Choose a template, add company name, USDOT &amp; MC numbers,
              preview the door decal live — then order printed vinyl or download PDF instantly.
              From <span className="font-mono font-bold">$5.99</span>.
            </p>

            <div className="flex flex-wrap gap-3">
              <LinkButton to="/order/step-1" className="px-6 py-3">
                OPEN CONSTRUCTOR →
              </LinkButton>
              <a
                href="#templates"
                className="inline-flex items-center justify-center font-mono font-bold border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper transition-all duration-150 px-6 py-3 text-sm"
              >
                VIEW TEMPLATES
              </a>
            </div>

            <div className="flex flex-wrap gap-5 font-mono text-[11px] text-mute">
              <span>✓ FMCSA 49 CFR § 390.21</span>
              <span>✓ Instant PDF</span>
              <span>✓ Ships in 48h</span>
            </div>
          </div>

          {/* RIGHT — animated template cards in dark frame */}
          <div className="hidden lg:block">
            <div
              className="bg-ink border-2 border-ink overflow-hidden"
              style={{ boxShadow: '8px 8px 0 #0b0b0c' }}
            >
              {/* Top bar */}
              <div
                className="border-b px-4 py-3 flex items-center justify-between"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rust" />
                  <span className="w-3 h-3 rounded-full bg-signal" />
                  <span className="w-3 h-3 rounded-full bg-ok" />
                </div>
                <span
                  className="font-mono text-[10px] rounded-full px-2.5 py-1"
                  style={{ color: '#16a34a', border: '1px solid rgba(22,163,74,0.4)' }}
                >
                  ● LIVE TEMPLATE PREVIEW
                </span>
              </div>

              {/* Scrolling rows */}
              <div className="py-5 overflow-hidden space-y-2.5">
                {/* Row 1 — left */}
                <div style={{
                  display: 'flex', gap: '10px',
                  animation: 'marquee 30s linear infinite',
                  whiteSpace: 'nowrap',
                }}>
                  {ROW1.map((card, i) => <PreviewCard key={i} {...card} />)}
                </div>
                {/* Row 2 — right */}
                <div style={{
                  display: 'flex', gap: '10px',
                  animation: 'marquee 30s linear infinite reverse',
                  whiteSpace: 'nowrap',
                }}>
                  {ROW2.map((card, i) => <PreviewCard key={i} {...card} />)}
                </div>
              </div>

              {/* Bottom bar */}
              <div
                className="border-t px-4 py-3 flex items-center gap-2"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Constructor
                </span>
                <div className="flex gap-1.5 ml-3">
                  {(['DOT Text', 'Logo', 'Colors', 'Export'] as const).map((tool, i) => (
                    <span
                      key={tool}
                      className="font-mono text-[9px] px-2 py-1"
                      style={{
                        border: '1px solid rgba(255,255,255,0.15)',
                        color:  i === 0 ? '#ffcc00' : 'rgba(255,255,255,0.35)',
                        background: i === 0 ? 'rgba(255,204,0,0.08)' : 'transparent',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <span className="ml-auto font-mono text-[10px] font-bold" style={{ color: '#16a34a' }}>
                  READY
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* KPI bar */}
      <div className="border-t-2 border-ink bg-white mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-ink border-x-2 border-ink px-6 lg:px-0">
          {[
            { val: '2.3',   unit: ' days', label: 'avg delivery' },
            { val: '1,247', unit: '',      label: 'shipped / mo' },
            { val: '4.9',   unit: '/5',    label: '120+ reviews' },
            { val: '$5.99', unit: '',      label: 'starting at'  },
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
