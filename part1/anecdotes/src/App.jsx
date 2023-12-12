import { useState } from 'react'

// Anecdotes component used to show anecdote of the day from anecdotes array.
const Anecdotes=({anecdote,vote})=>{
  return (
    <>
    <h1>Anecdotes of the day</h1>
    <div>
      <p>
        <q>
          {anecdote}
        </q>
      </p>
      <p>
        {vote>1?"Votes":"Vote"} <b>{vote}</b>.
      </p>
    </div>
    </>
  )
}
// Votes component used to show anecdote with the most votes
const Votes=({anecdote,vote}) => {
  return(
    <>
    <h1>Anecdotes with the most votes</h1>
    <div>
      <p>
        <q>
          {anecdote}
        </q>
      </p>
      <p>
        With <b>{vote}</b> {vote>1?"votes":"vote"}!!!
      </p>
    </div>
    </>
  )
}
// Button component used to change anecdote and vote an anecdote.
const Button=({onClick,text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
 }

const App = () => {

  // Declare array of anecdotes
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // declare state an initialize.
  const [selected, setSelected] = useState(0);
  const [voteArray, setVoteArray] = useState(new Array(anecdotes.length).fill(0));

  // Call back function for th onClick event of the next anecdote button.
  // Generates random number between 0 and the length of the anecdotes array.
  // Then sets the selected state variable to the generated random number.
  const handleClick=()=>{
    let randomIndex=Math.floor(Math.random()*anecdotes.length);
    setSelected(randomIndex);
  }

// Call back function for th onClick event of the vote button.
//Copies state array and increments the value of the selected index by one.
  const handleVote=()=>{
    let newArray=[...voteArray];
    newArray[selected]+=1;
    setVoteArray(newArray);
  }
  
  return (
    <div>
      <Anecdotes anecdote={anecdotes[selected]} vote={voteArray[selected]}/>
      <Button onClick={handleClick} text={"next anecdote"}/>
      <Button onClick={handleVote} text={"Vote"}/>
      <Votes anecdote= {anecdotes[voteArray.indexOf(Math.max(...voteArray))]} vote={Math.max(...voteArray)}/>
    </div>
  )
}

export default App