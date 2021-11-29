import { useSelector } from "react-redux"

const HourlyForecast = ({temp, icon, time, desc}) => {
  const {forecastedWeather} = useSelector(state => state.weather)

  return (
    <div className='weather__hourly'>
      <p>
        {time < new Date().getTime() / 1000 ? 'Now' : new Date(time * 1000).toLocaleString('en-us', {hour: 'numeric', timeZone: forecastedWeather.timezone})}
      </p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" loading='lazy'/>
      <p>{Math.round(temp)}&deg;</p>
      <p className='weather__hourly__desc'>{desc}</p>
    </div>
  )
}

export default HourlyForecast
