export const CITIES = ["London", "New York", "Tokyo", "Sydney", "Cairo"]

export const UNITS = ["Fahrenheit", "Celsius", "Kelvin"]
export const ENUM_UNITS = {
  Fahrenheit: "Fahrenheit",
  Celsius: "Celsius",
  Kelvin: "Kelvin",
}
export const UNITS_SYMBOLS = {
  Fahrenheit: "°F",
  Celsius: "°C",
  Kelvin: "K",
}

export const DEFAULT_CITY = "London" // значение по умолчанию для города
export const DEFAULT_UNIT = ENUM_UNITS.Celsius // значение по умолчанию для единиц измерения температуры
export const DEFAULT_LANGUAGE = "en" // значение по умолчанию для языка приложения
export const DEFAULT_THEME = "light" // значение по умолчанию для темы приложения
export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD" // значение по умолчанию для формата даты
export const DEFAULT_TIME_FORMAT = "HH:mm:ss" // значение по умолчанию для формата времени
export const DEFAULT_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss" // значение по умолчанию для формата даты и времени
export const DEFAULT_TIMEZONE = "UTC" // значение по умолчанию для часового пояса
export const DEFAULT_DEBOUNCE = 300 // задержка в миллисекундах для debounce
export const DEFAULT_THROTTLE = 5000 // задержка в миллисекундах для throttle (5 секунд)
export const DEFAULT_DELAY = 300 // задержка в миллисекундах для задержки выполнения
export const DEFAULT_REFRESH_RATE = 5000 // частота обновления данных в миллисекундах (5 секунд)
export const DEFAULT_MAX_RETRIES = 3 // максимальное количество попыток при ошибках сети

export const DEFAULT_VISIBLE_CURRENT_WEATHER = true // видимость текущей погоды по умолчанию
export const DEFAULT_VISIBLE_FORECAST = true // видимость прогноза погоды по умолчанию
export const DEFAULT_VISIBLE_STATISTICS = true // видимость статистики погоды по умолчанию
export const DEFAULT_VISIBLE_SETTINGS = true // видимость настроек по умолчанию

export const ENUM_TAB_IDS = {
  CURRENT: "currentWeather",
  FORECAST: "forecast",
  STATISTICS: "statistics",
  SETTINGS: "settings",
}
export const ENUM_TAB_LABELS = {
  [ENUM_TAB_IDS.CURRENT]: "Current Weather",
  [ENUM_TAB_IDS.FORECAST]: "Forecast",
  [ENUM_TAB_IDS.STATISTICS]: "Statistics",
  [ENUM_TAB_IDS.SETTINGS]: "Settings",
}
export const DEFAULT_VISIBLE_TABS = {
  [ENUM_TAB_IDS.CURRENT]: DEFAULT_VISIBLE_CURRENT_WEATHER,
  [ENUM_TAB_IDS.FORECAST]: DEFAULT_VISIBLE_FORECAST,
  [ENUM_TAB_IDS.STATISTICS]: DEFAULT_VISIBLE_STATISTICS,
  [ENUM_TAB_IDS.SETTINGS]: DEFAULT_VISIBLE_SETTINGS,
}
export const DEFAULT_ACTIVE_TAB_ID = ENUM_TAB_IDS.CURRENT

export const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "your_api_key_here" // ваш API ключ для OpenWeatherMap
export const API_URL = "https://api.openweathermap.org/data/2.5/weather" // базовый URL для OpenWeatherMap API
export const API_UNITS = "metric" // единицы измерения для температуры (metric, imperial, standard)
export const API_ICON_URL = "https://openweathermap.org/img/wn/" // базовый URL для иконок погоды
export const API_ICON_EXT = "@2x.png" // расширение иконок погоды
export const API_TIMEOUT = 5000 // таймаут запроса к API в миллисекундах

export const API_ERROR_CODES = {
  400: "Bad Request - The request could not be understood by the server due to malformed syntax.",
  401: "Unauthorized - Authentication is required and has failed or has not yet been provided.",
  403: "Forbidden - The request was a valid request, but the server is refusing to respond to it.",
  404: "Not Found - The requested resource could not be found.",
  500: "Internal Server Error - An error occurred on the server.",
  503: "Service Unavailable - The server is currently unable to handle the request due to temporary overloading or maintenance of the server.",
}

// export const API_ERROR_MESSAGE = "Не удалось загрузить данные. Пожалуйста, проверьте подключение к интернету и попробуйте снова."
// export const API_NOT_FOUND_MESSAGE = "Город не найден. Пожалуйста, проверьте название и попробуйте снова."
// export const API_RATE_LIMIT_MESSAGE = "Превышен лимит запросов к API. Пожалуйста, попробуйте позже."
// export const API_INVALID_KEY_MESSAGE = "Неверный API ключ. Пожалуйста, проверьте настройки и попробуйте снова."
// export const API_GENERIC_ERROR_MESSAGE = "Произошла ошибка при обращении к API. Пожалуйста, попробуйте позже."
// export const API_SUCCESS_MESSAGE = "Данные успешно загружены."
// export const API_LOADING_MESSAGE = "Загрузка данных... Пожалуйста, подождите."
// export const API_NO_DATA_MESSAGE = "Нет данных для отображения. Пожалуйста, выберите другой город или проверьте подключение к интернету."
// export const API_CONNECTION_ERROR_MESSAGE = "Ошибка соединения с сервером. Пожалуйста, проверьте подключение к интернету и попробуйте снова."
// export const API_UNAUTHORIZED_MESSAGE = "Доступ запрещен. Пожалуйста, проверьте настройки API и попробуйте снова."
// export const API_SERVER_ERROR_MESSAGE = "Ошибка сервера. Пожалуйста, попробуйте позже."
// export const API_BAD_REQUEST_MESSAGE = "Некорректный запрос. Пожалуйста, проверьте параметры и попробуйте снова."
// export const API_NOT_IMPLEMENTED_MESSAGE = "Функция не реализована. Пожалуйста, попробуйте позже."
// export const API_SERVICE_UNAVAILABLE_MESSAGE = "Сервис временно недоступен. Пожалуйста, попробуйте позже."
// export const API_UNKNOWN_ERROR_MESSAGE = "Неизвестная ошибка. Пожалуйста, попробуйте позже."
// export const API_TIMEOUT_MESSAGE = "Превышено время ожидания ответа от сервера. Пожалуйста, проверьте подключение к интернету и попробуйте снова."
