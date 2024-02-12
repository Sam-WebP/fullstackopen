const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = () => {
  return (
    <div>
      <Part name="Fundamentals of React" exercises={10}/>
      <Part name="Using props to pass data" exercises={7}/>
      <Part name="State of a component" exercises={14}/>
    </div>
  );
};

const Part = (props) => {
  return (
     <p>
      {props.name} {props.exercises}
     </p>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>;
};

const App = () => {
  const course = 'Half Stack application development';

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total exercises1={10} exercises2={7} exercises3={14} />
    </div>
  );
};

export default App;
