import React, { Component } from "react";
import JobShow from "./jobShow";
import { Button } from "react-bootstrap";

class JobBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJob: {},
      showModal: false,
      date: "2021-07-12 14:46:50.67408",
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  setCurrentJob = (job) => {
    this.setState({ currentJob: job }, function () {
      // console.log(job);
    });
  };

  triggerSave() {
    this.handleSave();
  }

  render() {
    return (
      <div>
        {this.props.jobData.map((job, index) => (
          <div key={index} className="center margin">
            {job.created_at >=  this.state.date && 
            <Button
              variant="light"
              onClick={() => {
                this.showModal();
                this.setCurrentJob(job);
              }}
            >
               <div> {job.company_name} - {job.position} </div> 
            </Button> }
            {this.state.showModal ? (
              <JobShow
                job={this.state.currentJob}
                deleteJob={this.props.deleteJob}
                updateJob={this.props.updateJob}
                closeModal={this.closeModal}
              />
            ) : null}
          </div>
        ))}
        <div></div>
      </div>
    );
  }
}
export default JobBoard;
