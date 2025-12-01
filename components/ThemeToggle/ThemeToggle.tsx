"use client";
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/context/context";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return(
    <button onClick={toggleTheme}>
      {darkMode === true ? <Sun /> : <Moon />}
    </button>
  )
}