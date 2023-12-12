import { useState } from 'react'
// Generic Button component.
const Button =({onClick,text}) => {

  return(
    <button onClick={onClick}>{text}</button>
  )
 }
// StatisticsLine component.used inside Statistics component as table row.
const StatisticsLine = ({text,value}) => {
  return(
    <tr>
      <td>
      {text}: {value} {text==="Positive"?"%":" "}
      </td>
    </tr>
  )
 }

//  Statistics component,returns table with StatisticsLine component as rows of the table.
const Statistics=({good,neutral,bad})=>{
  if(good===0 && neutral===0 && bad===0){
    return(
      <p>No feedback given</p>
    )
  }
return(
  <div>
    <table>
      <thead>
        <tr>
          <th>
           <h2>Statistics</h2>
          </th>
        </tr>
      </thead>
      <tbody>
    <StatisticsLine text={"Good"} value={good}/>
    <StatisticsLine text={"Neutral"} value={neutral}/>
    <StatisticsLine text={"Bad"} value={bad}/>
    <StatisticsLine text={"All"} value={good + neutral + bad}/>
    <StatisticsLine text={"Average"} value={(good + neutral + bad/3).toFixed(2)}/>
    <StatisticsLine text={"Positive"} value={((good/(good + neutral + bad) )*100).toFixed(2)}/>
      </tbody>
    </table>
  </div>
)
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // Call back function for good button onClick event.
  // Increments the good state by one.using the setGood method provided by the useState hook.
  const handleGood=()=>{
      setGood(good+1);
  }
  // Call back function for neutral button onClick event.
  // Increments the neutral state by one.using the setNeutral method provided by the useState hook.
  const handleNeutral=()=>{
    setNeutral(neutral+1);
  }
  // Call back function for bad button onClick event.
  // Increments the bad state by one.using the setBad method provided by the useState hook.
  const handleBad=()=>{
    setBad(bad+1);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text={"good"}/>
      <Button onClick={handleNeutral} text={"neutral"}/>
      <Button onClick={handleBad} text={"bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App