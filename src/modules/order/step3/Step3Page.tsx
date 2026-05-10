import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { OrderLayout } from '../../../layouts/OrderLayout';
import { useBuilderState } from '../../../core/hooks/useBuilderState';
import { useOrderState } from '../../../core/hooks/useOrderState';
import { Card, CardHeading } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { FieldInput } from '../../../shared/ui/FieldInput';
import { StickerText } from '../../../shared/ui/StickerText';
import { SIZE_CONFIG, SHIP_CONFIG, TEMPLATE_NAMES } from '../../../core/constants';

const STEPS = [
  { label: 'DESIGN', status: 'done'   as const },
  { label: 'SHIP',   status: 'done'   as const },
  { label: 'REVIEW', status: 'active' as const },
];

export function Step3Page() {
  const navigate = useNavigate();
  const [builder] = useBuilderState();
  const [order]   = useOrderState();

  const [email, setEmail]     = useState('');
  const [touched, setTouched] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const subtotal = order.sizePrice * order.qty;
  const total    = subtotal + order.shipPrice;
  const addrLine = [order.address.street, order.address.apt, order.address.city, order.address.state, order.address.zip]
    .filter(Boolean).join(', ');

  function placeOrder() {
    setTouched(true);
    if (!emailOk) return;

    const conf = {
      orderNum: 'DSP-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
      email:     email.trim(),
      ship:      order.ship,
      shipEta:   SHIP_CONFIG[order.ship].eta,
      total:     total.toFixed(2),
      name:      builder.name,
      usdot:     builder.usdot,
      mc:        builder.noMc ? 'N/A' : builder.mc,
      size:      order.size,
      qty:       order.qty,
      mode:      builder.mode,
      uploadUrl: builder.uploadUrl,
    };

    try { sessionStorage.setItem('dot_success', JSON.stringify(conf)); } catch { /* quota */ }
    localStorage.removeItem('dot_builder');
    localStorage.removeItem('dot_order');
    navigate('/order/success');
  }

  return (
    <OrderLayout steps={STEPS} stepLabel="Step 3 of 3">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* LEFT */}
          <div className="lg:col-span-8 space-y-4">
            <div>
              <h1 className="display text-4xl md:text-5xl">Review your<br />order.</h1>
              <p className="font-mono text-xs text-mute mt-2 uppercase">Everything looks right? Place your order below.</p>
            </div>

            {/* Design card */}
            <Card className="p-6">
              <CardHeading>Design <Link to="/order/step-1" className="ml-auto font-mono text-[10px] underline text-mute">Edit</Link></CardHeading>
              <div className="flex gap-5 items-start">
                {/* Mini door */}
                <div className="truck-door-sm shrink-0 rounded-sm overflow-hidden flex items-center justify-center"
                  style={{ width: 110, height: 145 }}>
                  {builder.mode === 'upload' && builder.uploadUrl ? (
                    <img src={builder.uploadUrl} alt="Uploaded sticker"
                      style={{ width: 86, height: 'auto', maxHeight: 116, objectFit: 'contain', border: '1.5px solid #000', boxShadow: '2px 2px 0 #000' }} />
                  ) : (
                    <StickerText
                      company={(builder.name || 'YOUR COMPANY').toUpperCase()}
                      usdot={builder.usdot || '———'}
                      mc={builder.noMc ? 'N/A' : (builder.mc || '———')}
                      noMc={builder.noMc}
                      template={builder.template}
                      size="sm"
                      style={{ width: '90%' }}
                    />
                  )}
                </div>
                <div className="space-y-1.5">
                  <div>
                    <div className="font-mono text-[10px] text-mute uppercase">{builder.mode === 'upload' ? 'Mode' : 'Template'}</div>
                    <div className="font-bold">{builder.mode === 'upload' ? 'Uploaded design' : (TEMPLATE_NAMES[builder.template] || 'Classic')}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-mute uppercase">Company</div>
                    <div className="font-bold">{builder.name || 'YOUR COMPANY'}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div><div className="font-mono text-[10px] text-mute uppercase">USDOT</div><div className="font-bold font-mono">{builder.usdot || '———'}</div></div>
                    <div><div className="font-mono text-[10px] text-mute uppercase">MC</div><div className="font-bold font-mono">{builder.noMc ? 'N/A' : (builder.mc || '———')}</div></div>
                  </div>
                  <span className="inline-block font-mono text-[0.68rem] px-2.5 py-1 bg-ok text-paper border border-ok rounded-full mt-1">✓ FMCSA validated</span>
                </div>
              </div>
            </Card>

            {/* Shipping card */}
            <Card className="p-6">
              <CardHeading>Size &amp; Shipping <Link to="/order/step-2" className="ml-auto font-mono text-[10px] underline text-mute">Edit</Link></CardHeading>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><div className="font-mono text-[10px] text-mute uppercase mb-1">Sticker size</div><div className="font-bold">{SIZE_CONFIG[order.size].label}</div><div className="font-mono text-xs text-mute mt-0.5">{SIZE_CONFIG[order.size].sub}</div></div>
                <div><div className="font-mono text-[10px] text-mute uppercase mb-1">Quantity</div><div className="font-bold">{order.qty} sticker{order.qty > 1 ? 's' : ''}</div></div>
                <div><div className="font-mono text-[10px] text-mute uppercase mb-1">Shipping method</div><div className="font-bold">{SHIP_CONFIG[order.ship].label}</div><div className="font-mono text-xs text-mute mt-0.5">{SHIP_CONFIG[order.ship].eta}</div></div>
                <div><div className="font-mono text-[10px] text-mute uppercase mb-1">Deliver to</div><div className="font-bold">{order.address.name || '—'}</div><div className="font-mono text-xs text-mute mt-0.5">{addrLine || '—'}</div></div>
              </div>
            </Card>

            {/* Price */}
            <Card className="p-6">
              <CardHeading>Price Breakdown</CardHeading>
              <div className="space-y-2.5">
                <div className="flex justify-between font-mono text-sm"><span>{order.qty}× {SIZE_CONFIG[order.size].label} sticker{order.qty > 1 ? 's' : ''}</span><span className="font-bold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between font-mono text-sm"><span>{SHIP_CONFIG[order.ship].label}</span><span className="font-bold">{order.shipPrice === 0 ? 'FREE' : `$${order.shipPrice.toFixed(2)}`}</span></div>
                <div className="flex justify-between font-mono text-sm text-ok"><span>PDF download</span><span className="font-bold">FREE</span></div>
                <div className="border-t-2 border-ink pt-3 mt-1 flex justify-between items-baseline">
                  <span className="font-black text-xl">Total</span>
                  <span className="display text-3xl">${total.toFixed(2)}</span>
                </div>
              </div>
              <p className="font-mono text-[10px] text-mute mt-4">Prices in USD. Taxes may apply depending on your state.</p>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <Card className="p-6">
              <CardHeading>Place Order</CardHeading>
              <div className="mb-5">
                <FieldInput
                  id="f-email" label="Email for PDF delivery *"
                  type="email" value={email} placeholder="you@example.com"
                  onChange={e => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  onKeyDown={e => { if (e.key === 'Enter') { setTouched(true); if (emailOk) placeOrder(); } }}
                  error={touched && !emailOk ? 'Please enter a valid email.' : ''}
                  hint="Your PDF will be emailed instantly after payment."
                  autoComplete="email"
                />
              </div>
              <div className="border-2 border-ink px-4 py-3 mb-5 flex justify-between items-center">
                <span className="font-mono text-sm">Total</span>
                <span className="display text-2xl">${total.toFixed(2)}</span>
              </div>
              <Button onClick={placeOrder} disabled={!emailOk && touched} className="w-full py-4 text-base">
                PLACE ORDER →
              </Button>
              <p className="font-mono text-[10px] text-mute text-center mt-3">Not charged yet · Secure payment on next screen</p>
            </Card>

            <Card className="p-5 bg-ink text-paper">
              <div className="font-mono text-[10px] text-signal uppercase tracking-widest mb-3">Why trust us</div>
              <ul className="space-y-2 font-mono text-xs">
                <li className="flex gap-2"><span className="text-ok">✓</span>FMCSA 49 CFR § 390.21 validated</li>
                <li className="flex gap-2"><span className="text-ok">✓</span>5-year outdoor vinyl, UV resistant</li>
                <li className="flex gap-2"><span className="text-ok">✓</span>Free PDF — emailed in seconds</li>
                <li className="flex gap-2"><span className="text-ok">✓</span>1,247 stickers shipped this month</li>
                <li className="flex gap-2"><span className="text-ok">✓</span>4.9/5 stars · 120+ reviews</li>
              </ul>
            </Card>

            <div className="border-2 border-ink p-4">
              <div className="font-mono text-[10px] text-mute uppercase tracking-widest mb-1">Refund policy</div>
              <p className="font-mono text-xs">If your sticker arrives damaged or with the wrong information, we reprint and reship at no charge.</p>
            </div>
          </div>
        </div>
      </main>
    </OrderLayout>
  );
}
