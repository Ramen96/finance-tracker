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
  tokyoNight: {
    id: "tokyo-night",
    name: "Tokyo Night",
    swatches: ["--bg", "--primary", "--success", "--accent"],
  },
  nord: {
    id: "nord",
    name: "Nord",
    swatches: ["--bg", "--secondary", "--success", "--accent"],
  },
  gruvbox: {
    id: "gruvbox",
    name: "Gruvbox",
    swatches: ["--bg", "--primary", "--success", "--accent"],
  },
  rosePine: {
    id: "rose-pine",
    name: "Rosé Pine",
    swatches: ["--bg", "--accent", "--secondary", "--primary"],
  },
  zenburn: {
    id: "zenburn",
    name: "Zenburn",
    swatches: ["--bg", "--warning", "--success", "--error"],
  },
  catppuccin: {
    id: "catppuccin",
    name: "Catppuccin",
    swatches: ["--bg", "--primary", "--success", "--warning"],
  },
  everforest: {
    id: "everforest",
    name: "Everforest",
    swatches: ["--bg", "--success", "--secondary", "--error"],
  },
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
      onClick={() => handleSelect(theme.id)}
    >
      <div
        className={styles.dot}
        style={{ background: `var(--primary)` }}
        data-palette={theme.id}
      />
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
            {activeTheme.swatches.map((cssVar) => (
              <div
                key={cssVar}
                className={styles.heroSwatch}
                style={{ background: `var(${cssVar})` }}
              />
            ))}
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
