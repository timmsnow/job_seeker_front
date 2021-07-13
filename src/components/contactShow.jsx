import React, { Component } from "react";
import {Button, InputGroup, FormControl} from "react-bootstrap";


class ContactShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.contact.id,
      name: this.props.contact.name,
      email: this.props.contact.email,
      job: this.props.contact.job,
      job_title: this.props.contact.job_title,
      linkedin_url: this.props.contact.linkedin_url,
      phone: this.props.contact.phone,
      date_contacted: this.props.contact.date_contacted,
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="modal-custom">
        <div className="modal-content">
        {/* <div className="modal-header"> */}
        <Button variant="light" className="close-modal-button" onClick={this.props.closeContactModal}>
              X
            </Button>
        {/* </div> */}
        <h5>{this.props.contact.name} - {this.props.contact.job}</h5>
          <form onSubmit={(e) => e.preventDefault()}>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Contact Name</InputGroup.Text>
              <FormControl
                name="name"
                type="text"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
                defaultValue={this.props.contact.name}
              />
            </InputGroup>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Title/Position</InputGroup.Text>
              <FormControl
                name="job_title"
                type="text"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
                defaultValue={this.props.contact.job_title}
              />
            </InputGroup>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Email</InputGroup.Text>
              <FormControl
                name="email"
                type="text"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
                defaultValue={this.props.contact.email}
              />
            </InputGroup>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Phone</InputGroup.Text>
              <FormControl
                name="phone"
                type="text"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
                defaultValue={this.props.contact.phone}
              />
            </InputGroup>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">LinkedIn URL</InputGroup.Text>
              <FormControl
                name="linkedin_url"
                type="text"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
                defaultValue={this.props.contact.linkedin_url}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Last Contacted</InputGroup.Text>
              <FormControl
                name="date_contacted"
                type="date"
                aria-describedby="basic-addon3"
                defaultValue={this.props.contact.date_contacted}
                onChange={this.handleChange}
              />
            </InputGroup>
            
            <br />
            <div className="center">
              <Button 
              variant = "success"
                onClick={() => {
                  this.props.updateContactInfo(this.state);
                  this.props.closeContactModal();
                }}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ContactShow;
