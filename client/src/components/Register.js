import React from "react";
import axios from 'axios';

class Register extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
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

  handleRegister = e => {
    e.preventDefault();
    axios
    .post("http://localhost:5001/api/register", this.state.credentials)
    .then(res => {      
      
      localStorage.setItem("token", res.data.token);
    })
    .then(() => this.props.history.push("/api/jokes"))
    .catch(err => {
      console.log("login err: ", err);
    });
  };

  render() {
    return (
      <div>
        {/* {this.props.loginError && <p>Error on login, try again</p>} */}
        <h2>Register</h2>
        <form onSubmit={this.handleRegister}>
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
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
