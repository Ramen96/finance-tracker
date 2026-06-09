import { X } from "lucide-react";
import { createPortal } from "react-dom";
import type { Palette } from "@/context/usePalette";
import { usePalette } from "@/context/usePalette";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./themePicker.module.scss";

type ThemePickerProps = {
  isThemePickerOpen: boolean;
  setIsThemePickerOpen: (boolType: boolean) => void;
  setIsDeskOpen: (boolType: boolean) => void;
  isMobile?: boolean;
};

const THEME_MAP = {
  tokyoNight: { id: "tokyo-night", name: "Tokyo Night" },
  nord: { id: "nord", name: "Nord" },
  gruvbox: { id: "gruvbox", name: "Gruvbox" },
  rosePine: { id: "rose-pine", name: "Rosé Pine" },
  zenburn: { id: "zenburn", name: "Zenburn" },
  catppuccin: { id: "catppuccin", name: "Catppuccin" },
  everforest: { id: "everforest", name: "Everforest" },
} as const;

type Theme = (typeof THEME_MAP)[keyof typeof THEME_MAP];

const ThemeRow = ({
  theme,
  onSelect,
}: {
  theme: Theme;
  onSelect: (id: string) => void;
}) => (
  <button
    className={styles.themeOption}
    data-palette={theme.id}
    onClick={() => onSelect(theme.id)}
  >
    <div className={styles.dot} />
    <span className={styles.themeName}>{theme.name}</span>
  </button>
);

export default function ThemePicker({
  isThemePickerOpen,
  setIsThemePickerOpen,
  isMobile = false,
}: ThemePickerProps) {
  const { palette, setPalette } = usePalette();

  if (!isThemePickerOpen) return null;

  const handleClose = () => setIsThemePickerOpen(false);
  const allThemes = Object.values(THEME_MAP);
  const activeTheme = allThemes.find((t) => t.id === palette) ?? allThemes[0];
  const inactiveThemes = allThemes.filter((t) => t.id !== palette);
  const handleSelect = (id: string) => setPalette(id as Palette);

  const sharedContent = (
    <>
      <div className={styles.mobileHandle} />
      <div className={styles.header}>
        <span className={styles.title}>Theme</span>
        <div className={styles.headerActions}>
          <ThemeToggle />
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close theme picker">
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
          <ThemeRow key={theme.id} theme={theme} onSelect={handleSelect} />
        ))}
      </div>
    </>
  );

  if (isMobile) {
    return createPortal(
      <div className={styles.mobileOverlay} onClick={handleClose}>
        <div className={styles.mobileSheet} onClick={(e) => e.stopPropagation()}>
          {sharedContent}
        </div>
      </div>,
      document.body
    );
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>Theme</span>
          <div className={styles.headerActions}>
            <ThemeToggle />
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close theme picker">
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
            <ThemeRow key={theme.id} theme={theme} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}
