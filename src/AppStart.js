import './App.css';

function App() {
  const greeting = 'Hello Function Component prop!';
  return <HeadLine value={greeting} />;
}

function HeadLine(props) {
  return <h1>{props.value}</h1>
}

export default App;
