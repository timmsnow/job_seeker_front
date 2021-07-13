import axios from "axios";
import React, { Component } from "react";
import GoalSet from "./goalSet";
import { Form, Button } from "react-bootstrap";


// import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    showModal: false,
    userGoals: {
      apply: 0,
      info_interview: 0,
      white_boarding_minutes: 0,
      portfolio_minutes: 0,
      breaks: 0,
    }
  };

  handleReset = () => {
    document.getElementById("form").reset();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  createMetricInstance = () => {
    var params = {
        user_id: localStorage.getItem("user_id"),
        apply: 0,
        info_interview: 0,
        white_boarding_minutes: 0,
        portfolio_minutes: 0,
        breaks: 0,
    }
    axios.post("https://job-seeker5.herokuapp.com/api/metric_tables", params).then((response) => {
      localStorage.setItem("metric_row_id", response.data.id);
    })
  };

  setUserGoalsOnLogin = () =>  {
    this.setState({userGoals: {
      apply: null,
      info_interview: null,
      white_boarding_minutes: null,
      portfolio_minutes: null,
      breaks: null,
    }})

    this.showModal();
  }

  handleSubmit = (event) => {
    const userInfo = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("https://job-seeker5.herokuapp.com/api/sessions", userInfo)
      .then((response) => {
        console.log("Logging in...");
        axios.defaults.headers.common["Authorizaton"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        this.checkForUserGoals();
        this.createMetricInstance();
        // this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({ errors: "Invalid Email or Password" });
        this.handleReset();
        // this.setState.errors = ["Invalid email or Password"];
        // this.setState({email: ""});
        // this.setState.password = "";
      });
  };

  checkForUserGoals = () => {
    axios.get("https://job-seeker5.herokuapp.com/api/users/" + localStorage.getItem("user_id")).then((response) => {
      console.log(response.data)
      let currentUser = response.data;
      if (currentUser.user_goals === null) {
        this.setUserGoalsOnLogin();
      } else {
        this.props.history.push("/dashboard");
      }
      
    });
  }

  render() {
    return (
      <div className="center margin-top">
        <Form className="small" id="form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <p className="text-danger">{this.state.errors}</p>
          </div>
          <Form.Group>
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control type="text" className="input-label" name="email" id="email" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password:</Form.Label>
            <Form.Control type="password" className="input-label" name="password" id="password" onChange={this.handleChange} />
          </Form.Group>
          <div className="center">
          <Button onClick={this.handleSubmit}>Login</Button>
          </div>
        </Form>
        {this.state.showModal ?  <GoalSet userGoals={this.state.userGoals} closeModal={this.closeModal} checkForUserGoals={this.checkForUserGoals} history={this.props.history}/> : null}
      </div>
    );
  }
}

export default Login;
