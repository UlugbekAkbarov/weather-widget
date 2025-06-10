import { API_ERROR_CODES } from "../utils/constants"

const API_KEY = import.meta.env.VITE_OWM_API_KEY
const BASE_URL = import.meta.env.VITE_OWM_API_URL_FORECAST

/**
 * Запрашивает 5‑дневный прогноз погоды для заданного города
 * @param {string} cityName — название города, например "London"
 * @returns {Promise<Object>} — JSON-ответ OpenWeatherMap
 * @throws {Error} — при сетевой ошибке или ошибке API
 */
export async function fetchWeather(cityName) {
  if (!API_KEY) {
    throw new Error("API key not found")
  }
  const url = `${BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}`

  let response
  try {
    response = await fetch(url)
  } catch (networkError) {
    throw new Error(`Network error: ${networkError.message}`)
  }

  if (!response.ok) {
    let errorMsg = `HTTP ${response.status}: ${API_ERROR_CODES[response.status] || "Unknown error"}`
    try {
      const errData = await response.json()
      errorMsg = errData.message || errorMsg
    } catch {
      // ничего не делать, оставляем статус
    }
    throw new Error(`API error: ${errorMsg}`)
  }

  // Всё ок — парсим JSON и возвращаем
  return response.json()
}
