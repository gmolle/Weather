import { useSelector } from "react-redux"
import HourlyForecast from "./HourlyForecast"

const WeatherHourlyForecasts = () => {
  const {forecastedWeather: {hourly}} = useSelector(state => state.weather)

  // Only displaying the first 24 out of 48 results to show the next 24 hours forecast instead of 48 hours.
  return (
    <div className='weather__hourly__forecasts'>
      {hourly?.slice(0, hourly.length / 2).map(hour => (
        <HourlyForecast 
          key={hour.dt} 
          temp={hour.temp} 
          icon={hour.weather[0].icon}
          time={hour.dt}
          desc={hour.weather[0].main}
        />
      ))}
    </div>
  )
}

export default WeatherHourlyForecasts
