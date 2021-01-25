import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import userService from '../../utils/userService';
import PageHeader from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import ScriptIndexPage from '../ScriptIndexPage/ScriptIndexPage';
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
                <ProfilePage user={user} isProfile={true} />
              </Route>
              <Route path="/scripts/all">
                <ScriptIndexPage /> 
              </Route>
              <Route exact path='/scripts/new'>
                <ScriptFormPage />
              </Route>
              <Route exact path="/scripts/:id">
                <ScriptDetailPage user={user}/>
              </Route>
              <Route exact path='/scripts/:id/edit'>
                <ScriptFormPage />
              </Route>
              <Route exact path='/author/:id'>
                <ProfilePage user={user} isProfile={false} />
              </Route>

            </Switch>

            :
            <Redirect to='/login' />
          }
      </Switch>
      <Footer />
    </div>
  );
}

export default App;