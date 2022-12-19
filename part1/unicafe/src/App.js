import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const setToAll = () => {
    setAll(all + 1);
  }

  const calcAverage = () => {
    const average = (((good * 1) + (neutral * 0) + (bad * -1)) / all).toFixed(2);
    setAvg(average)
  }

  const calcPositive = () => {
    const pos = ((good / all) * 100).toFixed(2)
    setPositive(pos)
  }

  const doAllAvgPos = () => {
    setToAll()
    calcPositive()
    calcAverage()
  }

  const incrementGood = () => {
    doAllAvgPos()
    setGood(good + 1)
  }
  const incrementNeutral = () => {
    doAllAvgPos()
    setNeutral(neutral + 1)
  }
  const incrementBad = () => {
    doAllAvgPos()
    setBad(bad + 1)
  }

  return (
    <div>
      <h1> Give Feedback</h1>
      <Button onClick={incrementGood} text="good" />
      <Button onClick={incrementNeutral} text="neutral" />
      <Button onClick={incrementBad} text="bad" />
      <h1> Statistics </h1>
      <Statistics feedBack={[good, neutral, bad, all, avg, positive]} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}> {props.text}</button>
  )
}

const Statistics = (props) => {
  if (props.feedBack[3] === 0) {
    return (
      <div>
        <p> No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <StatisticLine type="good" rating={props.feedBack[0]} />
      <StatisticLine type="neutral" rating={props.feedBack[1]} />
      <StatisticLine type="bad" rating={props.feedBack[2]} />
      <StatisticLine type="all" rating={props.feedBack[3]} />
      <StatisticLine type="avg" rating={props.feedBack[4]} />
      <StatisticLine type="positive" rating={props.feedBack[5]} />
    </table>
  )
}

const StatisticLine = ({ type, rating }) => {
  return (
    <tr>
      <td> {type} {rating} </td>
    </tr>
  )
}

export default App