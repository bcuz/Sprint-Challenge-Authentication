import React from "react";
import axios from 'axios';

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  handleLogin = e => {
    e.preventDefault();
    axios
    .post("http://localhost:5001/api/login", this.state.credentials)
    .then(res => {
      
      localStorage.setItem("token", res.data.token);
    })
    .then(() => this.props.history.push("/api/jokes"))
    .catch(err => {
      console.log("login err: ", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
      }
    });
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        {/* {this.props.loginError && <p>Error on login, try again</p>} */}
        <form onSubmit={this.handleLogin}>
          <label htmlFor="">username</label>          
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <label htmlFor="">password</label>          
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>
            Log in
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
