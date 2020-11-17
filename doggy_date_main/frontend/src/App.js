import React, {useContext} from "react";
import Menu from "./components/Menu";
import Header from "./components/header";
import Signup from "./components/signup";
import Login from "./components/login";
import Profile from "./components/profile";
import Meet from "./components/meet";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


const AppRoutes = () => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
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
      </Switch>
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
    <Menu/>
    <Header/>
  </div>
)
