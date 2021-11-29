import { useSelector } from "react-redux"

const AdvancedWeatherDetails = () => {
  const {wind, clouds, main } = useSelector(state => state?.weather?.todaysWeather)

  // From https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words/18482299#18482299
  // Wind direction from the API is provided in degrees from 0-360, this will convert it to the proper direction
  const degToCompass = (num) => { 
    while( num < 0 ) num += 360 ;
    while( num >= 360 ) num -= 360 ; 
    const val= Math.round( (num -11.25 ) / 22.5 ) ;
    const arr=["N","NNE","NE","ENE","E","ESE", "SE", 
          "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"] ;
    return arr[ Math.abs(val) ] ;
  }
  

  return (
    <div className='weather__details'>
      <p className='header'>Weather Details</p>
      <div>
        <p>Cloud Coverage</p>
        <p>{clouds?.all}%</p>
      </div>
      <div>
        <p>Humidity</p>
        <p>{main?.humidity}%</p>
      </div>
      <div>
        <p>Wind Speed</p>
        <p>{Math.round(wind?.speed)} mph {degToCompass(wind?.deg)}</p>
      </div>
    </div>
  )
}

export default AdvancedWeatherDetails
