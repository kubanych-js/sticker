import { Card } from '../../../shared/ui/Card';

const STEPS = [
  { num: '01', title: 'Type your numbers', body: 'USDOT, MC, company name. Live preview updates instantly. Pick a template you like.' },
  { num: '02', title: 'Pick size & ship',   body: '3 standard sizes or custom. Ground shipping anywhere in USA & Canada in 2–3 business days.' },
  { num: '03', title: 'Stick & roll',       body: 'PDF download is instant — print locally or wait for the printed vinyl. Both included.' },
];

export function HowItWorks() {
  return (
    <section className="border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <h2 className="display text-5xl md:text-6xl">How it<br />actually works.</h2>
          <p className="font-mono text-sm max-w-sm">No accounts. No upsells. Three honest steps from input to a printed decal on your door.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map(s => (
            <Card key={s.num} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs">STEP {s.num}</span>
                <span className="hatch w-16 h-4" />
              </div>
              <h3 className="display text-2xl mb-2">{s.title}</h3>
              <p className="text-neutral-700">{s.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
