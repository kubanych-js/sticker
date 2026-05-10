const ITEMS = [
  { tag: '✓ MIN. SIZE',   val: '2 inch letter height' },
  { tag: '✓ CONTRAST',   val: 'Sharp / vivid color difference' },
  { tag: '✓ POSITION',   val: 'Both sides of power unit' },
  { tag: '✓ DURABILITY', val: '5-year outdoor vinyl' },
  { tag: '✓ FORMAT',     val: 'Legal name + USDOT №' },
  { tag: '✓ READABILITY',val: 'Visible from 50ft daylight' },
];

export function ComplianceSection() {
  return (
    <section id="compliance" className="border-b-2 border-ink bg-signal">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <span className="font-mono text-xs uppercase">49 CFR § 390.21</span>
          <h2 className="display text-5xl md:text-6xl mt-2">Built to pass<br />roadside inspection.</h2>
          <p className="mt-5 max-w-md">
            Every template is pre-validated against FMCSA marking requirements.
            If a DOT officer pulls you over, your decal isn't the problem.
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3">
          {ITEMS.map(item => (
            <li key={item.tag} className="bg-white border-2 border-ink p-4">
              <span className="font-mono text-xs">{item.tag}</span>
              <div className="font-bold mt-1">{item.val}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
