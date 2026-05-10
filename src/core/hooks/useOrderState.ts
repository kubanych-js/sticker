import { useState, useCallback } from 'react';
import type { OrderState } from '../types';
import { DEFAULT_ORDER } from '../constants';

function load(): OrderState {
  try {
    const raw = localStorage.getItem('dot_order');
    if (!raw) return DEFAULT_ORDER;
    return { ...DEFAULT_ORDER, ...JSON.parse(raw) as Partial<OrderState> };
  } catch {
    return DEFAULT_ORDER;
  }
}

type Updater = Partial<OrderState> | ((prev: OrderState) => OrderState);

export function useOrderState() {
  const [state, setRaw] = useState<OrderState>(load);

  const setState = useCallback((updater: Updater) => {
    setRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      try { localStorage.setItem('dot_order', JSON.stringify(next)); } catch { /* quota */ }
      return next;
    });
  }, []);

  return [state, setState] as const;
}
