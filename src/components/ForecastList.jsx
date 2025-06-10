import clsx from "clsx"

import { UNITS_SYMBOLS } from "../utils/constants"

/**
 * 5‑дневный прогноз в виде набора карточек.
 **/
export default function ForecastList({ data, unit }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4'>
      {data?.map((day) => {
        const dayName = day.date.toLocaleDateString(undefined, { weekday: "short" })
        const dayNum = day.date.getDate()
        return (
          <div
            key={day.date.toISOString()}
            className={clsx("flex flex-col items-center p-4 rounded-lg shadow", "bg-background", "transition-colors")}
          >
            <div className='text-sm text-foreground'>
              {dayName}, {dayNum}
            </div>
            <div className='mt-2 text-lg font-semibold'>
              Avg: {day.avg} {UNITS_SYMBOLS[unit]}
            </div>
            <div className='text-sm text-foreground'>
              Min: {day.min} {UNITS_SYMBOLS[unit]}
            </div>
            <div className='text-sm text-foreground'>
              Max: {day.max} {UNITS_SYMBOLS[unit]}
            </div>
          </div>
        )
      })}
    </div>
  )
}
