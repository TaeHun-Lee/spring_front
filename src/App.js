import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import SignSide from './SignSide';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={SignSide}/>
      <Route exact path="/SignIn" component={SignSide}/>
      <Route exact path="/SignUp" component={SignSide}/>
      <Route exact path="/Main" component={Main}/>
    </div>
  );
}

export default App;
