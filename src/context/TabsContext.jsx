import { createContext, useState } from "react"

export const TabsContext = createContext({
  activeTabID: null,
  setActiveTabID: () => {},
})

export function TabsProvider({ initialActiveTab, children }) {
  const [activeTabID, setActiveTabID] = useState(initialActiveTab)
  return <TabsContext.Provider value={{ activeTabID, setActiveTabID }}>{children}</TabsContext.Provider>
}
