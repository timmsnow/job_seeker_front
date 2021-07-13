import React, { Component } from "react";
import axios from "axios";
import Metric from "./metric";
import JobBoard from "./jobBoard";
import JobCreate from "./jobCreate";
import GoalSet from "./goalSet";
import BreakCounter from "./breakCounter";
import { Form, Card, Button, Container, Row, Col } from "react-bootstrap";
import PortfolioCounter from "./portfolioCounter";
import WhiteBoardingCounter from "./whiteBoardingCounter";

// import Modal from "./modal";

// import Modal from "./modal";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: "",
      jobs: [],
      appliedJobs: [],
      statuses: ["Saved", "Draft", "Applied", "In Contact", "Interviewing", "Offered", "Denied"],
      userGoals: {
        apply: 0,
        info_interview: 0,
        white_boarding_minutes: 0,
        portfolio_minutes: 0,
        breaks: 0,
      },
      userGoalTitles: [
        "Submitted Applications:",
        "Informational Interview:",
        "White-boarding (minutes):",
        "Portfolio (minutes):",
        "Breaks:",
      ],
      showGoalsModal: false,
      showLogoutModal: false,
      metrics: {
        apply: 0,
        info_interview: 0,
        white_boarding_minutes: 0,
        portfolio_minutes: 0,
        breaks: 0,
      },
      mssg: "",

      // currentJob: {},
    };
  }

  maxDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    this.setState({ today: today });
    // console.log(this.state.date_updated)
  };

  // setDashCurrentJob = (job) => {
  //   console.log(job)
  //   this.setState({currentJob: job}, function() {

  //     this.consoleLogCurrentJob()
  //   })
  // }

  // consoleLogCurrentJob = () => {
  //   console.log("I AM THE DASH CURRENT JOB");

  //   console.log(this.state.currentJob)
  // }

  componentDidMount() {
    this.getUserJobsAndGoals();
    this.maxDate();
  }

  getUserJobsAndGoals = () => {
    axios.get("https://job-seeker5.herokuapp.com//api/users/" + localStorage.getItem("user_id")).then((response) => {
      this.setState({ jobs: response.data.jobs });
      this.setState({ userGoals: response.data.user_goals });
      this.getUserMetrics();
      let appliedJobs = this.state.jobs.filter(job => job.status === ("Applied"))
      console.log(appliedJobs);
      // response.data.jobs.forEach(function(job){
      //   if (job.status === "Applied") {
      //     appliedJobs.push(job.id)
      //   }
      // });
      this.setState({ appliedJobs: appliedJobs});
      console.log(this.state.appliedJobs);

      // console.log(this.state.appliedJobs)
      // console.log(response.data.user_goals);
      // console.log(this.state.jobs);
    });
  };

  getUserMetrics = () => {
    axios.get("https://job-seeker5.herokuapp.com//api/metric_tables/day/" + localStorage.getItem("user_id")).then((response) => {
      if (response.data.length === 0) {
      } else {
        var oldId = response.data[0].id;
        console.log(response.data[0].id);

        var apply = [];
        var breaks = [];
        var info_interview = [];
        var white_boarding_minutes = [];
        var portfolio_minutes = [];
        response.data.forEach((instance) => {
          apply.push(instance.apply);
          info_interview.push(instance.info_interview);
          white_boarding_minutes.push(instance.white_boarding_minutes);
          portfolio_minutes.push(instance.portfolio_minutes);
          breaks.push(instance.breaks);
        });
        for (
          var apply_counter = 0,
            breaks_counter = 0,
            info_interview_counter = 0,
            white_boarding_minutes_counter = 0,
            portfolio_minutes_counter = 0,
            index = 0;
          index < apply.length;
          index++
        ) {
          apply_counter += apply[index];
          info_interview_counter += info_interview[index];
          white_boarding_minutes_counter += white_boarding_minutes[index];
          portfolio_minutes_counter += portfolio_minutes[index];
          breaks_counter += breaks[index];
        }
        // console.log(apply);
        // console.log(apply_counter);
        // console.log(breaks);
        // console.log(info_interview);
        // console.log(white_boarding_minutes);
        // console.log(portfolio_minutes);

        this.setState({
          metrics: {
            apply: apply_counter,
            info_interview: info_interview_counter,
            white_boarding_minutes: white_boarding_minutes_counter,
            portfolio_minutes: portfolio_minutes_counter,
            breaks: breaks_counter,
          },
        });
        if (response.data.length === 2) {
          axios
            .delete("https://job-seeker5.herokuapp.com//api/metric_tables/" + oldId)
            .then(console.log("deleted old metric and set state of new metric successfully"));
        }
      }
    });
  };

  handleAddJob = (job) => {
    this.setState((state) => ({ jobs: [...state.jobs, job] }));
        let applied = this.state.appliedJobs.map(job => job.id);
        console.log(applied)
    if (job.status === "Applied" && !applied.includes(job.id)) {
      this.handleMetricIncrement(Object.keys(this.state.metrics)[0], 0);
      // console.log(this.state.appliedJobs);
      
    }
    // console.log(applied)

    // this.setState((state) => ({appliedJobs: [...state.appliedJobs, job]}))
  };

  handleUpdateJob = (job, job_id) => {
    // this.state.jobs.splice(this.state.jobs.indexOf(job_id), 1);
    let appliedJobs = this.state.jobs.filter(job => job.status === ("Applied"))
    var jobIndex = this.state.jobs.findIndex((o) => o.id === job_id);
    this.removeJobFromState(jobIndex);
    this.setState({appliedJobs: appliedJobs},
      function () {
      let applied = this.state.appliedJobs.map(job => job.id);
      console.log(applied);

  if ((job.status === "Saved" || job.status === "Draft") && applied.includes(job.id)) {
      this.handleMetricDecrement(Object.keys(this.state.metrics)[0], 0);
      // this.setState((state) => ({appliedJobs: [...state.appliedJobs, job]}))
      console.log(applied);
    }
    console.log(this.state.appliedJobs);
    this.handleAddJob(job);
  });
  };

  handleDestroyJob = (response) => {
    // var job_id = this.props.job.id
    axios.delete("https://job-seeker5.herokuapp.com//api/jobs/" + response).then((res) => {
      console.log(res.data);
      this.state.jobs.splice(this.state.jobs.indexOf(response), 1);
      // this.closeModal();
    });

    // console.log(this.state.jobs)
    var jobIndex = this.state.jobs.findIndex((o) => o.id === response);
    // console.log(jobIndex)
    this.removeJobFromState(jobIndex);
  };

  removeJobFromState(index) {
    this.setState({
      jobs: this.state.jobs.filter((_, i) => i !== index),
    });
  }
  jobDataFilter = (status) => {
    // console.log(Object.values(status)[0])
    return this.state.jobs.filter((job) => job.status === Object.values(status)[0]);
  };

  updateUserGoals = () => {
    axios.get("https://job-seeker5.herokuapp.com//api/users/" + localStorage.getItem("user_id")).then((res) => {
      this.setState({ userGoals: res.data.user_goals });
    });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  showGoalsModal = () => {
    this.setState({ showGoalsModal: true });
  };

  closeGoalsModal = () => {
    this.setState({ showGoalsModal: false });
  };

  handleMetricIncrement = (key, value) => {
    // console.log(key);
    // console.log(value);
    this.setState(
      (prevState) => {
        let metrics = Object.assign({}, prevState.metrics);
        metrics[key] += 1;
        return { metrics };
      },
      function () {
        console.log(this.state.metrics);
        this.updateMetrics();
      }
    );
  };

  handlePortfolioIncrement = (key, value, minute, second) => {
    // console.log(key);
    // console.log(second);
    if (minute > 0 && second % 60 === 0) {
      // console.log(minute);

      this.setState(
        (prevState) => {
          let metrics = Object.assign({}, prevState.metrics);
          metrics[key] += 1;
          return { metrics };
        },
        function () {
          // console.log(this.state.metrics);
          this.updateMetrics();
        }
      );
    }
  };

  handleMetricDecrement = (key, value) => {
    // console.log(key);
    // console.log(value);
    this.setState(
      (prevState) => {
        let metrics = Object.assign({}, prevState.metrics);
        metrics[key] -= 1;
        return { metrics };
      },
      function () {
        console.log(this.state.metrics);
        this.updateMetrics();
      }
    );
  };

  updateMetrics = () => {
    var params = {
      apply: this.state.metrics.apply,
      info_interview: this.state.metrics.info_interview,
      white_boarding_minutes: this.state.metrics.white_boarding_minutes,
      portfolio_minutes: this.state.metrics.portfolio_minutes,
      breaks: this.state.metrics.breaks,
    };
    axios
      .patch("https://job-seeker5.herokuapp.com//api/metric_tables/" + localStorage.getItem("metric_row_id"), params)
      .then((response) => {
        console.log(response);
      });
  };

  render() {
    return (
      <div>
        <Form />
        {/* <div className="margin-top"> */}
        <div className="background padding-bottom">
          <Container fluid>
            <Row className="center">
            {Object.values(this.state.userGoals).map((goal, index) => (
              <Col xs={5} md={3} lg={2} className="margin-top gap" key={index}>
                <Card style={{ width: '12rem' }} className="shadow">
                <Card.Title className="text-center bold">{this.state.userGoalTitles[index]}</Card.Title>
                  <Metric
                    keys={Object.keys(this.state.metrics)[index]}
                    values={Object.values(this.state.metrics)[index]}
                    increment={this.handleMetricIncrement}
                    decrement={this.handleMetricDecrement}
                    goal={goal}
                    metrics={this.state.metrics[index]}
                  />

                {this.state.userGoalTitles[index] === "Portfolio (minutes):" && (
                  <PortfolioCounter
                  keys={Object.keys(this.state.metrics)[3]}
                  values={Object.values(this.state.metrics)[3]}
                  increment={this.handlePortfolioIncrement}
                  />
                  )}
                {this.state.userGoalTitles[index] === "White-boarding (minutes):" && (
                  <WhiteBoardingCounter
                  keys={Object.keys(this.state.metrics)[2]}
                  values={Object.values(this.state.metrics)[2]}
                  increment={this.handlePortfolioIncrement}
                  />
                  )}
                {this.state.userGoalTitles[index] === "Breaks:" && (
                  <BreakCounter
                  keys={Object.keys(this.state.metrics)[4]}
                  values={Object.values(this.state.metrics)[4]}
                  increment={this.handleMetricIncrement}
                  />
                  )}
                  </Card>
                </Col>
            ))}
            </Row>
          </Container>
          </div>
            {/* </div> */}
                <div className="center margin">
          <Button className="shadow" onClick={this.showModal}>Add a Job</Button>
              <Button className="shadow" size="sm" variant="warning" onClick={this.showGoalsModal}>
                Edit Goals
              </Button>
          {this.state.showModal ? (
            <JobCreate today={this.state.today} handleAddJob={this.handleAddJob} closeModal={this.closeModal} />
            ) : null}
        </div>
          {this.state.showGoalsModal ? (
            <GoalSet
              updateUserGoals={this.updateUserGoals}
              history={this.props.history}
              closeModal={this.closeGoalsModal}
              closeGoalsModal={this.closeGoalsModal}
              userGoals={this.state.userGoals}
            />
          ) : null}
        <Container fluid className="background-two">
        <Row className="padding">
          {this.state.statuses.map((status, index) => {
            return (
              <Col sm="4" key={index}>
                {/* <JobBoard jobData={this.jobStatusFilter()} /> */}
                {/* <h2>{status}</h2> */}

                <div>
                  <Card className="margin-top margin-bottom shadow">
                    <Card.Header as="h5">{status}</Card.Header>
                    <Card.Body>
                      {/* <App/> */}
                      <JobBoard
                        jobData={this.jobDataFilter({ status })}
                        deleteJob={this.handleDestroyJob}
                        updateJob={this.handleUpdateJob}
                      />
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
        </Container>
        {/* <div>{this.state.showLogoutModal ? <Modal getUserMetrics={this.getUserMetrics}/> : null} */}
        {/* </div> */}
      </div>
    );
  }
}

export default Dashboard;
