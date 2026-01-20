"use client";
import { useEffect, useState, ReactNode, createContext, useContext } from "react";
import { updatePaletteCookiesAction } from "@/lib/actions/palette";

export type Palette = 'everforest' | 'nord' | 'catppuccin' | 'rose-pine' | 'zenburn' | 'gruvbox' | 'tokyo-night';

type PaletteContextType = {
  palette: Palette;
  setPalette: (palette: Palette) => void;
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export const PaletteProvider = ({ children, initialPalette }: { children: ReactNode, initialPalette: Palette }) => {
  const [palette, setPalette] = useState<Palette>(initialPalette);

  useEffect(() => {
    document.body.setAttribute('data-palette', palette);
    updatePaletteCookiesAction(palette)
  }, [palette]);

  return (
    <PaletteContext.Provider value={{ palette, setPalette }}>
      {children}
    </PaletteContext.Provider>
  );
}

export const usePalette = () => {
  const context = useContext(PaletteContext);
  if (!context) throw new Error('usePalette must be used within PaletteProvider');
  return context;
}
