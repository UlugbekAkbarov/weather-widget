import { ENUM_UNITS } from "./constants"

/**
 * Конверсия температуры из Кельвинов в Цельсии
 * @param {number} kelvin
 * @returns {number}
 */
export function convertKelvinToCelsius(kelvin) {
  return +(kelvin - 273.15).toFixed(1)
}

/**
 * Конверсия температуры из Кельвинов в Фаренгейты
 * @param {number} kelvin
 * @returns {number}
 */
export function convertKelvinToFahrenheit(kelvin) {
  return +(((kelvin - 273.15) * 9) / 5 + 32).toFixed(1)
}

/**
 * Трансформирует hourly‑данные в текущую погоду и массив daily:
 * - current: { temp, description, icon, date }
 * - daily: [{ date, min, max, avg }]
 *
 * @param {Array} list — массив из API с полями { dt, main: { temp }, weather: [...] }
 * @param {"Fahrenheit" | "Celsius" | "Kelvin"} unit — единицы измерения
 * @returns {{ current: object, daily: object[] }}
 */

export function transformData(list, unit = ENUM_UNITS.Celsius) {
  if (!Array.isArray(list) || list.length === 0) {
    return { current: null, daily: [] }
  }

  // Сортируем по времени
  const sorted = [...list].sort((a, b) => a.dt - b.dt)

  // Текущие данные — первый элемент
  const first = sorted[0]
  const kelvinTemp = first.main.temp
  const temp =
    unit === ENUM_UNITS.Fahrenheit ? convertKelvinToFahrenheit(kelvinTemp) : convertKelvinToCelsius(kelvinTemp)

  const current = {
    date: new Date(first.dt * 1000),
    temp,
    description: first.weather[0]?.description || "",
    icon: first.weather[0]?.icon || "",
  }

  // Группируем по дате (YYYY-MM-DD)
  const groups = sorted.reduce((acc, item) => {
    const day = new Date(item.dt * 1000).toISOString().split("T")[0] // 'YYYY-MM-DD'
    if (!acc[day]) acc[day] = []
    acc[day].push(item.main.temp)
    return acc
  }, {})

  // Вычисляем min/max/avg для каждого дня
  const daily = Object.entries(groups)
    .map(([day, temps]) => {
      const cTemps = temps.map((k) =>
        unit === ENUM_UNITS.Fahrenheit ? convertKelvinToFahrenheit(k) : convertKelvinToCelsius(k)
      )
      const min = Math.min(...cTemps)
      const max = Math.max(...cTemps)
      const avg = +(cTemps.reduce((sum, t) => sum + t, 0) / cTemps.length).toFixed(1)
      return { date: new Date(day), min, max, avg }
    })
    // Сортируем по дате
    .sort((a, b) => a.date - b.date)

  return { current, daily }
}
