import clsx from "clsx"
import { useState, useEffect, useRef, useCallback, useContext } from "react"
import { CITIES } from "../utils/constants"

import debounce from "../utils/debounce.JS"
import { SettingsContext } from "../context/SettingsContext"

export default function CitySelector({ onSelect, initialCity = "", cities = CITIES }) {
  const [query, setQuery] = useState(initialCity)
  const [filtered, setFiltered] = useState(cities)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState("")
  const wrapperRef = useRef(null)
  const { debounceDelay } = useContext(SettingsContext)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filterCities = useCallback(
    (query) => {
      console.log("Filtering cities with query:", query)
      if (query.trim() === "") {
        setError("")
        return setFiltered(cities)
      }
      const list = cities.filter((city) => city.toLowerCase().includes(query.trim().toLowerCase()))
      if (list.length === 0) {
        setError("Город не найден")
        return setFiltered([])
      }
      setError("")
      return setFiltered(list)
    },
    [cities]
  )
  const debouncedFilterRef = useRef(null)

  useEffect(() => {
    debouncedFilterRef.current = debounce(filterCities, debounceDelay)
    return () => debouncedFilterRef.current?.cancel?.()
  }, [filterCities, debounceDelay])

  const handleChangeSearch = (e) => {
    const query = e.target.value
    setQuery(query)
    setIsOpen(true)
    return debouncedFilterRef.current?.(query)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSelect(e)
    }
  }

  const handleFocus = () => {
    setIsOpen(true)
  }

  const handleSelect = (e) => {
    const city = e.target?.dataset?.value || e.target?.value || null
    if (!city) return
    setQuery(city)
    setIsOpen(false)
    setError("")
    if (onSelect) onSelect(city)
  }

  return (
    <div ref={wrapperRef} className='relative w-48'>
      <input
        type='text'
        value={query}
        placeholder='Выберите город'
        onChange={handleChangeSearch}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className={clsx(
          "w-full px-3 py-2 rounded border",
          error ? "border-destructive focus:border-destructive-hover" : "border-foreground focus:border-accent",
          "outline-none transition-colors"
        )}
        aria-invalid={!!error}
      />
      {error && (
        <p className='mt-1 text-sm text-destructive' role='alert'>
          {error}
        </p>
      )}
      {isOpen && (
        <ul className='absolute z-10 w-full mt-1 max-h-40 overflow-auto bg-background border border-border rounded shadow-lg'>
          {filtered.map((city) => (
            <li
              key={city}
              data-value={city}
              onClick={handleSelect}
              className='px-3 py-2 hover:bg-accent-hover hover:text-accent-foreground cursor-pointer'
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
