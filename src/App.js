import React from 'react';
import logo from './logo.svg';
import './App.css';

//Common
import Title from './Components/Common/Title';
import MovieList from './Components/Common/MovieList';

const titles = ["Breaking Bad","Narcos","Game of Thrones"];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title>Movies List</Title>
      </header>
        <MovieList titles={titles}/>
    </div>
  );
}

export default App;
