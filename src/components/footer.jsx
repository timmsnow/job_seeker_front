import React, { Component } from "react";
import {Container} from "react-bootstrap";

class Footer extends Component {


  render() {
   
    return (
      <div className="footer">
        
          <Container><br></br>
            <p className="text-center">Copyright © 'JobSeeker' 2021</p>
           </Container>
      </div>
    );
  }
}

export default Footer;