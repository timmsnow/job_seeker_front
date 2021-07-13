import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";


class Home extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: [],
  };

  handleReset = () => {
    document.getElementById("form").reset();
  };

  getUsers = () => {
    axios.get("https://job-seeker5.herokuapp.com/api/users").then((response) => {
      console.log(response.data);
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const user = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };
    axios
      .post("https://job-seeker5.herokuapp.com/api/users", user)
      .then((res) => {
        console.log(res.data);
        // this.handleLogin(); erroneous????
        this.props.history.push("/login");
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        this.setState({ errors: error.response.data.errors });
        this.handleReset();
        // this.setState.errors = ["Invalid email or Password"];
        // this.setState({email: ""});
        // this.setState.password = "";
      });
  };

  render() {
    return (
      <div className="signup-form margin-top">
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className="text-danger">
          <ul>
            {this.state.errors.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <Form id="form" onSubmit={(e) => e.preventDefault()}>
          <div className="row margin-top">
            <label className="column" htmlFor="username">
              Username
            </label>
            <input className="column" type="text" name="username" id="username" onChange={this.handleChange} />
          </div>

          <div className="row margin-top">
            <label className="column" htmlFor="email">
              Email
            </label>
            <input className="column" type="text" name="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="row margin-top">
            <label className="column" htmlFor="password">
              Password
            </label>
            <input className="column" autoComplete="new-password" type="password" name="password" id="password" onChange={this.handleChange} />
          </div>

          <div className="row margin-top">
            <label className="column" htmlFor="password_confirmation">
              Password Confirmation
            </label>
            <input
              className="column"
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              onChange={this.handleChange}
            />
          </div>
          <div className="center margin-top">
            {" "}
            <Button onClick={this.handleSubmit}>Create Account</Button>
          </div>
        </Form>
        {/* <button onClick={this.getUsers}>Get Me</button> */}
      </div>
    );
  }
}

export default Home;
