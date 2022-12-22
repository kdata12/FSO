import axios from "axios";
import { useState, useEffect } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [countries, setCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const userInput = (event) => {
    setSearch(event.target.value)
    setIsSearch(event.target.value.length > 0);
  }

  const searchResult = isSearch ?
    countries.filter(country =>
      country.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : countries

  return (
    <div>
      <Query search={search} onChange={userInput} />
      <ShowMatches data={searchResult} />
    </div>
  )
}

const ShowMatches = ({ data }) => {

  const [selected, setSelected] = useState('')
  const [final, setFinal] = useState([])
  const [capLatLng, setCapLatLng] = useState([])
  const [weather, setWeather] = useState([])

  const hook = () => {
    const [lat, long] = capLatLng
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }

  useEffect(hook, [capLatLng])

  let countriesToShow = []
  function showUpTo5Matches() {
    if (data.length > 5) {
      return "Too many results, Filter down"
    }
    for (let item of data) {
      countriesToShow.push(item.name.common)
    }
  }

  function getCountry(event) {
    setSelected(event.target.value)
    for (let item of data) {
      if (item.name.common === selected) {
        setCapLatLng(item['capitalInfo']['latlng'])
        setFinal([item])
      }
    }
  }
  return (
    <div>
      {showUpTo5Matches()}
      {countriesToShow.map(country =>
        <p>
          {country} <button onClick={getCountry} value={country}>show</button>
        </p>)}
      <Display data={final} />
      <WeatherData data={weather} />
    </div>
  )
}

const Display = ({ data }) => {

  let oneCountry; //[{..}]

  function toDisplay() {
    if (data.length > 5) {
      return
    } else if (data.length === 1) {
      oneCountry = data;
      return data[0].name.common
    }
  }
  return (
    <div>
      <h1>{(data === []) ? '' : toDisplay()}</h1>
      <CountryInfo data={oneCountry} />
    </div>
  )
}

const CountryInfo = ({ data }) => {

  const [capital, area, flag, languages, latlng] = data === undefined ? ['', '', '', ''] :
    [data[0]['capital'],
    data[0]['area'],
    data[0]['flag'],
    data[0]['languages'],
    data[0]['capitalInfo']['latlng']]
    
  const listOfLanguages = []
  const Languages = (data) => {
    for (const prop in data) {
      listOfLanguages.push(data[prop])
    }
  }

  //weather in capital
  //use capital lat and long from API
  //then make an api call using https://openweathermap.org/current to retrieve weather data
  //api key: https://home.openweathermap.org/api_keys

  return (
    <>
      <div>capital {capital} </div>
      <div>area {area} </div>
      <h4>Languages {Languages(languages)}</h4>
      {listOfLanguages.map(lang =>
        <li> {lang} </li>)}
      <h1>{flag}</h1>
      <h1>Weather in {capital}</h1>
    </>
  )
}

const WeatherData = ({ data }) => {

  //const [temp, wind] = data == [] ? ['', ''] : [data.main.temp, data.wind.speed]
  let [temp, wind, icon] = []
  function parseWeather() {
    if (data.length === 0) {
      console.log('an array')
      return
    }
    temp = (data.main.temp - 273.15).toFixed(2) + ' celsius'
    wind = data.wind.speed
    icon = data.weather[0].icon
  }

  return (
    <>
      {parseWeather()}
      <p>temperature- {temp}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
      <p>wind speed- {wind}</p>
    </>
  )
}


const Query = ({ search, onChange }) => {
  return (
    <div>
      find countries <input value={search} onChange={onChange} />
    </div>
  )
}

export default App;
