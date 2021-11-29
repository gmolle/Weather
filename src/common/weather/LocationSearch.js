import { Icon } from "@iconify/react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { fetchTodaysWeather, fetchWeatherForecast, setCity } from "../../features/weather/weatherSlice"

const LocationSearch = () => {
  const dispatch = useDispatch()
  const {city, todaysWeather} = useSelector(state => state.weather)

  useEffect(() => {
    // dispatch(setCity(todaysWeather.name))
  }, [dispatch, todaysWeather.name])

  // Called when city is searched for in the input field to fetch the new locations weather
  const getWeather = () => {
    dispatch(fetchTodaysWeather())
    dispatch(fetchWeatherForecast())
  }

  return (
    <form action="" className='weather__search' onKeyDown={e => e.key === 'Enter' && getWeather()}>
      <input 
        type="text" 
        placeholder='City' 
        value={city} 
        onChange={(e) => dispatch(setCity(e.target.value))} 
        onClick={(e) => e.target.select()}
      />
      <button type='button' aria-label='Search for city' onClick={() => getWeather()}><Icon icon="bx:bx-search"/></button>
    </form>
  )
}

export default LocationSearch
