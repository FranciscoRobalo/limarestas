"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme")
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    setThemeState(savedTheme === "dark" || savedTheme === "light" ? savedTheme : preferredTheme)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("theme", theme)
  }, [theme])

  const value = useMemo(
    () => ({ theme, setTheme: setThemeState }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
