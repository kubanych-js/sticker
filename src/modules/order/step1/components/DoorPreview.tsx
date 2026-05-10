import { DragEvent } from 'react';
import { StickerText } from '../../../../shared/ui/StickerText';
import type { BuilderState, Side } from '../../../../core/types';
import { cn } from '../../../../core/utils';

interface Props {
  state: BuilderState;
  onChange: (u: Partial<BuilderState>) => void;
  /** Passed from Step1Page; incremented on every debounced update to trigger sticker flash */
  flashTrigger?: number;
  onFileDrop?: (file: File) => void;
}

export function DoorPreview({ state, onChange, flashTrigger, onFileDrop }: Props) {
  const mirrored = state.side === 'passenger';

  function handleDoorDrop(e: DragEvent<HTMLDivElement>) {
    if (state.mode !== 'upload') return;
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && onFileDrop) onFileDrop(file);
  }

  return (
    <div className="space-y-4">
      {/* Door */}
      {/* group enables the FMCSA hover badge — matches HTML .truck-door:hover .door-fmcsa-badge */}
      <div
        className="truck-door-sm rounded-sm relative overflow-hidden flex items-center justify-center group"
        style={{ height: 'calc(100vh - 180px)', maxHeight: 640, minHeight: 440 }}
        onDragOver={e => { if (state.mode === 'upload') e.preventDefault(); }}
        onDrop={handleDoorDrop}
      >
        {/* Window */}
        <div
          className="absolute top-8 left-8 right-20 border border-black/10 rounded-sm"
          style={{ height: '17%', background: 'linear-gradient(160deg,rgba(200,215,245,0.28),rgba(170,195,240,0.1))' }}
        />

        {/* Handle — matches HTML .door-handle */}
        <div
          className={cn('absolute top-1/2 -translate-y-1/2 w-[26px] h-[68px] rounded-sm border-2 border-ink', mirrored ? 'left-[18px]' : 'right-[18px]')}
          style={{ background: '#484848', boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.3)' }}
        />

        {/* FMCSA hover badge — matches HTML .door-fmcsa-badge, opacity:0→1 on hover */}
        <div className="absolute top-[27%] left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="border border-ink rounded-full bg-signal font-mono text-[11px] px-2.5 py-1">
            2.5" letters · FMCSA OK
          </span>
        </div>

        {/* TEXT sticker (design mode) */}
        {state.mode === 'design' && (
          <StickerText
            company={state.name.toUpperCase()}
            usdot={state.usdot}
            mc={state.mc}
            noMc={state.noMc}
            template={state.template}
            size="lg"
            mirrored={mirrored}
            flashTrigger={flashTrigger}
            className="w-[78%] max-w-[300px]"
            style={{ marginTop: '8%' }}
          />
        )}

        {/* IMAGE sticker (upload mode + file) */}
        {state.mode === 'upload' && state.uploadUrl && (
          <img
            src={state.uploadUrl}
            alt="Custom sticker design"
            style={{
              maxWidth: '78%', maxHeight: '54%', marginTop: '8%',
              objectFit: 'contain',
              border: '2px solid #0b0b0c',
              boxShadow: '4px 4px 0 #0b0b0c',
              transform: mirrored ? 'scaleX(-1)' : undefined,
            }}
          />
        )}

        {/* Upload prompt (upload mode, no file yet) */}
        {state.mode === 'upload' && !state.uploadUrl && (
          <div className="flex flex-col items-center justify-center text-center" style={{ marginTop: '8%', maxWidth: '78%' }}>
            <div className="border-2 border-dashed border-ink/30 p-8 w-full">
              <div className="font-mono text-sm text-mute">Your sticker preview<br />will appear here</div>
              <div className="font-mono text-xs text-mute mt-2 opacity-60">↑ Upload a file to see it on the door</div>
            </div>
          </div>
        )}

        {/* Badges */}
        <span className="absolute -top-3 left-5 border border-ink rounded-full bg-paper font-mono text-[11px] px-2.5 py-1">
          {state.side === 'driver' ? 'DRIVER SIDE · 2.5" letters' : 'PASSENGER SIDE · 2.5" letters'}
        </span>
        <span className="absolute -bottom-3 right-5 border border-ink rounded-full bg-signal font-mono text-[11px] px-2.5 py-1">
          LIVE PREVIEW
        </span>
      </div>

      {/* Controls row — matches HTML side-toggle + PDF button */}
      <div className="flex items-center justify-between gap-4">
        {/* Side toggle — matches HTML .side-toggle */}
        <div className="flex border-2 border-ink overflow-hidden">
          {(['driver', 'passenger'] as Side[]).map((s, i) => (
            <button
              key={s}
              onClick={() => onChange({ side: s })}
              className={cn(
                'flex-1 px-4 py-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.05em] transition-all duration-150',
                i === 0 && 'border-r-2 border-ink',
                state.side === s ? 'bg-ink text-paper' : 'bg-white hover:bg-paper',
              )}
            >
              {s === 'driver' ? 'Driver side' : 'Passenger side'}
            </button>
          ))}
        </div>
        <button
          className="border-2 border-ink px-4 py-2 font-mono text-xs font-bold hover:bg-ink hover:text-paper transition-all duration-150"
          onClick={() => alert('Free PDF preview coming soon!')}
        >
          ↓ PREVIEW PDF
        </button>
      </div>

      <div className="flex justify-between font-mono text-xs text-mute">
        <span>↳ Updates live as you type</span>
        <span>No login required</span>
      </div>
    </div>
  );
}
