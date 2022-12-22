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
      {console.log(searchResult)}
      <Display data={searchResult} searchBool={isSearch} />
    </div>
  )
}

const Display = ({ data }) => {

  let oneCountry;

  function toDisplay() {
    if (data.length > 5) {
      return "Too many results, Filter down"
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

  const listOfLanguages = []
  const Languages = (data) => {
    for (const prop in data) {
      listOfLanguages.push(data[prop])
    }
  }

  return (
    <>
      <div>capital {data === undefined ? '' : data[0]['capital']} </div>
      <div>area {data === undefined ? '' : data[0]['area']} </div>
      <h4>Languages {data === undefined ? '' : Languages(data[0]['languages'])}</h4>
      {data === undefined ? '' : listOfLanguages.map(lang => <li> {lang} </li>)}
      <h1>{data === undefined ? '' : data[0]['flag']} </h1>
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
