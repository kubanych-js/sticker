import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LinkButton } from '../shared/ui/Button';

interface AppLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

const NAV_LINKS = [
  { href: '#builder',    label: 'Builder' },
  { href: '#templates',  label: 'Templates' },
  { href: '#pricing',    label: 'Pricing' },
  { href: '#compliance', label: 'Compliance' },
  { href: '#faq',        label: 'FAQ' },
];

export function AppLayout({ children, showNav = true }: AppLayoutProps) {
  return (
    <div>
      {/* Ticker */}
      <div className="bg-ink text-signal border-t-2 border-b-2 border-ink py-2 font-mono text-xs overflow-hidden">
        <div className="marquee-track">
          {[
            '★ FMCSA 49 CFR § 390.21 COMPLIANT',
            '★ INSTANT PDF + PRINTED SHIPPING',
            '★ USA & CANADA',
            '★ 1,247 STICKERS SHIPPED THIS MONTH',
            '★ AVG DELIVERY 2.3 DAYS',
            '★ FMCSA 49 CFR § 390.21 COMPLIANT',
            '★ INSTANT PDF + PRINTED SHIPPING',
            '★ USA & CANADA',
            '★ 1,247 STICKERS SHIPPED THIS MONTH',
            '★ AVG DELIVERY 2.3 DAYS',
          ].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* Header */}
      <header className="border-b-2 border-ink sticky top-0 bg-paper z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-black tracking-tight">
            <span className="w-7 h-7 bg-signal border-2 border-ink grid place-items-center font-mono text-xs">D</span>
            DOT STICKER PRO
          </Link>

          {showNav && (
            <nav className="hidden md:flex gap-8 font-mono text-sm uppercase">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="hover:underline">{l.label}</a>
              ))}
            </nav>
          )}

          <LinkButton to="/order/step-1" className="px-4 py-2">
            CREATE MINE →
          </LinkButton>
        </div>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t-2 border-ink bg-paper">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap justify-between gap-6 font-mono text-xs uppercase">
          <span>© DOT Sticker Pro · 2025</span>
          <span>Not affiliated with FMCSA · We just follow the spec</span>
          <span>USA · CANADA</span>
        </div>
      </footer>
    </div>
  );
}
