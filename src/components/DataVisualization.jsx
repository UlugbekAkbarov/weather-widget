import { UNITS_SYMBOLS } from "../utils/constants"

export default function DataVisualization({ data, unit }) {
  // Размеры SVG
  const width = 800
  const height = 300
  const padding = 40

  if (data.length === 0) {
    return <div>No data to display</div>
  }

  // Собираем все значения, чтобы вычислить диапазон
  const temps = data.flatMap((d) => [d.min, d.avg, d.max])
  const minTemp = Math.min(...temps)
  const maxTemp = Math.max(...temps)
  const range = maxTemp - minTemp || 1

  // Функция для перевода температуры в координату Y
  const yScale = (t) => padding + ((maxTemp - t) / range) * (height - 2 * padding)

  // Шаг по X между точками
  const stepX = (width - 2 * padding) / (data.length - 1)

  // Формируем путь для avg линии
  const avgPath = data
    .map((d, i) => {
      const x = padding + i * stepX
      const y = yScale(d.avg)
      return `${i === 0 ? "M" : "L"} ${x},${y}`
    })
    .join(" ")

  // Формируем путь для min/max области (заштрихованная область между min и max)
  const upper = data
    .map((d, i) => {
      const x = padding + i * stepX
      const y = yScale(d.max)
      return `${i === 0 ? "M" : "L"} ${x},${y}`
    })
    .join(" ")
  const lower = data
    .slice()
    .reverse()
    .map((d, i) => {
      const x = padding + (data.length - 1 - i) * stepX
      const y = yScale(d.min)
      return `L ${x},${y}`
    })
    .join(" ")
  const areaPath = `${upper} ${lower} Z`

  // Шаг по оси X для подписей (дней)
  const xLabels = data.map((d, i) => {
    const x = padding + i * stepX
    const label = d.date.toLocaleDateString(undefined, { weekday: "short" })
    return { x, label }
  })

  // Шаг по оси Y для сетки
  const yTicks = 5
  const yLabels = Array.from({ length: yTicks + 1 }, (_, i) => {
    const t = minTemp + (range / yTicks) * i
    const y = yScale(t)
    return { y, t: Math.round(t) }
  })

  return (
    <div className='overflow-x-auto'>
      <svg width='100%' viewBox={`0 0 ${width} ${height}`}>
        {/* Фон под областью min/max */}
        <path d={areaPath} fill='rgba(13,110,253,0.2)' stroke='none' />
        {/* Линия avg */}
        <path d={avgPath} fill='none' stroke='#0d6efd' strokeWidth='2' />
        {/* Сетка и подписи по Y */}
        {yLabels.map(({ y, t }) => (
          <g key={t}>
            <line x1={padding} x2={width - padding} y1={y} y2={y} stroke='#ccc' strokeDasharray='2 2' />
            <text
              x={padding - 10}
              y={y + 4}
              textAnchor='end'
              className='text-xs fill-current text-gray-500 dark:text-gray-400'
            >
              {t}
              {UNITS_SYMBOLS[unit]}
            </text>
          </g>
        ))}
        {/* Подписи по X */}
        {xLabels.map(({ x, label }) => (
          <text
            key={x}
            x={x}
            y={height - padding + 20}
            textAnchor='middle'
            className='text-xs fill-current text-gray-500 dark:text-gray-400'
          >
            {label}
          </text>
        ))}
        {/* Ось X */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke='#666' />
        {/* Ось Y */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke='#666' />
      </svg>
    </div>
  )
}
