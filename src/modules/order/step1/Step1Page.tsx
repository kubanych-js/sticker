import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { OrderLayout } from '../../../layouts/OrderLayout';
import { useBuilderState } from '../../../core/hooks/useBuilderState';
import { compressImage } from '../../../core/utils';
import { ModeToggle } from './components/ModeToggle';
import { CompanyInfoCard } from './components/CompanyInfoCard';
import { DesignPanel } from './components/DesignPanel';
import { UploadPanel } from './components/UploadPanel';
import { DoorPreview } from './components/DoorPreview';
import { MobilePreviewBar } from './components/MobilePreviewBar';
import { Button } from '../../../shared/ui/Button';

const ALLOWED = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
const MAX_MB  = 10;

const STEPS = [
  { label: 'DESIGN', status: 'active' as const },
  { label: 'SHIP',   status: 'pending' as const },
  { label: 'REVIEW', status: 'pending' as const },
];

export function Step1Page() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [state, setState] = useBuilderState();
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    if (params.get('mode') === 'upload') setState({ mode: 'upload' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced sticker flash — fires 80ms after any design field changes
  useEffect(() => {
    if (state.mode !== 'design') return;
    const t = setTimeout(() => setFlashKey(k => k + 1), 80);
    return () => clearTimeout(t);
  }, [state.name, state.usdot, state.mc, state.noMc, state.template, state.mode]);

  const handleFileDrop = useCallback(async (file: File) => {
    if (!ALLOWED.includes(file.type)) return;
    if (file.size > MAX_MB * 1024 * 1024) return;
    const url = await compressImage(file);
    setState({ uploadUrl: url, uploadName: file.name });
  }, [setState]);

  const canContinue =
    state.name.trim().length > 0 &&
    /^\d{5,8}$/.test(state.usdot) &&
    (state.mode === 'design' || !!state.uploadUrl);

  function handleContinue() {
    if (canContinue) navigate('/order/step-2');
  }

  const ctaTitle = !state.name.trim()
    ? 'Enter your company name first.'
    : !/^\d{5,8}$/.test(state.usdot)
    ? 'Enter a valid USDOT number (5–8 digits).'
    : state.mode === 'upload' && !state.uploadUrl
    ? 'Upload your sticker design first.'
    : '';

  return (
    <OrderLayout steps={STEPS} stepLabel="Step 1 of 3">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* LEFT */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="display text-4xl md:text-5xl">Design your<br />sticker.</h1>
              <p className="font-mono text-xs text-mute mt-2 uppercase">
                Build from scratch or upload your own artwork
              </p>
            </div>

            <ModeToggle mode={state.mode} onChange={mode => setState({ mode })} />
            <CompanyInfoCard state={state} onChange={setState} />

            {state.mode === 'design' && <DesignPanel state={state} onChange={setState} />}
            {state.mode === 'upload' && <UploadPanel state={state} onChange={setState} />}

            <div className="flex gap-3 pt-1">
              <Link
                to="/"
                className="inline-flex items-center justify-center font-mono font-bold border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper transition-all duration-150 px-5 py-3 text-sm"
              >
                ← BACK
              </Link>
              <Button
                onClick={handleContinue}
                disabled={!canContinue}
                title={ctaTitle}
                className="flex-1 px-5 py-3"
              >
                CONTINUE TO SIZE & SHIPPING →
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <DoorPreview
              state={state}
              onChange={setState}
              flashTrigger={flashKey}
              onFileDrop={handleFileDrop}
            />
          </div>
        </div>
      </main>

      <MobilePreviewBar state={state} flashTrigger={flashKey} />
    </OrderLayout>
  );
}
