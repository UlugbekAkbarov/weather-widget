import clsx from "clsx"
import { useCallback, useContext } from "react"
import { TabsContext } from "../context/TabsContext"

export function TabButton({ id, children, className }) {
  const { activeTabID, setActiveTabID } = useContext(TabsContext)
  const isActive = activeTabID === id
  const handleOnClick = useCallback(() => setActiveTabID(id), [id, setActiveTabID])

  return (
    <button
      role='tab'
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      id={`tab-${id}`}
      className={clsx(
        "px-4 py-2 transition-colors border",
        isActive ? "border-accent text-accent" : "text-foreground hover:text-accent",
        className
      )}
      onClick={handleOnClick}
    >
      {children}
    </button>
  )
}

export function TabPanel({ id, children, className }) {
  const { activeTabID } = useContext(TabsContext)
  const isActive = activeTabID === id

  return (
    <div
      role='tabpanel'
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      className={clsx(
        "transition-opacity duration-300",
        isActive ? "opacity-100 animate-fade-in" : "opacity-0 animate-fade-out",
        className
      )}
    >
      {isActive && children}
    </div>
  )
}
