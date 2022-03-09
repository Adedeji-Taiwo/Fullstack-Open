import { useState } from "react";
import Button from "./components/Button";
import Message from "./components/Message";
import Feedback from "./components/Feedback";


function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);
  const total =  () => (good + neutral + bad); 
  const average = () => ((good * 1) + (neutral * 0) + (bad * -1)) / total();
  const positive = () => {
    const result =  (good / total()) * 100;
    return result;
  }


  
  const render = total() === 0 ? (
    <Message />
  ) : (
    <Feedback 
      good={good}
      bad = {bad}
      neutral = {neutral}
      total = {total()}
      average = {average()}
      positive = {positive()}
    />
  )
  

  return (
    <div className="App">
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text = "Good"/>
      <Button onClick={handleNeutral} text = "Neutral"/>
      <Button onClick={handleBad} text = "Bad"/>
      {render}
    </div>
  );
}

export default App;
