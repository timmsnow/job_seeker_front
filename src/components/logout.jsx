import axios from "axios";
import React, { Component } from "react";
import Modal from "./modal";


class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }

  componentDidMount() {
    this.showModal();
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
    this.handleLogout();
  };

  handleLogout() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    localStorage.removeItem("metric_row_id");
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
      {this.state.showModal ? <Modal closeModal={this.closeModal} /> : null}

      </div>
    )
  }
}

export default Logout;
