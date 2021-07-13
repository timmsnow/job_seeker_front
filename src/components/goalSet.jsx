import React, { Component } from "react";
import axios from "axios";
import { InputGroup, FormControl, Button } from "react-bootstrap";

class GoalSet extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   user_goals: {
  //   //     apply: 0,
  //   //     info_interview: 0,
  //   //     white_boarding_minutes: 0,
  //   //     portfolio_minutes: 0,
  //   //     breaks: 0,
  //   //   },
  //   };
  // }

  state = {
    user_goals: {
      apply: 0,
      info_interview: 0,
      white_boarding_minutes: 0,
      portfolio_minutes: 0,
      breaks: 0,
    }
  };

  componentDidMount = () => {
    this.setState({
      apply: this.props.userGoals.apply,
      info_interview: this.props.userGoals.info_interview,
      white_boarding_minutes: this.props.userGoals.white_boarding_minutes,
      portfolio_minutes: this.props.userGoals.portfolio_minutes,
      breaks: this.props.userGoals.breaks,
    })
  }
  // handleChange = (event) => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: parseInt(value),
  //   });
  // };

  handleChange = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  };

  saveGoals = () => {
    const userGoals = {
      apply: this.state.apply,
      info_interview: this.state.info_interview,
      white_boarding_minutes: this.state.white_boarding_minutes,
      portfolio_minutes: this.state.portfolio_minutes,
      breaks: this.state.breaks,
    };
    let currentUserId = localStorage.getItem("user_id");
    axios.patch("https://job-seeker5.herokuapp.com//api/users/" + currentUserId, userGoals).then((res) => {
      console.log(res.data);
      this.props.closeModal();
      this.props.history.push("/dashboard");
    });
    if (this.props.updateUserGoals) {
      this.props.updateUserGoals();
    }
  };

  // modalClose = () => {
  //   if (this.props.closeModal) {
  //     this.props.closeModal();
  //   } else {
  //     this.props.closeGoalsModal();
  //   }

  // }

  render() {
    return (
      <div className="modal-custom">
        <div className="modal-content">
          <Button className="close-modal-button" variant="light" onClick={this.props.closeModal}>
            X
          </Button>
          <h5 className="center">Your Daily Goals</h5>
          <div onSubmit={(e) => e.preventDefault()}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Submitted Applications</InputGroup.Text>
              <FormControl
                defaultValue={this.props.userGoals.apply}
                name="apply"
                type="number"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Informational Interviews</InputGroup.Text>
              <FormControl
                defaultValue={this.props.userGoals.info_interview}
                name="info_interview"
                type="number"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">White Boarding (minutes)</InputGroup.Text>
              <FormControl
                defaultValue={this.props.userGoals.white_boarding_minutes}
                name="white_boarding_minutes"
                type="number"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Portfolio Building (minutes)</InputGroup.Text>
              <FormControl
                defaultValue={this.props.userGoals.portfolio_minutes}
                name="portfolio_minutes"
                type="number"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">15-Minute Breaks</InputGroup.Text>
              <FormControl
                defaultValue={this.props.userGoals.breaks}
                name="breaks"
                type="number"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
            <br />
            <div className="center">
              <Button variant="success" onClick={this.saveGoals}>
                Save Changes
              </Button>
            </div>
            <div>
              {/* <ul className="text-danger">
            {this.state.errors.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoalSet;
