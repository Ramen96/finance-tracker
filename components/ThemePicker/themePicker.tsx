"use client";
import { X } from "lucide-react";
import type { Palette } from "@/context/usePalette";
import { usePalette } from "@/context/usePalette";
import styles from "./themePicker.module.scss";

type ThemePickerProps = {
  isThemePickerOpen: boolean;
  setIsThemePickerOpen: any;
  setIsExpanded: any;
}

const THEME_MAP = {
  catppuccin: { id: "catppuccin", name: "Catppuccin" },
  everforest: { id: "everforest", name: "Everforest" },
  nord: { id: "nord", name: "Nord" },
  rosePine: { id: "rose-pine", name: "Rosé Pine" },
  zenburn: { id: "zenburn", name: "Zenburn" },
  gruvbox: { id: "gruvbox", name: "Gruvbox" },
  tokyoNight: { id: "tokyo-night", name: "Tokyo Night" },
}

export default function ThemePicker({
  isThemePickerOpen,
  setIsThemePickerOpen,
}: ThemePickerProps) {
  if (!isThemePickerOpen) return null;

  const { palette, setPalette } = usePalette();

  const handleClose = () => {
    setIsThemePickerOpen(!isThemePickerOpen);
  }


  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Theme Selection</h2>
            <p className={styles.subtitle}>Choose your color palette</p>
          </div>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {Object.entries(THEME_MAP).map(([themeKey, theme]) => (
            <button
              key={themeKey}
              className={`${styles.themeOption} ${palette === theme.id ? styles.active : ''}`}
              onClick={() => setPalette(theme.id as Palette)}
            >
              <span className={styles.themeName}>{theme.name}</span>
              {palette === theme.id && (
                <span className={styles.checkmark}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
