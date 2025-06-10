import { DEFAULT_DEBOUNCE } from "./constants"

/**
 * Возвращает версию функции fn, которая будет вызвана
 * не чаще, чем раз в delay миллисекунд.
 * @param {Function} fn — функция-обработчик
 * @param {Number} delay — задержка в мс
 * @returns {Function}
 */
export default function debounce(fn, delay = DEFAULT_DEBOUNCE) {
  let timerId
  const debounced = (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => fn.apply(this, args), delay)
  }
  debounced.cancel = () => clearTimeout(timerId)
  return debounced
}
