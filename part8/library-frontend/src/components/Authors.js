import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_BIRTHYEAR, ALL_AUTHOR } from '../queries'
import Select from "react-select"

const Authors = ({ show, authors }) => {
  const [name, setName] = useState('')
  const [birthyear, setBirthYear] = useState('')

  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHOR }]
  })

  const options = authors.map(a => {
    return { value: a.name, label: a.name }
  })

  if (!show) {
    return null
  }

  const birthYearHandler = (event) => {
    event.preventDefault()

    editBirthYear({
      variables:
        { name, setBornTo: birthyear }
    })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Set birth year</h2>

        <form onSubmit={birthYearHandler}>
          <div>
            <Select
              options={options}
              onChange={(selectOption) => setName(selectOption.label)}
            />
          </div>
          <div>
            born <input
              onChange={({ target }) => setBirthYear(Number(target.value))}
              value={birthyear}
            />
          </div>
          <div>
            <button type="submit">update author</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authors
