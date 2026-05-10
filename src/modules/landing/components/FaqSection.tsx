import { useState } from 'react';
import { cn } from '../../../core/utils';

const FAQS = [
  { q: 'What sizes are available?',       a: 'Three standards: 30×18 ($5.99), 45×25 ($8.99), 60×35 ($12.99). Custom sizes from $14.99.' },
  { q: 'Do I need an account?',           a: "No. Email + shipping address is enough. We don't store cards." },
  { q: 'How fast is shipping?',           a: '2–3 business days in continental USA, 3–5 to Canada. PDF is delivered instantly to your email.' },
  { q: 'Can I just get the PDF?',         a: "Yes — PDF-only is $3.99 if you'd rather print at a local shop." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-5">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="display text-xl">{q}</span>
        <span className={cn('font-mono text-2xl transition-transform duration-200', open && 'rotate-45')}>+</span>
      </button>
      {open && <p className="mt-3 text-neutral-700">{a}</p>}
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="border-b-2 border-ink bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="display text-5xl md:text-6xl mb-10">FAQ</h2>
        <div className="divide-y-2 divide-ink border-y-2 border-ink">
          {FAQS.map(f => <FaqItem key={f.q} {...f} />)}
        </div>
      </div>
    </section>
  );
}
