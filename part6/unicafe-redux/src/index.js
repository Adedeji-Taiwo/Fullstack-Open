import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer';
import Button from './components/Button';
import Message from './components/Message';
import Feedback from './components/Feedback';


const store = createStore(reducer)

store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
})



const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }



  

  const total = () => {
    let storage = store.getState();
    return storage.good + storage.ok + storage.bad
  }

  const average = () => {
    let storage = store.getState();
    return (storage.good * 1) + (storage.ok * 0) + (storage.bad * -1);
  }

  const positive = () => {
    return (store.getState().good / total()) * 100;
  }


  

  const render = total() === 0 ? (
    <Message />
  ) : (
    <Feedback 
      good={store.getState().good}
      bad = {store.getState().bad}
      ok = {store.getState().ok}
      total = {total()}
      average = {average()}
      positive = {positive()}
    />
  )
  


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={good} text='Good'/>
      <Button onClick={ok} text='Ok'/>
      <Button onClick={bad} text='bad'/>
      <Button onClick={zero} text='Reset Stats'/>
      {render}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
