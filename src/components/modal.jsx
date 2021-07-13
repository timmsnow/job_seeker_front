import React, { Component } from 'react';
import axios from "axios";
import { Button } from "react-bootstrap";




class Modal extends Component {
    state = {
      showModal: false,
      userGoals: {},
      metrics: {},
      userGoalTitles: [
        "Submitted Applications:",
        "Informational Interview:",
        "White-boarding (minutes):",
        "Portfolio (minutes):",
        "Breaks From Computer:",
      ],
    }

    componentDidMount() {
      this.getUserGoals();
    }


  getUserGoals = () => {
    axios.get("https://job-seeker5.herokuapp.com/api/users/" + localStorage.getItem("user_id")).then((response) => {
      this.setState({ userGoals: response.data.user_goals });
      this.getUserMetrics();
    });
  };

  getUserMetrics = () => {
    axios.get("https://job-seeker5.herokuapp.com/api/metric_tables/day/" + localStorage.getItem("user_id")).then((response) => {       this.setState({ metrics: response.data[0] });
    // console.log(response.data[0]);
  })
  }

  render() {
    return <div className="modal-custom">
      <div className="modal-content">
        <h2 className="center">Did You Meet Your Goals?</h2>
        <div className="job-board margin padding">
        {Object.values(this.state.userGoals).map((goal, index) => (
              <div className="padding" key={index}>
                {this.state.userGoalTitles[index]} {Object.values(this.state.metrics)[index]} of: {goal}
              </div>
            ))}
        </div>
        <div className="center">
      <Button onClick={ this.props.closeModal }> Close Modal </Button>
      </div>
    </div>
    </div>
  }
}
export default Modal;