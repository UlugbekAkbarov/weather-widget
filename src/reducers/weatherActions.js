export const EnumAction = {
  FETCH_WEATHER: "FETCH_WEATHER",
  CHANGE_CITY: "CHANGE_CITY",
  TOGGLE_UNIT: "TOGGLE_UNIT",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
}

export default function weatherActions(dispatch) {
  return {
    fetchWeather: (current, forecast) => dispatch({ type: EnumAction.FETCH_WEATHER, payload: { current, forecast } }),
    changeCity: (city) => dispatch({ type: EnumAction.CHANGE_CITY, payload: city }),
    toggleUnit: () => dispatch({ type: EnumAction.TOGGLE_UNIT }),
    setError: (error) => dispatch({ type: EnumAction.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: EnumAction.CLEAR_ERROR }),
  }
}
