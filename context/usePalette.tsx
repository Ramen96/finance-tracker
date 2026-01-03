"use client";
import { useEffect, useState, ReactNode, createContext, useContext } from "react";

export type Palette = 'everforest' | 'nord' | 'catppuccin' | 'rose-pine' | 'zenburn';

type PaletteContextType = {
  palette: Palette;
  setPalette: (palette: Palette) => void;
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export const PaletteProvider = ({ children }: { children: ReactNode }) => {
  const [palette, setPalette] = useState<Palette>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('palette') as Palette;
      return saved || 'everforest';
    }
    return 'everforest';
  });

  useEffect(() => {
    const saved = localStorage.getItem('palette') as Palette;
    if (saved) setPalette(saved);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-palette', palette);
    localStorage.setItem('palette', palette);
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
