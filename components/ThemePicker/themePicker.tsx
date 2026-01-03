"use client";
import { X } from "lucide-react";
import type { Palette } from "@/context/usePalette";
import { usePalette } from "@/context/usePalette";
import catppuccin from "@styles/themes/catppuccin.module.scss";
import everforest from "@styles/themes/everforest.module.scss";
import nord from "@styles/themes/nord.module.scss";
import rosePine from "@styles/themes/rose-pine.module.scss";
import zenburn from "@styles/themes/zenburn.module.scss";
import gruvbox from "@styles/themes/gruvbox.module.scss";
import tokyoNight from "@styles/themes/tokyo-night.module.scss";
import styles from "./themePicker.module.scss";

type ThemePickerProps = {
  isThemePickerOpen: boolean;
  setIsThemePickerOpen: any;
}

const THEME_MAP = {
  catppuccin: { id: "catppuccin", name: "Catppuccin", colors: catppuccin },
  everforest: { id: "everforest", name: "Everforest", colors: everforest },
  nord: { id: "nord", name: "Nord", colors: nord },
  rosePine: { id: "rose-pine", name: "Rose Pine", colors: rosePine },
  zenburn: { id: "zenburn", name: "Zenburn", colors: zenburn },
  gruvbox: { id: "gruvbox", name: "Gruvbox", colors: gruvbox },
  tokyoNight: { id: "tokyo-night", name: "Tokyo Night", colors: tokyoNight },
}

export default function ThemePicker({
  isThemePickerOpen,
  setIsThemePickerOpen
}: ThemePickerProps) {
  if (!isThemePickerOpen) return null;

  const { palette, setPalette } = usePalette();
  const handleClose = () => setIsThemePickerOpen(false);

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>select theme</h3>
          <button className={styles.closeBtn} onClick={handleClose}>
            <X size={18} />
          </button>
        </div>
        <div className={styles.themesGrid}>
          {Object.entries(THEME_MAP).map(([themeKey, theme]) => (
            <button
              key={themeKey}
              className={`${styles.themeCard} ${palette === theme.id ? styles.active : ''}`}
              onClick={() => {
                setPalette(theme.id as Palette);
              }}
            >
              <span className={styles.themeName}>{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
