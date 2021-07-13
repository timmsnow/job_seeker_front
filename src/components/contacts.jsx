import axios from "axios";
import React, { Component } from "react";
import ContactShow from "./contactShow";
import ContactCreate from "./contactCreate";
import { Button, Table, InputGroup, FormControl } from "react-bootstrap";

// import axios from "axios";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filtered: [],
      currentContact: {},
      userInfo: {},
      searchBar: "",
    };
    this.indexContacts();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let currentList = [];
    let newList = this.state.contacts;

    if (e.target.value !== "") {
      currentList = Object.values(this.state.contacts);

      newList = currentList.filter((contact) => {
        // console.log(contact.name.toLowerCase())
        // console.log(contact.toLowerCase());
        const nameLC = contact.name.toLowerCase();
        const jobLC = contact.job.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return nameLC.includes(filter) || jobLC.includes(filter);
      });
      // } else if (e.target.value === "") {
      //   newList = Object.values(this.state.contacts);
      // }
    } else {
      newList = Object.values(this.state.contacts);
      // return newList;
    }
    this.setState({ filtered: newList });
  }

  indexContacts = () => {
    axios.get("https://job-seeker5.herokuapp.com/api/users/" + localStorage.getItem("user_id")).then((res) => {
      this.setState({ contacts: res.data.contacts });
      this.setState({ filtered: res.data.contacts });
      this.setState({ userInfo: res.data });
      // console.log(res.data);
    });
  };
  resetFilter = () => {
    this.setState({ filtered: this.state.contacts });
    this.setState({ searchBar: "...Search" });
  };
  showContactModal = () => {
    this.setState({ showContactModal: true });
  };

  closeContactModal = () => {
    this.setState({ showContactModal: false });
  };

  setCurrentContact = (contact) => {
    this.setState({ currentContact: contact });
    console.log(contact);
  };

  showAddContactModal = () => {
    this.setState({ showAddContactModal: true });
  };

  closeAddContactModal = () => {
    this.setState({ showAddContactModal: false });
  };

  updateContactInfo = (contact) => {
    // let updatedContact = null;
    axios.patch("https://job-seeker5.herokuapp.com/api/contacts/" + contact.id, contact).then((res) => {
      console.log(res.data);
      // this.state.contacts.splice(this.state.contacts.indexOf(contact.id));
      const contactIndex = this.state.contacts.findIndex((o) => o.id === res.data.id);
      this.removeContactFromState(contactIndex);
      this.addContact(contact);
      this.resetFilter();
    });
  };

  removeContactFromState(contactIndex) {
    this.setState({ contacts: this.state.contacts.filter((_, i) => i !== contactIndex) });
    this.setState({ filtered: this.state.filtered.filter((_, i) => i !== contactIndex) });
  }

  createContact = (contact) => {
    const params = {
      name: contact.name,
      email: contact.email,
      user_id: localStorage.getItem("user_id"),
      job_id: contact.job,
      job_title: contact.job_title,
      linkedin_url: contact.linkedin_url,
      phone: contact.phone,
      date_contacted: contact.date_contacted,
    };

    // console.log(params)
    // console.log("starting post request for contact");
    // console.log(contact);
    axios.post("https://job-seeker5.herokuapp.com/api/contacts/", params).then((res) =>{
      console.log(res.data)
      this.closeAddContactModal()
      this.addContact(res.data)
    }).catch((error) => {
      console.log(error)
    });
  };

  addContact = (contact) => {
    this.setState((prevState) => ({ contacts: [contact, ...prevState.contacts] }));
    this.setState((prevState) => ({ filtered: [contact, ...prevState.filtered] }));
    // this.resetFilter()
    console.log(this.state.contacts);
    console.log("contact was added!!!");
  };

  render() {
    return (
      <div className="background">
        <div className="wrapper">
          <h1> My Contacts:</h1>
          <div className="add-and-search-contact">
            <span>
              <Button variant="success" onClick={() => this.showAddContactModal()}>
                Add Contact
              </Button>
            </span>
            <span>
              <InputGroup className="mb-3 contact-search-bar">
                <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder={this.state.searchBar}
                  onChange={this.handleChange}
                />
              </InputGroup>
              {/* <input type="text" placeholder={this.state.searchBar} onChange={this.handleChange} /> */}
            </span>
          </div>
          <div>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Company</th>
                  <th>More</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(this.state.filtered).map((contact, index) => (
                  <tr key={index}>
                    <td>{contact.name}</td>
                    <td>{contact.job_title} </td>
                    <td>{contact.job}</td>
                    <td>
                      <Button
                        variant="light"
                        onClick={() => {
                          this.setCurrentContact(contact);
                          this.showContactModal();
                        }}
                      >
                        ...
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {this.state.showContactModal ? (
            <ContactShow
              closeContactModal={this.closeContactModal}
              contact={this.state.currentContact}
              updateContactInfo={this.updateContactInfo}
            />
          ) : null}
          {this.state.showAddContactModal ? (
            <ContactCreate
              closeAddContactModal={this.closeAddContactModal}
              createContact={this.createContact}
              userInfo={this.state.userInfo}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Contacts;
