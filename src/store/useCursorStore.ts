import { create } from 'zustand';
import { CursorMode, CursorState } from '../types';

export const useCursorStore = create<CursorState>((set) => ({
  mode: 'default',
  targetScale: 1.0,
  targetBlur: 0,
  label: null,
  secondaryLabel: null,

  setCursorMode: (mode: CursorMode, label: string | null = null, secondaryLabel: string | null = null) => {
    let scale = 1.0;
    if (mode === 'film') scale = 1.25;
    else if (mode === 'link') scale = 1.15;
    else if (mode === 'shockwave') scale = 1.4;

    set({
      mode,
      label,
      secondaryLabel,
      targetScale: scale,
    });
  },

  resetCursor: () => {
    set({
      mode: 'default',
      label: null,
      secondaryLabel: null,
      targetScale: 1.0,
      targetBlur: 0,
    });
  },
}));
