import React from "react";
import Menu from './Menu';
import Header from "./header";
import Signup from "./signup";
import Login from "./login";
import profile from "./profile";
import Meet from "./meet";
import Matches from "./matches";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App ()
{
  return(
    <Router>
      <div>
        <Menu />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path ="/signup" component={Signup} />
          <Route path ="/login"  component={Login}/>
          <Route path="/profile" component={profile} />
          <Route path="/meet" component={Meet} />
          <Route path="/matches" component={Matches} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;

const Home =()=>(
  <div>
    <Header/>
  </div>
)
