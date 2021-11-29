import axios from 'axios'

// const CURRENT_TIME = new Date().toISOString()

// I'm not really sure how to make this work with a timestamp header. I get a CORS error if I use the header.
// I've tried to prepend this URL that I found after looking around but it seems it is no longer really useable
// https://cors-anywhere.herokuapp.com/
// Without having a backend set up, I'm not sure how I would get around the CORS issue.
const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/', 
  // headers: {
  //   'Timestamp': CURRENT_TIME,
  // },
})

export default instance