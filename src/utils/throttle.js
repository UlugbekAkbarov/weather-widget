import { DEFAULT_THROTTLE } from "./constants"

/**
 * Throttle с «leading» и «trailing» вызовами:
 * - Первый вызов происходит сразу,
 * - Последний — после окончания задержки, если были дополнительные вызовы.
 *
 * @param {Function} fn — функция-обработчик
 * @param {number} delay — задержка в миллисекундах
 * @returns {Function}
 */
export default function throttle(fn, delay = DEFAULT_THROTTLE) {
  let lastCall = 0
  let timerId = null
  let lastArgs = null
  let lastThis = null

  const throttled = (...args) => {
    const now = Date.now()
    const remaining = delay - (now - lastCall)

    if (remaining <= 0) {
      if (timerId) {
        clearTimeout(timerId)
        timerId = null
      }
      lastCall = now
      fn.apply(this, args)
    } else {
      lastArgs = args
      lastThis = this
      if (!timerId) {
        timerId = setTimeout(() => {
          lastCall = Date.now()
          fn.apply(lastThis, lastArgs)
          timerId = null
          lastArgs = null
          lastThis = null
        }, remaining)
      }
    }
  }

  throttled.cancel = () => {
    clearTimeout(timerId)
    timerId = null
    lastArgs = null
    lastThis = null
  }
  return throttled
}
