import { useContext } from "react"
import { SettingsContext } from "../context/SettingsContext"
import { ENUM_TAB_IDS, ENUM_TAB_LABELS, UNITS_SYMBOLS } from "../utils/constants"

export default function SettingsPanel({ unit, toggleUnit }) {
  // Другие настройки из контекста
  const {
    debounceDelay,
    setDebounceDelay,
    throttleDelay,
    setThrottleDelay,
    refreshRate,
    setRefreshRate,
    isVisibleTabs,
    setVisibleTabs,
  } = useContext(SettingsContext)

  const handleToggleTabVisibility = (tabId) => {
    setVisibleTabs((prev) => ({
      ...prev,
      [tabId]: !prev[tabId],
    }))
  }

  return (
    <div className='p-4 bg-gray-100 dark:bg-gray-800 rounded shadow-md mb-4 w-full'>
      <h2 className='text-lg font-semibold mb-2'>Настройки</h2>

      {/* Единицы измерения */}
      <div className='mb-4'>
        <label className='block text-sm mb-1'>Единицы измерения:</label>
        <button
          onClick={toggleUnit}
          className='px-3 py-1 border border-accent rounded hover:bg-accent hover:text-white transition'
        >
          {UNITS_SYMBOLS[unit]}
        </button>
      </div>

      {/* Частота обновления */}
      <div className='mb-4'>
        <label className='block text-sm mb-1'>Частота обновления (сек):</label>
        <select
          value={refreshRate}
          onChange={(e) => setRefreshRate(Number(e.target.value))}
          className='w-full p-2 rounded border'
        >
          <option value={5000}>5</option>
          <option value={15000}>15</option>
          <option value={30000}>30</option>
          <option value={60000}>60</option>
        </select>
      </div>

      {/* Debounce / Throttle */}
      <div className='mb-4'>
        <label className='block text-sm mb-1'>Debounce (мс):</label>
        <input
          type='number'
          value={debounceDelay}
          onChange={(e) => setDebounceDelay(Number(e.target.value))}
          className='w-full p-2 rounded border'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm mb-1'>Throttle (мс):</label>
        <input
          type='number'
          value={throttleDelay}
          onChange={(e) => setThrottleDelay(Number(e.target.value))}
          className='w-full p-2 rounded border'
        />
      </div>

      <div className='mb-4 space-y-1'>
        <p className='text-sm font-medium'>Показывать табы:</p>
        <label className='flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            checked={isVisibleTabs[ENUM_TAB_IDS.CURRENT]}
            onChange={() => handleToggleTabVisibility(ENUM_TAB_IDS.CURRENT)}
          />
          {ENUM_TAB_LABELS[ENUM_TAB_IDS.CURRENT]}
        </label>
        <label className='flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            checked={isVisibleTabs[ENUM_TAB_IDS.FORECAST]}
            onChange={() => handleToggleTabVisibility(ENUM_TAB_IDS.FORECAST)}
          />
          {ENUM_TAB_LABELS[ENUM_TAB_IDS.FORECAST]}
        </label>
        <label className='flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            checked={isVisibleTabs[ENUM_TAB_IDS.STATISTICS]}
            onChange={() => handleToggleTabVisibility(ENUM_TAB_IDS.STATISTICS)}
          />
          {ENUM_TAB_LABELS[ENUM_TAB_IDS.STATISTICS]}
        </label>
      </div>
    </div>
  )
}
