import { useSelector } from "react-redux"
import DailyForecast from "./DailyForecast"

const WeatherDailyForecasts = () => {
  const {forecastedWeather: {daily}} = useSelector(state => state.weather)
  
  //Removing the first day here because you dont need to see todays forecast if you
  //can see the weather already
  return (
    <div className='weather__daily__forecasts'>
      {daily?.slice(1).map(day => (  
        <DailyForecast             
          key={day.dt}
          high={day.temp.max}
          low={day.temp.min}
          icon={day.weather[0].icon}
          day={day.dt}
        />
      ))}
    </div>
  )
}

export default WeatherDailyForecasts
