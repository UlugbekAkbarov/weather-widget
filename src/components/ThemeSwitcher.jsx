import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export default function ThemeSwitcher() {
  const { isDark, toggle } = useContext(ThemeContext)

  return (
    <button
      onClick={toggle}
      aria-label='Toggle theme'
      className={`
        relative inline-flex items-center h-6 w-11 rounded-full
        transition-colors duration-300
        ${isDark ? "bg-accent" : "bg-gray-300"}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent
      `}
    >
      {/* Ползунок */}
      <span
        className={`
          inline-block h-5 w-5 transform rounded-full bg-white shadow
          transition-transform duration-300
          ${isDark ? "translate-x-5" : "translate-x-1"}
        `}
      />
    </button>
  )
}
