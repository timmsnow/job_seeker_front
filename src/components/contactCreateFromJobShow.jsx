import React, { Component } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";

class ContactCreate extends Component {
  state = {
    name: null,
    email: null,
    job_title: null,
    linkedin_url: null,
    phone: null,
    date_contacted: null,
    jobs: [],
    errors: [],
    default: "--Select a Job--",
  };

  componentDidMount() {
    // console.log(this.props.userInfo)
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  createContact = () => {
    const params = {
      name: this.state.name,
      email: this.state.email,
      user_id: localStorage.getItem("user_id"),
      job_id: this.props.jobId,
      job_title: this.state.job_title,
      linkedin_url: this.state.linkedin_url,
      phone: this.state.phone,
      date_contacted: this.state.date_contacted,
    };

    // console.log(params)
    // console.log("starting post request for contact");
    // console.log(contact);
    axios
      .post("https://job-seeker5.herokuapp.com/api/contacts/", params)
      .then((res) => {
        console.log(res.data);
        this.props.closeAddContactModal();
        this.props.addContact(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    // const jobOptions = (options) => {
    //   return options.map((job) => {
    //     return <option>{job.name}</option>;
    //   });
    // };
    return (
      <div className="modal-custom">
        <div className="modal-content">
          <Button className="close-modal-button" variant="light" onClick={this.props.closeAddContactModal}>
            X
          </Button>
          <div>
            <h5>Add A Contact</h5>
          </div>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Contact Name</InputGroup.Text>
              <FormControl name="name" type="text" aria-describedby="basic-addon3" onChange={this.handleChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Title/Position</InputGroup.Text>
              <FormControl name="job_title" type="text" aria-describedby="basic-addon3" onChange={this.handleChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Email</InputGroup.Text>
              <FormControl name="email" type="text" aria-describedby="basic-addon3" onChange={this.handleChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Phone</InputGroup.Text>
              <FormControl name="phone" type="text" aria-describedby="basic-addon3" onChange={this.handleChange} />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">LinkedIn URL</InputGroup.Text>
              <FormControl
                name="linkedin_url"
                type="text"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Last Contacted</InputGroup.Text>
              <FormControl
                name="date_contacted"
                type="date"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
          </div>
          <Button
            onClick={() => {
              this.createContact(this.state);
              // this.props.closeAddContactModal();
            }}
            variant="success"
          >
            Add Contact
          </Button>
        </div>
      </div>
    );
  }
}

export default ContactCreate;
