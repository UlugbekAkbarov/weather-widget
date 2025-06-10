import CitySelector from "./CitySelector"
import ErrorBoundary from "./ErrorBoundary"
import SettingsPanel from "./SettingsPanel"
import ThemeSwitcher from "./ThemeSwitcher"

import useWeatherData from "../hooks/useWeatherData"
import { ENUM_TAB_IDS, ENUM_TAB_LABELS } from "../utils/constants"

import { TabsProvider } from "../context/TabsContext"
import { SettingsContext } from "../context/SettingsContext"
import { TabButton, TabPanel } from "./Tabs"
import WeatherDisplay from "./WeatherDisplay"
import ForecastList from "./ForecastList"
import DataVisualization from "./DataVisualization"
import { useContext } from "react"

export default function WeatherWidget() {
  // Данные погоды
  const { city, current, forecast, loading, error, unit, toggleUnit, changeCity } = useWeatherData(true) // true = true - загрузка данных из Moka
  const { isVisibleTabs } = useContext(SettingsContext)
  return (
    <div className='w-full h-full max-w-[800px] border border-border rounded-lg shadow-lg p-4 flex flex-col gap-4 bg-background text-foreground'>
      <div className='h-2/12 flex items-center justify-between px-10 py-4 border-b border-border'>
        <h1 className='text-2xl font-bold'>Погода</h1>
        <CitySelector onSelect={changeCity} initialCity={city} />
        <ThemeSwitcher />
      </div>
      <TabsProvider initialActiveTab={ENUM_TAB_IDS.CURRENT}>
        <nav role='tablist' className='flex space-x-4 mb-4'>
          {isVisibleTabs[ENUM_TAB_IDS.CURRENT] && (
            <TabButton id={ENUM_TAB_IDS.CURRENT}>{ENUM_TAB_LABELS[ENUM_TAB_IDS.CURRENT]}</TabButton>
          )}
          {isVisibleTabs[ENUM_TAB_IDS.FORECAST] && (
            <TabButton id={ENUM_TAB_IDS.FORECAST}>{ENUM_TAB_LABELS[ENUM_TAB_IDS.FORECAST]}</TabButton>
          )}
          {isVisibleTabs[ENUM_TAB_IDS.STATISTICS] && (
            <TabButton id={ENUM_TAB_IDS.STATISTICS}>{ENUM_TAB_LABELS[ENUM_TAB_IDS.STATISTICS]}</TabButton>
          )}
        </nav>
        <ErrorBoundary error={error}>
          <div className='flex-1'>
            {loading && (
              <div className='absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-10'>
                <span className='loader'>Loading…</span>
              </div>
            )}
            {isVisibleTabs[ENUM_TAB_IDS.CURRENT] && (
              <TabPanel id={ENUM_TAB_IDS.CURRENT}>
                <WeatherDisplay data={current} unit={unit} />
              </TabPanel>
            )}
            {isVisibleTabs[ENUM_TAB_IDS.FORECAST] && (
              <TabPanel id={ENUM_TAB_IDS.FORECAST}>
                <ForecastList data={forecast} unit={unit} />
              </TabPanel>
            )}
            {isVisibleTabs[ENUM_TAB_IDS.STATISTICS] && (
              <TabPanel id={ENUM_TAB_IDS.STATISTICS}>
                <DataVisualization data={forecast} unit={unit} />
              </TabPanel>
            )}
            <TabPanel id={ENUM_TAB_IDS.SETTINGS}>
              <SettingsPanel unit={unit} toggleUnit={toggleUnit} />
            </TabPanel>
          </div>
        </ErrorBoundary>
        <div className='h-2/12 flex items-center justify-between px-10 py-4 border-t border-border'>
          <TabButton id={ENUM_TAB_IDS.SETTINGS}>Настройки</TabButton>
        </div>
      </TabsProvider>
    </div>
  )
}
