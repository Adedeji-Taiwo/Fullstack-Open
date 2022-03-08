import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"

const App = () => {
    const course = 'Half Stack application development'
    const data = {
        part1: 'Fundamentals of React',
        exercise1: 10,
        part2: 'Using props to pass data',
        exercise2: 7,
        part3: 'State of a component',
        exercise3: 14,
    }
    

  return (
    <div>
        <Header course = {course}/>
        <Content content = {data} />
        <Total total = {data} />
    </div>
  )
}

export default App;