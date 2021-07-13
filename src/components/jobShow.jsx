import axios from "axios";
import React, { Component } from "react";
import ContactShow from "./contactShow";
import { Button, InputGroup, Form, FormControl } from "react-bootstrap";
import ContactCreate from "./contactCreateFromJobShow";

// import axios from 'axios';

class JobShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.job.id,
      company_name: this.props.job.company_name,
      position: this.props.job.position,
      salary: this.props.job.salary,
      posting_url: this.props.job.posting_url,
      notes: this.props.job.notes,
      status: this.props.job.status,
      description: this.props.job.description,
      date_updated: this.props.job.date_updated,
      contacts: [],
      currentContact: {},
      showContactModal: false,
    };
  }

  componentDidMount() {
    this.getJobContacts();
  }

  showCurrentJob = () => {
    // console.log(this.props.job);
  };
  onTrigger = (job, job_id) => {
    this.props.updateJob(job, job_id);
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSave = (event) => {
    const job = {
      id: this.state.id,
      company_name: this.state.company_name,
      position: this.state.position,
      salary: this.state.salary,
      posting_url: this.state.posting_url,
      notes: this.state.notes,
      status: this.state.status,
      description: this.state.description,
      date_updated: this.state.date_updated,
    };
    // console.log(this.props.job.id);
    axios.patch("https://job-seeker5.herokuapp.com/api/jobs/" + this.state.id, job).then((res) => {
      // console.log(res.data);
      // console.log(this.props.job.id)
      // this.props.setState.job(job)
      // this.props.updateCurrentJob(job)
      // this.props.closeModal();
      this.onTrigger(job, job.id);
    });
  };

  getJobContacts = () => {
    axios.get("https://job-seeker5.herokuapp.com/api/jobs/" + this.state.id).then((res) => {
      if (res.data.contacts.length === 0) {
      } else {
        this.setState({ contacts: res.data.contacts });
        console.log(this.state.contacts);
      }
    });
  };

  setCurrentContact = (contact) => {
    this.setState({ currentContact: contact });
    console.log(contact);
  };

  showContactModal = () => {
    this.setState({ showContactModal: true });
  };

  closeContactModal = () => {
    this.setState({ showContactModal: false });
  };

  updateContactInfo = (contact) => {
    // let updatedContact = null;
    axios.patch("https://job-seeker5.herokuapp.com/api/contacts/" + contact.id, contact).then((res) => {
      console.log(res.data);
      // this.state.contacts.splice(this.state.contacts.indexOf(contact.id));
      const contactIndex = this.state.contacts.findIndex((o) => o.id === res.data.id);
      this.removeContactFromState(contactIndex);
      this.addContact(contact);
    });
  };

  removeContactFromState(contactIndex) {
    this.setState({ contacts: this.state.contacts.filter((_, i) => i !== contactIndex) });
  }

  addContact = (contact) => {
    this.setState((prevState) => ({ contacts: [contact, ...prevState.contacts] }));
    // this.resetFilter()
    console.log(this.state.contacts);
  };

  showAddContactModal = () => {
    this.setState({ showAddContactModal: true });
  };

  closeAddContactModal = () => {
    this.setState({ showAddContactModal: false });
  };
  render() {
    // var contactList = this.state.contacts.map((contact) => <div>{contact.name}</div>);

    return (
      <div className="modal-custom">
        <div className="modal-content">
          {/* <div className="modal-header"> */}
          <Button variant="light" className="close-modal-button" onClick={this.props.closeModal}>
            X
          </Button>
          {/* </div> */}
          <h5>
            {this.props.job.company_name} - {this.props.job.position}
          </h5>
          <div onSubmit={(e) => e.preventDefault()}>
            {/* <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label> */}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Company</InputGroup.Text>
              <FormControl
                name="company_name"
                type="text"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
                defaultValue={this.props.job.company_name}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Position</InputGroup.Text>
              <FormControl
                name="position"
                type="text"
                aria-describedby="basic-addon3"
                defaultValue={this.props.job.position}
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Description</InputGroup.Text>
              <FormControl
                name="description"
                type="text"
                aria-describedby="basic-addon3"
                defaultValue={this.props.job.description}
                as="textarea"
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Salary</InputGroup.Text>
              <FormControl
                name="salary"
                type="number"
                aria-describedby="basic-addon3"
                defaultValue={this.props.job.salary}
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">URL</InputGroup.Text>
              <FormControl
                name="posting_url"
                type="text"
                aria-describedby="basic-addon3"
                defaultValue={this.props.job.posting_url}
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Notes</InputGroup.Text>
              <FormControl
                name="notes"
                type="text"
                aria-describedby="basic-addon3"
                as="textarea"
                defaultValue={this.props.job.notes}
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Last Contacted</InputGroup.Text>
              <FormControl
                name="date_updated"
                type="date"
                aria-describedby="basic-addon3"
                defaultValue={this.props.job.date_updated}
                onChange={this.handleChange}
              />
            </InputGroup>
            <label htmlFor="status">Status:</label>
            <Form.Group>
              <Form.Control
                as="select"
                id="status"
                name="status"
                defaultValue={this.props.job.status}
                title={this.props.job.status}
                onChange={this.handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Saved">Saved</option>
                <option value="Draft">Draft</option>
                <option value="In Contact">In Contact</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
                <option value="Denied">Denied</option>
              </Form.Control>
            </Form.Group>
            <br />
            <div>
              <div>
                <label>Contacts:</label>
              </div>
              <div>
                <Button
                  variant="success"
                  onClick={() => {
                    this.showAddContactModal();
                  }}
                >
                  Add Contact
                </Button>
              </div>
              <div>
                {this.state.showAddContactModal ? (
                  <ContactCreate
                    closeAddContactModal={this.closeAddContactModal}
                    jobId={this.props.job.id}
                    addContact={this.addContact}
                    // createContact={this.createContact}
                    // userInfo={this.state.userInfo}

                  />
                ) : null}
              </div>
              <div>
                {this.state.contacts.map((contact, index) => {
                  return (
                    <div key={index} className="contact_button_area">
                      <Button
                        className="contact_button"
                        variant="light"
                        onClick={() => {
                          this.setCurrentContact(contact);
                          this.showContactModal();
                        }}
                      >
                        {contact.name}
                      </Button>
                      {this.state.showContactModal ? (
                        <ContactShow
                          closeContactModal={this.closeContactModal}
                          contact={this.state.currentContact}
                          updateContactInfo={this.updateContactInfo}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
              {/* <div>
                {Object.values(this.state.contacts).map((contact, index) => {
                  return (
                    <div key={index} className="contact_buttons_area">
                      <Button
                        onClick={() => {
                          this.setCurrentContact(contact);
                          this.showContactModal();
                        }}
                        className="contact_button center"
                        variant="light"
                      >
                        {contact.name} - {contact.job_title}
                      </Button>
                      {this.state.showContactModal ? (
                        <ContactShow
                          closeContactModal={this.closeContactModal}
                          contact={this.state.currentContact}
                          updateContactInfo={this.updateContactInfo}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div> */}
              <br />
              <div className="center">
                <Button
                  variant="success"
                  onClick={() => {
                    this.handleSave();
                    this.props.closeModal();
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this job?"))
                      this.props.deleteJob(this.state.id);
                    // this.props.closeModal();
                  }}
                >
                  Delete Job
                </Button>
              </div>
              {/* {this.state.showContactModal ? (
          <ContactShow
            closeContactModal={this.closeContactModal}
            contact={this.state.currentContact}
            updateContactInfo={this.updateContactInfo}
          />
        ) : null} */}
            </div>
          </div>
          {/* <ContactShowInJob
      //     closeContactModalViaJobShow={this.closeContactModalViaJobShow}
      //     contact={this.state.currentContact}
      //     updateContactInfo={this.updateContactInfo}
      //   /> */}
        </div>
      </div>
    );
  }
}

export default JobShow;
