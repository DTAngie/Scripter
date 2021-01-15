import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';


function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/">
              <HomePage />
          </Route>
          <Route exact path="/login">
             <LoginPage />
          </Route>
          <Route exact path="/signup">
             <SignupPage />
          </Route>
      </Switch>
    </div>
  );
}

export default App;