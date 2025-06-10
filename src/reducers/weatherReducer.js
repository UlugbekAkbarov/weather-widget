import { ENUM_UNITS } from "../utils/constants"
import { EnumAction } from "./weatherActions"

export const initialState = {
  city: "London",
  unit: ENUM_UNITS.Celsius,
  current: null,
  forecast: [],
  loading: false,
  error: null,
}

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case EnumAction.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
        loading: true,
        error: null,
      }

    case EnumAction.FETCH_WEATHER:
      return {
        ...state,
        current: action.payload.current,
        forecast: action.payload.forecast,
        loading: false,
        error: null,
      }

    case EnumAction.TOGGLE_UNIT:
      return {
        ...state,
        unit: state.unit === ENUM_UNITS.Fahrenheit ? ENUM_UNITS.Celsius : ENUM_UNITS.Fahrenheit,
      }

    case EnumAction.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case EnumAction.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}
