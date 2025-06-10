const ICON_URL = import.meta.env.VITE_OWM_ICON_URL

import clsx from "clsx"
import { UNITS_SYMBOLS } from "../utils/constants"

/**
 * Отображает текущую погоду.
 *
 */
export default function WeatherDisplay({ data, unit }) {
  const formattedDate = data?.date.toLocaleString(undefined, {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  })

  const iconUrl = `${ICON_URL}${data?.icon}@2x.png`

  return (
    <div
      className={clsx("flex flex-col items-center justify-center space-y-2 p-4", "bg-background", "rounded-xl shadow")}
    >
      <div className='text-sm text-foreground'>{formattedDate}</div>
      <img src={iconUrl} alt={data?.description} className='w-20 h-20' />
      <div className='text-4xl font-bold'>
        {data?.temp}
        {UNITS_SYMBOLS[unit]}
      </div>
      <div className='capitalize text-lg'>{data?.description}</div>
    </div>
  )
}
