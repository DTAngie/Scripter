import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import userService from '../../utils/userService';
import PageHeader from '../../components/Header/Header';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import ProfilePage from '../ProfilePage/ProfilePage';
import ScriptDetailPage from '../ScriptDetailPage/ScriptDetailPage';
import ScriptFormPage from '../ScriptFormPage/ScriptFormPage';


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
      <PageHeader user={user ? user.username : false} handleLogout={handleLogout} />      
      <Switch>
          <Route exact path="/login">
             <LoginPage user={user} handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/signup" >
             <SignupPage user={user} handleSignUpOrLogin={handleSignUpOrLogin} />
          </Route>
          <Route exact path="/">
              <HomePage user={user} handleLogout={handleLogout}/>
          </Route>
          {/* Pages that require login */}
          {userService.getUser() ?
            
            <Switch>
              <Route path="/dashboard">
              {/* TODO: Maybe rename dashboard page to profile page? for reusability? */}
                <ProfilePage user={user} isProfile={true} handleLogout={handleLogout}/>
              </Route>
              <Route exact path='/script/new'>
                <ScriptFormPage formType={'create'}/>
                {/* //the edit form should have 'edit' in the props */}
                {/* check to make sure that if formtype prop is actually needed */}
              </Route>
              <Route exact path="/script/:id">
                <ScriptDetailPage />
              </Route>
              <Route exact path='/script/:id/edit'>
                <ScriptFormPage formType={'edit'} />
              </Route>

            </Switch>

            :
            <Redirect to='/login' />
          }
      </Switch>
    </div>
  );
}

export default App;