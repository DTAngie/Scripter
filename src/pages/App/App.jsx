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

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  return (
    <div className="App">
      <Switch>
          <Route exact path="/login">
             <LoginPage user={user} handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/signup" >
             <SignupPage user={user} handleSignUpOrLogin={handleSignUpOrLogin} />
          </Route>
          {/* Pages that require login */}
          {userService.getUser() ?
            <>
              <Route exact path="/">
                  <HomePage user={user} handleLogout={handleLogout}/>
              </Route>
            Routes to go here
            </>
            :
            <Redirect to='/login' />
          }
      </Switch>
    </div>
  );
}

export default App;