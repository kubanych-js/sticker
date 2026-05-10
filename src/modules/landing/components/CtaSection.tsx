import { LinkButton } from '../../../shared/ui/Button';

export function CtaSection() {
  return (
    <section className="bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="display text-6xl md:text-8xl">
          YOUR DOOR.<br /><span className="text-signal">YOUR DOT.</span>
        </h2>
        <p className="font-mono mt-6 text-sm uppercase">Live preview · No account · Ships in 48h</p>
        <LinkButton to="/order/step-1" className="mt-8 px-8 py-4 text-base">
          CREATE MY STICKER →
        </LinkButton>
      </div>
    </section>
  );
}
