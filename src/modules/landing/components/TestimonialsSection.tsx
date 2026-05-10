const REVIEWS = [
  { stars: '★★★★★', truck: 'KENWORTH T680',         quote: '"Typed my DOT, saw the sticker, paid 9 bucks. Truck was legal by Friday."',                                 name: 'Marcus R., Dallas TX',    dark: false },
  { stars: '★★★★★', truck: 'FREIGHTLINER CASCADIA', quote: '"Ordered for 14 trucks. Fleet template kept all of them consistent. No more crooked decals."',              name: 'Lupe G., fleet manager',  dark: true  },
  { stars: '★★★★★', truck: 'PETERBILT 389',          quote: '"Heavy-Duty template was readable from across the yard. DOT officer didn\'t even slow down."',              name: 'Danny K., owner-operator', dark: false },
];

export function TestimonialsSection() {
  return (
    <section className="border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="display text-5xl md:text-6xl mb-10">Real owner-operators.<br />Real doors.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map(r => (
            <figure key={r.name} className={`border-2 border-ink shadow-card p-6${r.dark ? ' bg-ink text-paper' : ' bg-white'}`}>
              <div className="font-mono text-xs">{r.stars} · {r.truck}</div>
              <blockquote className="mt-3 italic">{r.quote}</blockquote>
              <figcaption className="mt-4 font-mono text-xs">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
