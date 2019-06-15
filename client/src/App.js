import React, { Component } from 'react';
import { Route, NavLink, withRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import JokesList from "./components/JokesList";
import './App.css';

class App extends Component {

  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login")
  }

  render() {
 
  return (
        <div>
        <button onClick={this.logout}>Log Out</button>
        <ul className='nav'>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/api/jokes">Jokes</NavLink>
          </li>
        </ul>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/api/jokes" component={JokesList} />
        </div>
  );
  }
}

export default withRouter(App);
