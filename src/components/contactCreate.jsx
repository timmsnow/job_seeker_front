import React, { Component } from "react";
import { Button, InputGroup, FormControl, Form } from "react-bootstrap";

class ContactCreate extends Component {
  state = {
    name: null,
    email: null,
    job: null,
    job_title: null,
    linkedin_url: null,
    phone: null,
    date_contacted: null,
    jobs: [],
    errors: [],
    default: "--Select a Job--"

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
  check

  render() {

    // const jobOptions = (options) => {
    //   return options.map((job) => {
    //     return <option>{job.name}</option>
    //   })
    // }
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

            <Form.Group>
          
              <Form.Control as="select" id="job" name="job" defaultValue={this.state.default} onChange={this.handleChange}>
                <option hidden>--Select a Job--</option>
                {this.props.userInfo.jobs.map((job, id) => (
                  <option key={id} value={job.id}>
                    {job.company_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
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
              this.props.createContact(this.state);
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
