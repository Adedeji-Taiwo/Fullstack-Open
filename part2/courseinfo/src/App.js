import Course from "./components/Course";
import courses from "./assets/courses";

const App = () => {
  return (
    <div className="App">
      {courses.map(course => <Course course={course} />)}
    </div>
  );
}

export default App;
