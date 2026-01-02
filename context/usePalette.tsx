import { useEffect, useState, ReactNode, createContext } from "react";

type Palette = 'everforest' | 'nord' | 'catppuccin' | 'rose-pine' | 'zenburn';

type PaletteContextType = {
  palette: Palette;
  setPalette: (palette: Palette) => void;
}

const PaletteContext = createContext<PaletteContextType>({
  palette: 'everforest',
  setPalette: () => { },
});

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
