import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../common/axiosInstance'

// Not technically a secure way to store api keys, but it will work for this purpose
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const initialState = {
  todayStatus: 'idle',
  forecastStatus: 'idle',
  todaysWeather: {},
  forecastedWeather: {},
  currentLat: 0,
  currentLon: 0,
  city: 'Columbus',
}

// Fetch the current weather by city
export const fetchTodaysWeather = createAsyncThunk(
  'weather/fetchTodaysWeather',
  async (_, {getState}) => {
    const {city} = getState().weather
    const {data} = await axios.get(`/weather?q=${city}&appid=${API_KEY}&units=imperial`)
    return data
  }
)

// Fetch the current weather by coordinates - used with geolocation
export const fetchTodaysWeatherCoords = createAsyncThunk(
  'weather/fetchTodaysWeatherCoords',
    async (location) => {
      const {lat, lon} = location
      const {data} = await axios.get(`/weather?lat=${lat}&lon=${lon}&exclude=current,minutely&units=imperial&appid=${API_KEY}`)
      return data
    }
)

// Fetch the weather forecast
export const fetchWeatherForecast = createAsyncThunk(
  'weather/fetchWeatherForecast',
  async (_, {getState}) => {
    const {currentLat, currentLon} = getState().weather
    const {data} = await axios.get(`/onecall?lat=${currentLat}&lon=${currentLon}&exclude=current,minutely&units=imperial&appid=${API_KEY}`)
    return data
  }
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodaysWeather.pending, (state) => {
        state.todayStatus = 'loading'
      })
      .addCase(fetchTodaysWeather.fulfilled, (state, action) => {
        state.todaysWeather = action.payload
        state.currentLat = action.payload.coord.lat
        state.currentLon = action.payload.coord.lon
        state.todayStatus = 'idle'
      })
      .addCase(fetchTodaysWeather.rejected, (state) => {
        state.todayStatus = 'rejected'
      })
      .addCase(fetchTodaysWeatherCoords.pending, (state) => {
        state.todayStatus = 'loading'
      })
      .addCase(fetchTodaysWeatherCoords.fulfilled, (state, action) => {
        state.todaysWeather = action.payload
        state.currentLat = action.payload.coord.lat
        state.currentLon = action.payload.coord.lon
        state.todayStatus = 'idle'
      })
      .addCase(fetchTodaysWeatherCoords.rejected, (state) => {
        state.todayStatus = 'rejected'
      })
      .addCase(fetchWeatherForecast.pending, (state) => {
        state.forecastStatus = 'loading'
      })
      .addCase(fetchWeatherForecast.fulfilled, (state, action) => {
        state.forecastedWeather = action.payload
        state.forecastStatus = 'idle'
      })
      .addCase(fetchWeatherForecast.rejected, (state) => {
        state.forecastStatus = 'rejected'
      })
  }
})

export const {setCity} = weatherSlice.actions
export default weatherSlice.reducer