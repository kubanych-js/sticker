export function TemplatesSection() {
  return (
    <section id="templates" className="border-b-2 border-ink bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <h2 className="display text-5xl md:text-6xl">
            Four templates.<br /><span className="text-signal">Real differences.</span>
          </h2>
          <p className="font-mono text-sm max-w-sm text-neutral-300">
            Each template is calibrated for a different rig and inspection style.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Classic */}
          <div className="bg-white text-ink border-2 border-signal p-5">
            <div className="bg-neutral-100 border-2 border-ink p-4 text-center">
              <div className="font-black text-xl">REDLINE</div>
              <div className="font-mono text-xs">USDOT 3214567</div>
              <div className="font-mono text-xs">MC 654321</div>
            </div>
            <h4 className="display text-xl mt-4">Classic</h4>
            <p className="text-sm mt-1 text-neutral-600">For owner-operators. Minimum, max readable.</p>
          </div>
          {/* Fleet */}
          <div className="bg-white text-ink border-2 border-signal p-5">
            <div className="bg-neutral-100 border-2 border-ink p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 bg-rust" />
                <span className="font-black">REDLINE LLC</span>
              </div>
              <div className="border-t border-ink my-2" />
              <div className="font-mono text-xs">USDOT 3214567 · MC 654321</div>
            </div>
            <h4 className="display text-xl mt-4">Fleet</h4>
            <p className="text-sm mt-1 text-neutral-600">For multi-truck companies with logo + tagline slot.</p>
          </div>
          {/* Heavy */}
          <div className="bg-white text-ink border-2 border-signal p-5">
            <div className="bg-neutral-100 border-2 border-ink p-4 text-center">
              <div className="display text-2xl">REDLINE</div>
              <div className="font-mono text-[10px] mt-1">USDOT</div>
              <div className="display text-3xl">3214567</div>
            </div>
            <h4 className="display text-xl mt-4">Heavy-Duty</h4>
            <p className="text-sm mt-1 text-neutral-600">Oversized digits — visible from 50ft. Dump trucks, tankers.</p>
          </div>
          {/* Custom */}
          <div className="bg-signal text-ink border-2 border-signal p-5">
            <div className="border-2 border-dashed border-ink p-4 text-center min-h-[110px] grid place-items-center">
              <div>
                <div className="font-mono text-xs">YOUR FONTS</div>
                <div className="font-mono text-xs">YOUR COLORS</div>
                <div className="font-mono text-xs">YOUR LAYOUT</div>
              </div>
            </div>
            <h4 className="display text-xl mt-4">Custom</h4>
            <p className="text-sm mt-1">Send a brief — we draft within 24h. +$14.99.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
