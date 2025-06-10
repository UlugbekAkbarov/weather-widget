import WeatherWidget from "./components/WeatherWidget"
import { SettingsProvider } from "./context/SettingsContext"
import { ThemeProvider } from "./context/ThemeContext"

import "./styles/App.css"

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <WeatherWidget />
      </SettingsProvider>
    </ThemeProvider>
  )
}

export default App
