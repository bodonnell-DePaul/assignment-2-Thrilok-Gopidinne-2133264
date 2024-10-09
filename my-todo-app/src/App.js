import logo from './logo.svg';
import './App.css';
import ListGroup from 'react-bootstrap/ListGroup';
import DisplayTodoList from './Components/DisplayTodoList';
function App() {
  return (
    <div className="App">
      <header className="Assignment 2 : Trilok's Todo list">
      <DisplayTodoList/>
      </header>
    </div>
  );
}

export default App;



