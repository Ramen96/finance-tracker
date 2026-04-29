import { X } from "lucide-react";
import type { Palette } from "@/context/usePalette";
import { usePalette } from "@/context/usePalette";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./themePicker.module.scss";

type ThemePickerProps = {
  isThemePickerOpen: boolean;
  setIsThemePickerOpen: (boolType: boolean) => void;
  setIsDeskOpen: (boolType: boolean) => void;
};

const THEME_MAP = {
  tokyoNight: { id: "tokyo-night", name: "Tokyo Night" },
  nord: { id: "nord", name: "Nord" },
  gruvbox: { id: "gruvbox", name: "Gruvbox" },
  rosePine: { id: "rose-pine", name: "Rosé Pine" },
  zenburn: { id: "zenburn", name: "Zenburn" },
  catppuccin: { id: "catppuccin", name: "Catppuccin" },
  everforest: { id: "everforest", name: "Everforest" },
};

type Theme = (typeof THEME_MAP)[keyof typeof THEME_MAP];

export default function ThemePicker({
  isThemePickerOpen,
  setIsThemePickerOpen,
}: ThemePickerProps) {
  if (!isThemePickerOpen) return null;

  const { palette, setPalette } = usePalette();
  const handleClose = () => setIsThemePickerOpen(false);

  const allThemes = Object.values(THEME_MAP);
  const activeTheme = allThemes.find((t) => t.id === palette) ?? allThemes[0];
  const inactiveThemes = allThemes.filter((t) => t.id !== palette);

  const handleSelect = (id: string) => setPalette(id as Palette);

  const ThemeRow = ({ theme }: { theme: Theme }) => (
    <button
      className={styles.themeOption}
      data-palette={theme.id}
      onClick={() => handleSelect(theme.id)}
    >
      <div className={styles.dot} />
      <span className={styles.themeName}>{theme.name}</span>
    </button>
  );

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>Theme</span>
          <div className={styles.headerActions}>
            <ThemeToggle />
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroSwatches}>
            <div className={styles.heroSwatch} data-swatch="bg" />
            <div className={styles.heroSwatch} data-swatch="primary" />
            <div className={styles.heroSwatch} data-swatch="secondary" />
            <div className={styles.heroSwatch} data-swatch="accent" />
          </div>
          <p className={styles.heroName}>{activeTheme.name}</p>
          <p className={styles.heroTag}>Currently active</p>
        </div>

        <div className={styles.content}>
          <span className={styles.sectionLabel}>Palettes</span>
          {inactiveThemes.map((theme) => (
            <ThemeRow key={theme.id} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  );
}
