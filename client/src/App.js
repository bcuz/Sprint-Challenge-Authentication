import React from 'react';
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
// import Register from "./components/Register";
// import PrivateRoute from "./components/PrivateRoute";
// import UsersList from "./components/UsersList";
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <div>
        {/* <button onClick={this.logout}>Log Out</button> */}
        <ul className='nav'>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
        </ul>
        {/* <Route path="/register" component={Register} /> */}
        <Route path="/login" component={Login} />
        {/* <PrivateRoute exact path="/users" component={UsersList} /> */}
        </div>
      </BrowserRouter>
  );
}

export default App;
