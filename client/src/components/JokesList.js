import React, { Component } from 'react';
import axios from "axios";

class JokesList extends Component {
  state = {
    jokes: []
  }

  componentDidMount() {
    axios
  .get("http://localhost:5001/api/jokes", {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {      
      this.setState({jokes: res.data })
    })
    .catch(err => console.log(err));
    
  }

  render() {
    return (
      <div>      

        <ul>{this.state.jokes.map(joke => <li key={joke.id}>{joke.joke}</li> )}</ul>

      </div>
    );
  }
}

export default JokesList