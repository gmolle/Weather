import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { fetchTodaysWeather, fetchTodaysWeatherCoords, fetchWeatherForecast, setCity } from "./weatherSlice"

import './weather.css'
import WeatherMainSection from "../../common/weather/WeatherMainSection"

const Weather = () => {
  const dispatch = useDispatch()
  const {todayStatus} = useSelector(state => state.weather)

  // If location preference is stored in local storage => set city state to the storage values => get weather
  // If location preference is not stored, use geolocation to get weather
  // If users location is turned off, get weather with the default values
  useEffect(() => {
    if(localStorage.getItem('city') ) {
      dispatch(setCity(localStorage.getItem('city')))
      dispatch(fetchTodaysWeather())
    } else {
      navigator.permissions && navigator.permissions.query({name:'geolocation'})
      .then((result) => {
        if (result.state === 'granted') {
          navigator?.geolocation?.getCurrentPosition(pos => {
             dispatch(fetchTodaysWeatherCoords({lat: pos.coords.latitude, lon: pos.coords.longitude})) 
          }, (error) => {
            dispatch(fetchTodaysWeather())
          });
        } else {
          dispatch(fetchTodaysWeather())
        }
        }, (error) => {
          dispatch(fetchTodaysWeather())
        }
      )
    }
  }, [dispatch])

  // Fetch the forecasted weather after the current weather is fetched
  useEffect(() => {
    if(todayStatus === 'idle') {
      dispatch(fetchWeatherForecast())
    }
  }, [todayStatus, dispatch])

  return (
    <div className='weather'>
      {/* {forecastStatus !== 'idle' ? <Loader /> : <WeatherMainSection />} */}
      <WeatherMainSection />
    </div>
  )
}

export default Weather
