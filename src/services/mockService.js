/**
 * Моковые данные для прогноза (структура приближена к ответу OpenWeatherMap)
 */

const MOCK_CITY_INFO = {
  London: { name: "London", country: "GB" },
  "New York": { name: "New York", country: "US" },
  Tokyo: { name: "Tokyo", country: "JP" },
  Sydney: { name: "Sydney", country: "AU" },
  Cairo: { name: "Cairo", country: "EG" },
}

/**
 * Генерация 40 точек прогноза с шагом 3 часа от текущего момента
 */
function generateMockList() {
  const now = Math.floor(Date.now() / 1000) // секунды
  const list = []

  for (let i = 0; i < 40; i++) {
    const dt = now + i * 3 * 3600 // каждые 3 часа
    const kelvinTemp = 273 + Math.random() * 30 // от 0°C до ~30°C
    const icons = ["01d", "02d", "03d", "04d", "09d", "10d", "11d", "13d", "50d"]
    const icon = icons[Math.floor(Math.random() * icons.length)]
    const descriptions = {
      "01d": "clear sky",
      "02d": "few clouds",
      "03d": "scattered clouds",
      "04d": "broken clouds",
      "09d": "shower rain",
      "10d": "rain",
      "11d": "thunderstorm",
      "13d": "snow",
      "50d": "mist",
    }
    list.push({
      dt,
      main: {
        temp: kelvinTemp,
      },
      weather: [
        {
          icon,
          description: descriptions[icon],
        },
      ],
    })
  }

  return list
}

/**
 * Симулирует вызов OpenWeatherMap API для прогноза.
 * Поддерживаются города: London, New York, Tokyo, Sydney, Cairo.
 *
 * @param {string} cityName — название города
 * @returns {Promise<Object>} — объект { city: {...}, list: [...] }
 */
export function fetchMockWeather(cityName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const info = MOCK_CITY_INFO[cityName]
      if (!info) {
        reject(new Error(`City "${cityName}" is not supported in mock`))
        return
      }
      resolve({
        city: info,
        list: generateMockList(),
      })
    }, 500 + Math.random() * 500) // случайная задержка от 500 до 1000 ms
  })
}
