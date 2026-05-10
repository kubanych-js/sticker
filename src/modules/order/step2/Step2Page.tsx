import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { OrderLayout } from '../../../layouts/OrderLayout';
import { useBuilderState } from '../../../core/hooks/useBuilderState';
import { useOrderState } from '../../../core/hooks/useOrderState';
import { Card, CardHeading } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { FieldInput, FieldSelect } from '../../../shared/ui/FieldInput';
import { StickerText } from '../../../shared/ui/StickerText';
import { SIZE_CONFIG, SHIP_CONFIG, US_STATES } from '../../../core/constants';
import type { StickerSize, ShippingMethod } from '../../../core/types';
import { cn } from '../../../core/utils';

const STEPS = [
  { label: 'DESIGN', status: 'done'   as const },
  { label: 'SHIP',   status: 'active' as const },
  { label: 'REVIEW', status: 'pending' as const },
];

const SIZES = Object.keys(SIZE_CONFIG) as StickerSize[];
const SHIPS = Object.keys(SHIP_CONFIG) as ShippingMethod[];

export function Step2Page() {
  const navigate = useNavigate();
  const [builder] = useBuilderState();
  const [order, setOrder] = useOrderState();

  const [addr, setAddr] = useState(order.address);
  const [touched, setTouch] = useState<Partial<Record<keyof typeof addr, boolean>>>({});

  function touch(k: keyof typeof addr) { setTouch(t => ({ ...t, [k]: true })); }
  function err(k: keyof typeof addr) {
    if (!touched[k]) return '';
    if (k === 'zip') return /^\d{5}$/.test(addr.zip) ? '' : 'Valid 5-digit ZIP required.';
    return addr[k].trim() ? '' : `${k.charAt(0).toUpperCase() + k.slice(1)} is required.`;
  }

  const required: (keyof typeof addr)[] = ['name', 'street', 'city', 'state', 'zip'];
  const addrValid = required.every(k =>
    k === 'zip' ? /^\d{5}$/.test(addr.zip) : addr[k].trim().length > 0
  );

  const subtotal = order.sizePrice * order.qty;
  const total    = subtotal + order.shipPrice;

  function handleContinue() {
    const allTouched = Object.fromEntries(required.map(k => [k, true]));
    setTouch(allTouched);
    if (!addrValid) return;
    setOrder({ ...order, address: addr });
    navigate('/order/step-3');
  }

  return (
    <OrderLayout steps={STEPS} stepLabel="Step 2 of 3">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* LEFT */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="display text-4xl md:text-5xl">Size &amp;<br />shipping.</h1>
              <p className="font-mono text-xs text-mute mt-2 uppercase">Choose size, quantity, and where to ship</p>
            </div>

            {/* Size */}
            <Card className="p-6">
              <CardHeading><span className="w-5 h-5 border-2 border-ink grid place-items-center text-[0.65rem] font-bold">1</span> Sticker Size</CardHeading>
              <div className="space-y-3">
                {SIZES.map(s => {
                  const cfg = SIZE_CONFIG[s];
                  const active = order.size === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setOrder({ size: s, sizePrice: cfg.price })}
                      className={cn('w-full border-2 border-ink text-left p-4 relative transition-all duration-150',
                        active ? 'bg-signal shadow-card-sm' : 'bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-card-sm',
                      )}
                    >
                      {s === 'B' && (
                        <span className="absolute -top-2.5 right-3 bg-rust text-paper font-mono text-[10px] font-bold px-2 py-0.5 border border-ink">
                          MOST POPULAR
                        </span>
                      )}
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="font-mono text-xs text-mute">SIZE {s}</div>
                          <div className="display text-2xl leading-none mt-0.5">{cfg.label.replace(`Size ${s} — `, '')}</div>
                          <div className="font-mono text-xs mt-1.5">{cfg.sub}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="display text-2xl">${cfg.price.toFixed(2)}</div>
                          <div className="font-mono text-[10px]">per sticker</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Qty */}
            <Card className="p-6">
              <CardHeading><span className="w-5 h-5 border-2 border-ink grid place-items-center text-[0.65rem] font-bold">2</span> Quantity</CardHeading>
              <div className="flex items-center gap-3">
                <button onClick={() => setOrder({ qty: Math.max(1, order.qty - 1) })}
                  className="w-9 h-9 border-2 border-ink bg-white hover:bg-ink hover:text-paper font-bold text-xl grid place-items-center transition-colors">−</button>
                <div className="w-16 text-center border-2 border-ink font-mono text-lg font-bold py-1.5">{order.qty}</div>
                <button onClick={() => setOrder({ qty: Math.min(99, order.qty + 1) })}
                  className="w-9 h-9 border-2 border-ink bg-white hover:bg-ink hover:text-paper font-bold text-xl grid place-items-center transition-colors">+</button>
                <span className="font-mono text-xs text-mute">stickers</span>
              </div>
              {order.qty >= 4 && (
                <p className="font-mono text-xs text-ok mt-3">✓ Bulk discount: 10% off applied automatically</p>
              )}
              <p className="font-mono text-[10px] text-mute mt-2">Order 4+ stickers for 10% off. PDF included with every sticker.</p>
            </Card>

            {/* Shipping */}
            <Card className="p-6">
              <CardHeading><span className="w-5 h-5 border-2 border-ink grid place-items-center text-[0.65rem] font-bold">3</span> Shipping Method</CardHeading>
              <div className="space-y-2">
                {SHIPS.map(s => {
                  const cfg = SHIP_CONFIG[s];
                  const active = order.ship === s;
                  return (
                    <button key={s} onClick={() => setOrder({ ship: s, shipPrice: cfg.price })}
                      className={cn('w-full border-2 border-ink flex items-center gap-3 p-3.5 transition-colors',
                        active ? 'bg-signal' : 'bg-white hover:bg-paper',
                      )}>
                      <div className={cn('w-4.5 h-4.5 rounded-full border-2 border-ink grid place-items-center flex-shrink-0', active && 'after:content-[""] after:w-2 after:h-2 after:rounded-full after:bg-ink')} />
                      <div className="flex-1 text-left">
                        <div className="font-bold text-sm">{cfg.label}</div>
                        <div className="font-mono text-xs text-mute">{cfg.eta}</div>
                      </div>
                      <div className="font-mono font-bold text-sm">{cfg.price === 0 ? 'FREE' : `+$${cfg.price.toFixed(2)}`}</div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Address */}
            <Card className="p-6">
              <CardHeading><span className="w-5 h-5 border-2 border-ink grid place-items-center text-[0.65rem] font-bold">4</span> Delivery Address</CardHeading>
              <div className="space-y-3">
                <FieldInput id="a-name" label="Full name *" value={addr.name}
                  onChange={e => setAddr(a => ({ ...a, name: e.target.value }))}
                  onBlur={() => touch('name')} error={err('name')} autoComplete="name" />
                <FieldInput id="a-street" label="Street address *" value={addr.street}
                  onChange={e => setAddr(a => ({ ...a, street: e.target.value }))}
                  onBlur={() => touch('street')} error={err('street')} autoComplete="address-line1" />
                <FieldInput id="a-apt" label="Apt / Suite (optional)" value={addr.apt}
                  onChange={e => setAddr(a => ({ ...a, apt: e.target.value }))} autoComplete="address-line2" />
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput id="a-city" label="City *" value={addr.city}
                    onChange={e => setAddr(a => ({ ...a, city: e.target.value }))}
                    onBlur={() => touch('city')} error={err('city')} autoComplete="address-level2" />
                  <FieldSelect id="a-state" label="State *" value={addr.state}
                    onChange={e => setAddr(a => ({ ...a, state: e.target.value }))}
                    onBlur={() => touch('state')} error={err('state')} autoComplete="address-level1">
                    <option value="">— Select —</option>
                    {US_STATES.map(s => <option key={s}>{s}</option>)}
                  </FieldSelect>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput id="a-zip" label="ZIP code *" value={addr.zip} maxLength={5} inputMode="numeric"
                    onChange={e => setAddr(a => ({ ...a, zip: e.target.value.replace(/\D/g, '') }))}
                    onBlur={() => touch('zip')} error={err('zip')} autoComplete="postal-code" />
                  <FieldSelect id="a-country" label="Country *" value={addr.country}
                    onChange={e => setAddr(a => ({ ...a, country: e.target.value }))} autoComplete="country">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </FieldSelect>
                </div>
              </div>
            </Card>

            <div className="flex gap-3 pt-1">
              <Link to="/order/step-1"
                className="inline-flex items-center justify-center font-mono font-bold border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper transition-all px-5 py-3 text-sm">
                ← BACK
              </Link>
              <Button onClick={handleContinue} className="flex-1 px-5 py-3">
                CONTINUE TO REVIEW →
              </Button>
            </div>
          </div>

          {/* RIGHT — summary */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
            <Card className="p-6">
              <CardHeading>Your Sticker</CardHeading>
              <div className="flex gap-4 items-start">
                {builder.mode === 'upload' && builder.uploadUrl ? (
                  <img src={builder.uploadUrl} alt="Uploaded design"
                    className="shrink-0 border-2 border-ink object-contain"
                    style={{ width: 140, height: 'auto', maxHeight: 130, boxShadow: '3px 3px 0 #0b0b0c' }} />
                ) : (
                  <StickerText
                    company={(builder.name || 'YOUR COMPANY').toUpperCase()}
                    usdot={builder.usdot || '———'}
                    mc={builder.noMc ? 'N/A' : (builder.mc || '———')}
                    noMc={builder.noMc}
                    template={builder.template}
                    size="sm"
                    className="shrink-0"
                    style={{ minWidth: 140 }}
                  />
                )}
                <div className="min-w-0">
                  <div className="font-mono text-xs text-mute uppercase">
                    {builder.mode === 'upload' ? 'Mode' : 'Template'}
                  </div>
                  <div className="font-bold capitalize mt-0.5">
                    {builder.mode === 'upload' ? 'Uploaded design' : builder.template}
                  </div>
                  <Link to="/order/step-1" className="font-mono text-xs text-mute underline mt-1 inline-block">Edit design</Link>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <CardHeading>Order Summary</CardHeading>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div><div className="font-mono text-xs text-mute">SIZE</div><div className="font-bold mt-0.5">{SIZE_CONFIG[order.size].label}</div></div>
                  <div className="font-mono font-bold">${order.sizePrice.toFixed(2)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div><div className="font-mono text-xs text-mute">QUANTITY</div><div className="font-bold mt-0.5">{order.qty} sticker{order.qty > 1 ? 's' : ''}</div></div>
                  <div className="font-mono font-bold">× {order.qty}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div><div className="font-mono text-xs text-mute">SHIPPING</div><div className="font-bold mt-0.5">{SHIP_CONFIG[order.ship].label}</div></div>
                  <div className="font-mono font-bold">{order.shipPrice === 0 ? 'FREE' : `$${order.shipPrice.toFixed(2)}`}</div>
                </div>
                <div className="border-t-2 border-ink my-3" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-mute">SUBTOTAL</span>
                  <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between bg-signal px-3 py-2 border-2 border-ink -mx-1">
                  <span className="font-black text-lg">TOTAL</span>
                  <span className="display text-2xl">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-5 space-y-1.5">
                <p className="flex gap-2 font-mono text-xs text-ok"><span>✓</span><span>PDF download included — sent instantly</span></p>
                <p className="flex gap-2 font-mono text-xs text-mute"><span>✓</span><span>FMCSA 49 CFR § 390.21 validated</span></p>
                <p className="flex gap-2 font-mono text-xs text-mute"><span>✓</span><span>5-year outdoor vinyl, UV resistant</span></p>
              </div>
            </Card>

            <div className="border-2 border-ink bg-ink text-paper p-4">
              <div className="font-mono text-xs uppercase tracking-widest text-signal mb-2">FMCSA Requirement</div>
              <p className="text-sm">Both driver and passenger sides of the power unit must display identical markings. Each sticker set covers both sides.</p>
            </div>
          </div>
        </div>
      </main>
    </OrderLayout>
  );
}
