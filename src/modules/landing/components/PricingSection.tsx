import { Card } from '../../../shared/ui/Card';
import { LinkButton } from '../../../shared/ui/Button';

const PLANS = [
  { size: 'A', dims: '30 × 18 cm', price: '$5.99', features: ['Compact pickups, vans', '2.0″ letters', 'PDF + printed'], popular: false },
  { size: 'B', dims: '45 × 25 cm', price: '$8.99', features: ['Box trucks, day cabs', '2.5″ letters (FMCSA min.)', 'PDF + printed + spare'], popular: true },
  { size: 'C', dims: '60 × 35 cm', price: '$12.99', features: ['Sleepers, heavy haul', '3.5″ letters', 'Reflective vinyl option'], popular: false },
];

export function PricingSection() {
  return (
    <section id="pricing" className="border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <h2 className="display text-5xl md:text-6xl">Honest pricing.<br />No subscriptions.</h2>
          <p className="font-mono text-sm max-w-sm">Pay once per sticker. PDF + printed vinyl always included.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map(p => (
            <Card key={p.size} className={`p-6${p.popular ? ' bg-signal -translate-y-2' : ''}`}>
              <div className="font-mono text-xs">SIZE {p.size}{p.popular ? ' · MOST POPULAR' : ''}</div>
              <div className="display text-4xl mt-1">{p.dims}</div>
              <div className="display text-5xl mt-4">{p.price}</div>
              <ul className="mt-5 space-y-2 font-mono text-sm">
                {p.features.map(f => <li key={f}>✓ {f}</li>)}
              </ul>
              <LinkButton to="/order/step-1" className="w-full mt-6 px-4 py-3">
                ORDER SIZE {p.size} →
              </LinkButton>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
