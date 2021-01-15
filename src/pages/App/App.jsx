import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import userService from '../../utils/userService';


function App() {
  const [user, setUser] = useState(userService.getUser());
  
  function handleSignUpOrLogin(){
    setUser(userService.getUser());
  }

  return (
    <div className="App">
      <Switch>
          <Route exact path="/">
              <HomePage />
          </Route>
          <Route exact path="/login" handleSignUpOrLogin={handleSignUpOrLogin}>
             <LoginPage />
          </Route>
          <Route exact path="/signup" handleSignUpOrLogin={handleSignUpOrLogin}>
             <SignupPage />
          </Route>
          {/* Pages that require login */}
          userService.getUser() ?
          <>
          Routes to go here
          </>
          :
          <Redirect to='/login' />
      </Switch>
    </div>
  );
}

export default App;