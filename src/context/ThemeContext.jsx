import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  const toggle = () => setIsDark((prev) => !prev)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  return <ThemeContext.Provider value={{ isDark, toggle }}>{children}</ThemeContext.Provider>
}
