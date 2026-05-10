import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { Card, CardHeading } from '../../../../shared/ui/Card';
import { Button } from '../../../../shared/ui/Button';
import type { BuilderState } from '../../../../core/types';
import { compressImage } from '../../../../core/utils';
import { cn } from '../../../../core/utils';

const ACCEPT = '.png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml';
const MAX_MB  = 10;
const ALLOWED = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];

interface Props {
  state: BuilderState;
  onChange: (u: Partial<BuilderState>) => void;
}

function fmtSize(b: number) {
  if (b < 1024)            return `${b} B`;
  if (b < 1024 * 1024)     return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

export function UploadPanel({ state, onChange }: Props) {
  const inputRef               = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError]       = useState('');

  function showError(msg: string) {
    setError(msg);
    setTimeout(() => setError(''), 4000);
  }

  async function handleFile(file: File) {
    setError('');
    if (!ALLOWED.includes(file.type)) {
      showError('Unsupported format. Please use PNG, JPG, or SVG.');
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      showError(`File too large (${fmtSize(file.size)}). Maximum is ${MAX_MB} MB.`);
      return;
    }
    const url = await compressImage(file);
    onChange({ uploadUrl: url, uploadName: file.name });
  }

  // Match HTML: only clear drag-over when leaving to outside the zone
  function onDragLeave(e: DragEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOver(false);
    }
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  function clearUpload() {
    onChange({ uploadUrl: null, uploadName: null });
  }

  const hasFile = !!state.uploadUrl;

  return (
    <Card className="p-6">
      <CardHeading>
        <span className="w-5 h-5 border-2 border-ink grid place-items-center text-[0.8rem] font-bold">↑</span>
        Upload Your Sticker File
      </CardHeading>

      {/* Drop zone — matches HTML .drop-zone classes exactly */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload sticker file — click or drag and drop"
        onClick={() => !hasFile && inputRef.current?.click()}
        onKeyDown={e => { if (!hasFile && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); inputRef.current?.click(); } }}
        onDragEnter={e => { e.preventDefault(); e.stopPropagation(); setDragOver(true); }}
        onDragOver={e => { e.preventDefault(); e.stopPropagation(); setDragOver(true); }}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          // Base: matches HTML .drop-zone
          'relative transition-[background,border-style] duration-150',
          // Dashed border default; solid when has-file or drag-over
          hasFile || dragOver
            ? 'border-2 border-solid'
            : 'border-2 border-dashed cursor-pointer hover:bg-paper',
          dragOver ? 'bg-signal border-ink' : hasFile ? 'border-ok' : 'border-ink',
        )}
      >
        {/* Idle state */}
        {!hasFile && (
          <div className="p-8 text-center group">
            {/* dz-icon: floats translateY(-4px) on hover or drag-over — matches HTML */}
            <div className={cn(
              'text-[2.5rem] leading-none mb-2 transition-transform duration-200',
              // cubic-bezier(.2,.7,.2,1) — use inline style for precision
              dragOver ? '-translate-y-1' : 'group-hover:-translate-y-1',
            )} style={{ transitionTimingFunction: 'cubic-bezier(.2,.7,.2,1)' }}>
              ↑
            </div>
            <div className="font-bold text-base">Drop your file here</div>
            <div className="font-mono text-xs text-mute mt-1.5">PNG · JPG · SVG · up to {MAX_MB} MB</div>
            <Button
              variant="primary"
              onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
              className="mt-5 px-5 py-2.5 text-xs gap-2"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 10v2h12v-2M7 1v8M4 4l3-3 3 3" />
              </svg>
              BROWSE FILES
            </Button>
          </div>
        )}

        {/* Uploaded / preview state */}
        {hasFile && (
          <div className="p-4 text-center">
            <img
              src={state.uploadUrl!}
              alt="Sticker preview"
              className="max-h-44 mx-auto object-contain border-2 border-ink mb-3"
              style={{ boxShadow: '3px 3px 0 #0b0b0c' }}
            />
            <div className="font-mono text-sm font-bold truncate">{state.uploadName}</div>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); clearUpload(); }}
              className="inline-flex items-center gap-1.5 border-2 border-ink px-3 py-1.5 font-mono text-xs font-bold mt-3 hover:bg-ink hover:text-paper transition-colors duration-150"
            >
              ✕ REMOVE &amp; CHOOSE ANOTHER
            </button>
          </div>
        )}
      </div>

      {error && <p className="font-mono text-xs text-rust mt-2">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={onInputChange}
      />

      {/* Tips */}
      <div className="mt-4 space-y-1.5">
        {[
          'Use a high-resolution file (300 dpi+) for sharp printed results.',
          'SVG files scale perfectly to any size. PNG/JPG work great too.',
          'USDOT and company name must be legible — we validate for FMCSA.',
        ].map(tip => (
          <div key={tip} className="font-mono text-[10px] text-mute flex items-start gap-2">
            <span className="shrink-0">→</span>
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
