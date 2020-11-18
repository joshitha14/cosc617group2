import React, {useContext} from "react";
import Menu from './Menu';
import Header from "./header";
import Signup from "./signup";
import Login from "./login";
import Profile from "./profile";
import Meet from "./meet";
import Matches from "./matches";
import {AuthContext, AuthProvider} from "./AuthContext";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

const AppRoutes = () => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <div>
      <Menu />
      <Switch>
          <Route path="/" exact 
            render={() => !isAuthenticated() ? (<Home />) : (<Redirect to="/meet" />)}>
          </Route>
          <Route path ="/signup" component={Signup} />
          <Route path ="/login"  component={Login}/>
          <Route path="/profile" component={Profile} />
          <Route path="/meet" 
            render={() => isAuthenticated() ? (<Meet />) : (<Redirect to="/" />)}>
          </Route>
              <Route path="/matches" component={Matches} />
      </Switch>
    </div>
  );
}

function App ()
{
  return(
    <Router>
      <AuthProvider>
      <AppRoutes />
      </AuthProvider>
    </Router>
  );
}


export default App;

const Home =()=>(
  <div>
    <Header/>
  </div>
)
