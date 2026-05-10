import { StickerText } from '../../../../shared/ui/StickerText';
import type { BuilderState } from '../../../../core/types';

interface Props {
  state: BuilderState;
  flashTrigger?: number;
}

export function MobilePreviewBar({ state, flashTrigger }: Props) {
  return (
    <div
      className="fixed bottom-0 inset-x-0 lg:hidden bg-ink border-t-2 border-ink z-30"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="px-4 py-3 flex items-center gap-4 max-w-7xl mx-auto">

        {/* Text sticker preview (design mode) */}
        {state.mode === 'design' && (
          <div style={{ transform: 'scale(0.65)', transformOrigin: 'left center', flexShrink: 0 }}>
            <StickerText
              company={state.name.toUpperCase()}
              usdot={state.usdot}
              mc={state.mc}
              noMc={state.noMc}
              template={state.template}
              size="md"
              flashTrigger={flashTrigger}
            />
          </div>
        )}

        {/* Upload image preview (upload mode + file) */}
        {state.mode === 'upload' && state.uploadUrl && (
          <img
            src={state.uploadUrl}
            alt="Sticker"
            className="shrink-0 object-contain border border-ink/40 bg-white"
            style={{ height: 64, maxWidth: 120, boxShadow: '2px 2px 0 rgba(255,255,255,0.25)' }}
          />
        )}

        {/* Upload mode, no file: placeholder text */}
        {state.mode === 'upload' && !state.uploadUrl && (
          <div
            className="shrink-0 bg-white border border-ink/40 flex items-center justify-center font-mono text-[9px] text-mute"
            style={{ minWidth: 80, height: 48, boxShadow: '2px 2px 0 rgba(255,255,255,0.25)' }}
          >
            No file yet
          </div>
        )}

        {/* Info column — matches HTML mob-mode-label */}
        <div className="flex-1 min-w-0">
          {/* "Live Preview" in design mode, "Upload Preview" in upload mode — matches HTML exactly */}
          <div className="font-mono text-[10px] text-signal uppercase tracking-widest">
            {state.mode === 'design' ? 'Live Preview' : 'Upload Preview'}
          </div>
          <div className="font-mono text-[9px] text-paper opacity-60 mt-0.5">
            Driver side · 2.5" letters
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="font-mono text-[10px] text-paper opacity-40">STEP</div>
          <div className="font-mono text-signal font-bold text-sm">1/3</div>
        </div>
      </div>
    </div>
  );
}
