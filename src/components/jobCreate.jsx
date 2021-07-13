import React, { Component } from "react";
import axios from "axios";
import { InputGroup, FormControl, Button,Form } from "react-bootstrap";

class JobCreate extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    id: null,
    company_name: "",
    position: "",
    salary: null,
    posting_url: "",
    notes: "",
    status: "Applied",
    description: "",
    user_id: localStorage.getItem("user_id"),
    showModal: false,
    errors: [],
    date_updated: this.props.today,
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

  onTrigger = (job) => {
    this.props.handleAddJob(job);
    // event.preventDefault();
  };

  handleSubmit = (event) => {
    const job = {
      id: this.state.id,
      user_id: this.state.user_id,
      company_name: this.state.company_name,
      description: this.state.description,
      position: this.state.position,
      salary: this.state.salary,
      posting_url: this.state.posting_url,
      notes: this.state.notes,
      status: this.state.status,
      date_updated: this.state.date_updated,
    };
    axios
      .post("https://job-seeker5.herokuapp.com/api/jobs", job)
      .then((res) => {
        console.log(res.data);
        this.props.closeModal();
        this.onTrigger(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        // this.setState({ errors: error.response });
        // this.handleReset();
        // this.setState.errors = ["Invalid email or Password"];
        // this.setState({email: ""});
        // this.setState.password = "";
      });
  };

  // maxDate = () => {
  //   var today = new Date();
  //   var dd = String(today.getDate()).padStart(2, "0");
  //   var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  //   var yyyy = today.getFullYear();
  //   today = `${yyyy}-${mm}-${dd}`;
  //   this.setState({date_updated: today})
  //   // console.log(this.state.date_updated)
  // };


  render() {
    return (
      <div className="modal-custom">
        <div className="modal-content">
        <Button variant="light" className="close-modal-button" onClick={this.props.closeModal}>
              X
            </Button>
            <h5 className="center">Add a Job</h5>

          <form onSubmit={(e) => e.preventDefault()}>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Company Name</InputGroup.Text>
              <FormControl
                name="company_name"
                type="text"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Position</InputGroup.Text>
              <FormControl
                name="position"
                type="text"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
          <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Description</InputGroup.Text>
              <FormControl
                name="description"
                type="text"
                as="textarea"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Salary</InputGroup.Text>
              <FormControl
                name="salary"
                type="number"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Posting URL</InputGroup.Text>
              <FormControl
                name="posting_url"
                type="text"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Last Contacted</InputGroup.Text>
              <FormControl
                name="date_updated"
                type="date"
                aria-describedby="basic-addon3"
                defaultValue={this.props.today}

                // defaultValue={this.props.job.date_updated}
                // onChange={this.handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Notes</InputGroup.Text>
              <FormControl
                name="notes"
                type="text"
                as="textarea"
                aria-describedby="basic-addon3"
                onChange={this.handleChange}
              />
            </InputGroup>

            <Form.Group>
              <Form.Control
                as="select"
                id="status"
                name="status"
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
            <div className="center">
              <Button variant="success" type="button" onClick={this.handleSubmit}>
                Add to My Jobs
              </Button>
            </div>
            <div>
              <ul className="text-danger">
                {this.state.errors.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default JobCreate;
