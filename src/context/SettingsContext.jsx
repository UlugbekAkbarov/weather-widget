import { createContext, useState } from "react"
import { DEFAULT_DEBOUNCE, DEFAULT_REFRESH_RATE, DEFAULT_THROTTLE, DEFAULT_VISIBLE_TABS } from "../utils/constants"

export const SettingsContext = createContext()

export function SettingsProvider({ children }) {
  const [debounceDelay, setDebounceDelay] = useState(DEFAULT_DEBOUNCE)
  const [throttleDelay, setThrottleDelay] = useState(DEFAULT_THROTTLE)
  const [refreshRate, setRefreshRate] = useState(DEFAULT_REFRESH_RATE)
  const [isVisibleTabs, setVisibleTabs] = useState(DEFAULT_VISIBLE_TABS)

  return (
    <SettingsContext.Provider
      value={{
        debounceDelay,
        setDebounceDelay,
        throttleDelay,
        setThrottleDelay,
        refreshRate,
        setRefreshRate,
        isVisibleTabs,
        setVisibleTabs,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
