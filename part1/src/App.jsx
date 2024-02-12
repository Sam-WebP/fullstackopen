const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  // console.log(props.parts[0])
  return (
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>
  );
};

const Part = (props) => {
  console.log(props.part)
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p> 
  )
}


const Total = (props) => {
  return <p>Number of exercises {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const partsArr = [course.parts[0], course.parts[1], course.parts[2]]

  return (
    <div>
      <Header course={course.name} />
      <Content parts={partsArr}/>
      <Total exercises={partsArr}/>
    </div>
  );
};

export default App;
