import React from 'react';
import './App.css';
import { Elm } from './elm/Main'
import ElmComponent from 'react-elm-components'

const App: React.FC = () => {
  return (
    <div className="App">
      <ElmComponent src={Elm} />
    </div>
  );
}

export default App;
