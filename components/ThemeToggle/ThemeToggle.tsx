"use client";
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/context/useTheme";
import styles from "./ThemeToggle.module.scss";


export default function ThemeToggle() {
  const ctx = useTheme();
  if (!ctx) return null;
  const { theme, toggleTheme } = ctx;

  return (
    <>
      <input
        id="themeToggle"
        type="checkbox"
        className={`${styles.hideDefault}`}
        onClick={toggleTheme}
      />
      <label
        htmlFor="themeToggle"
        className={`pointer flex-center radius interactive fixed-top-right border-primary ${styles.toggleLabel}`}
      >
        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
      </label>
    </>
  );
}
