import { useState } from "react";
import anecdotes from "./assets/data";
import Button from "./components/Button";
import Header from "./components/Header";
import Anecdotes from "./components/Anecdotes";
import MostVoted from "./components/MostVoted";
import NotVoted from "./components/NotVoted";



function App() {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [hasVotes, setHasVotes] = useState(false);

  
  const handleRandomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    setHasVotes(true);
  }

  const maxVotedCount = Math.max(...votes);
  const maxVotedIndex = votes.indexOf(maxVotedCount);
  const maxVoted = anecdotes[maxVotedIndex];



const renderVoted = hasVotes ? (
   <MostVoted 
    title = "Anecdote with Most Votes"
    maxVoted={maxVoted}
    maxVotedCount={maxVotedCount}
   />
) : (
  <NotVoted />
)


  return (
    <div className="App">
      <Header title="Anecdote of the Day"/>
      <Anecdotes anecdotes={anecdotes[selected]} voteCount = {votes[selected]}/>
      <Button onClick={handleVote} text = "Vote"/>
      <Button onClick={handleRandomAnecdote} text ="Next anecdote"/>
     {renderVoted}
    </div>
  );
}

export default App;
