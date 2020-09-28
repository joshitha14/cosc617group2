import React from "react";
import Menu from './Menu';
import Header from "./header";
import Signup from "./signup";
import Login from "./login";


import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';


function App ()
{
  return(
    <Router>
    <div>
      <Menu/>
      <Header/>
      <Switch>
    <Route path ="/signup" component={Signup} />
    <Route path ="/login"  component={Login}/>
    </Switch>
    </div>
    </Router>
  );
}
export default App;