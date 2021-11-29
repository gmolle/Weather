import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import LocationSearch from "./LocationSearch"
import WeatherDailyForecasts from "./WeatherDailyForecasts"
import WeatherHourlyForecasts from "./WeatherHourlyForecasts"
import WeatherDetails from "./WeatherDetails"

import {Slide, toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Icon} from '@iconify/react'
import Loader from "../Loader/Loader"


const WeatherMainSection = () => {
  const {todaysWeather, todaysWeather: {weather}, city, todayStatus, forecastStatus} = useSelector(state => state.weather)
  const [currentDay, setCurrentDay] = useState(new Date())
  const [isPreference, setIsPreference] = useState(false) 

  
  // Toast notifications for adding/removing your favorite city using toastify
  const notify = () => {
    if(!isPreference) return toast.success('Location Saved', {theme: 'dark'})
    toast.error('Location Removed', {theme: 'dark'})
  }


  // Saves the current city in local storage
  // If you are currently viewing the saved city, and click the button again, it will remove it
  const setLocationPreference = () => {
    localStorage.setItem('city', city)
    if (checkLocationPreference()) {
      setIsPreference(true)
      notify()
    } 
    if(isPreference) {
      setIsPreference(false)
      localStorage.removeItem('city')
    }
  }

  // Check if the current location is your saved location
  const checkLocationPreference = useCallback(() => {
    if(localStorage?.getItem('city')?.toLowerCase() === city?.toLowerCase()) {
      return true
    }
  }, [city])

  // If either current weather or forecasted weather is rejected, display toast to alert the user of the rejection
  useEffect(() => {
     if(todayStatus === 'rejected') {
      toast.error('City not found', {theme: 'dark', toastId: 'city-error'})
    }
  }, [todayStatus, forecastStatus])

 
  // Call checkLocationPreference to check if the current location is your saved location
  useEffect(() => {
    if (checkLocationPreference()) {
      setIsPreference(true)
    } else {
      setIsPreference(false)
    }
  },[setIsPreference, checkLocationPreference])

  // The Current Weather Data endpoint only gives the timezone difference for the unix timestamp
  // This is used the convert the time to the correct time zone of the current city
  useEffect(() => {
    const calculateTimezone = () => {
      const currentDate = new Date()
      const localTime = currentDate.getTime()
      const localOffset = currentDate.getTimezoneOffset() * 60000
      const utc = localTime + localOffset
      const locationTime = utc + (1000 * todaysWeather.timezone)
      const convertedDate = new Date(locationTime)
      return convertedDate
    }
    setCurrentDay(calculateTimezone())
  }, [todaysWeather.timezone])

  return (
    <>
      <div className='weather__main'>
      {(todayStatus !== 'idle' && forecastStatus !== 'idle') ? <Loader/> :
      <>
        <h1 className='weather__main__temp'>{Math.round(todaysWeather?.main?.temp)}&deg;</h1>
        <div className='weather__main__locationtime'>
          <h2 className='weather__main__location'>{todaysWeather?.name}</h2>
          <p className='weather__main__time'>
            {currentDay.toLocaleString('en-us', {hour: 'numeric', minute: 'numeric', hour12: true})}
            {' '}
            {currentDay.toLocaleDateString('en-us', {weekday: 'long', day:'numeric', month: 'short', year: 'numeric'})}
          </p>
        </div>
        <div className='weather__main__icondesc'>
          {weather && 
           <img src={`https://openweathermap.org/img/wn/${weather?.[0]?.icon}@2x.png`} alt="Current Weather" />
          }
          <h3 className='weather__main__desc'>{weather?.[0].main}</h3>
        </div>
        <Icon 
          className={isPreference ? 'weather__favorite favorited' : 'weather__favorite'}
          icon={isPreference ? "ant-design:star-filled" : "ant-design:star-outlined"} 
          onClick={() => setLocationPreference()}
        />
        </>
        }
      </div>
      <ToastContainer position="top-left" autoClose={4000} transition={Slide}/>
      <div className='weather__forecasts'>
      {forecastStatus !== 'idle' ? <Loader /> : 
        <>
        <LocationSearch />
        <WeatherHourlyForecasts />
        <WeatherDetails />
        <WeatherDailyForecasts />
        </>
      }
      </div>
    </>
  )
}

export default WeatherMainSection
