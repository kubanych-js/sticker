import { useState, useCallback } from 'react';
import type { BuilderState } from '../types';
import { DEFAULT_BUILDER } from '../constants';

function load(): BuilderState {
  try {
    const raw = localStorage.getItem('dot_builder');
    if (!raw) return DEFAULT_BUILDER;
    const parsed = JSON.parse(raw) as Partial<BuilderState>;
    if (!parsed.uploadUrl) {
      const fromSession = sessionStorage.getItem('dot_upload_img');
      if (fromSession) parsed.uploadUrl = fromSession;
    }
    return { ...DEFAULT_BUILDER, ...parsed };
  } catch {
    return DEFAULT_BUILDER;
  }
}

function persist(state: BuilderState) {
  try {
    localStorage.setItem('dot_builder', JSON.stringify(state));
  } catch {
    const { uploadUrl, ...rest } = state;
    localStorage.setItem('dot_builder', JSON.stringify(rest));
    try { sessionStorage.setItem('dot_upload_img', uploadUrl ?? ''); } catch { /* quota */ }
  }
}

type Updater = Partial<BuilderState> | ((prev: BuilderState) => BuilderState);

export function useBuilderState() {
  const [state, setRaw] = useState<BuilderState>(load);

  const setState = useCallback((updater: Updater) => {
    setRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      persist(next);
      return next;
    });
  }, []);

  return [state, setState] as const;
}
