import { CSSProperties, useEffect, useState } from 'react';
import { TEMPLATE_STYLES } from '../../core/constants';
import type { Template } from '../../core/types';

interface StickerTextProps {
  company: string;
  usdot: string;
  mc: string;
  noMc?: boolean;
  template?: Template;
  size?: 'sm' | 'md' | 'lg';
  mirrored?: boolean;
  /** Increment to trigger an 80ms signal-yellow flash (mirrors HTML .flash behaviour) */
  flashTrigger?: number;
  style?: CSSProperties;
  className?: string;
}

const sizeMap = {
  sm: { padding: '6px 10px',  companySize: '8px',      dotSize: '6px',       barW: '20px', barH: '1px', gap: '3px' },
  md: { padding: '8px 12px',  companySize: '10px',     dotSize: '7px',       barW: '24px', barH: '2px', gap: '4px' },
  lg: { padding: '20px 24px', companySize: '1.35rem',  dotSize: '0.875rem',  barW: '64px', barH: '3px', gap: '10px' },
};

export function StickerText({
  company, usdot, mc, noMc = false, template = 'classic',
  size = 'lg', mirrored = false, flashTrigger, style, className,
}: StickerTextProps) {
  const ts  = TEMPLATE_STYLES[template];
  const dim = sizeMap[size];
  const [isFlashing, setFlashing] = useState(false);

  // Mirror HTML: on every live update in design mode, sticker briefly flashes signal yellow
  useEffect(() => {
    if (!flashTrigger) return;
    setFlashing(true);
    const t = setTimeout(() => setFlashing(false), 80);
    return () => clearTimeout(t);
  }, [flashTrigger]);

  return (
    <div
      className={className}
      style={{
        background:  isFlashing ? '#ffcc00' : ts.bg,
        color:       ts.color,
        border:      `2px ${ts.border} #0b0b0c`,
        padding:     dim.padding,
        textAlign:   'center',
        boxShadow:   size === 'lg' ? '4px 4px 0 #000' : '2px 2px 0 #000',
        transform:   mirrored ? 'scaleX(-1)' : undefined,
        // Match HTML transition exactly
        transition:  'background 80ms ease, color 80ms ease, border-style 80ms ease',
        ...style,
      }}
    >
      <div style={{
        fontFamily:    '"Archivo",sans-serif',
        fontWeight:    900,
        letterSpacing: ts.ls,
        fontSize:      ts.fs,
        lineHeight:    1.1,
      }}>
        {company || 'YOUR COMPANY'}
      </div>
      <div style={{ width: dim.barW, height: dim.barH, background: '#c2410c', margin: `${dim.gap} auto` }} />
      <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: dim.dotSize }}>
        USDOT <strong>{usdot || '———'}</strong>
      </div>
      {!noMc && (
        <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: dim.dotSize, marginTop: '2px' }}>
          MC <strong>{mc || '———'}</strong>
        </div>
      )}
    </div>
  );
}
