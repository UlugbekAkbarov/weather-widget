import { useReducer, useEffect, useCallback, useRef, useContext } from "react"

import weatherReducer, { initialState } from "../reducers/weatherReducer"
import weatherActions from "../reducers/weatherActions"

import throttle from "../utils/throttle"
import { transformData } from "../utils/transformData.js"

import { fetchMockWeather } from "../services/mockService"
import { fetchWeather as realFetchWeather } from "../services/weatherService"
import { SettingsContext } from "../context/SettingsContext.jsx"

/**
 * Кастомный хук для работы с погодными данными
 * @param {boolean} useMock — если true, использует mock-сервис
 */
export default function useWeatherData(useMock = true) {
  const [state, dispatch] = useReducer(weatherReducer, initialState)
  const { city, unit } = state
  const actions = weatherActions(dispatch)
  const { throttleDelay } = useContext(SettingsContext)
  const throttledFetchRef = useRef(null)

  useEffect(() => {
    throttledFetchRef.current = throttle(async (cityName) => {
      actions.clearError()
      try {
        const raw = useMock ? await fetchMockWeather(cityName) : await realFetchWeather(cityName)
        const { current, daily } = transformData(raw.list, unit)
        actions.fetchWeather(current, daily)
      } catch (err) {
        actions.setError(err.message || "Unknown error")
      }
    }, throttleDelay)

    return () => throttledFetchRef.current?.cancel?.()
  }, [unit, throttleDelay, useMock, actions])

  const changeCity = useCallback((newCity) => newCity !== city && actions.changeCity(newCity), [actions, city])
  const toggleUnit = useCallback(() => actions.toggleUnit(), [actions])

  useEffect(() => {
    throttledFetchRef.current?.(city)
  }, [city, unit])

  return {
    ...state, // city, unit, current, forecast, loading, error
    changeCity, // fn(city: string)
    toggleUnit, // fn()
  }
}
