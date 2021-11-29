const DailyForecast = ({high, low, icon, day}) => {
  return (
    <div className='weather__daily'>
      <p className='weather__daily__day'>
        {new Date(day * 1000).toLocaleDateString('en-us', {weekday: 'long'})}
      </p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" loading='lazy'/>
      <p className='weather__daily__temps'><strong>{Math.round(high)}</strong> {Math.round(low)}</p>
    </div>
  )
}

export default DailyForecast
