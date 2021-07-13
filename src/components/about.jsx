import React, { Component } from 'react';
import { Card, Container, Row, Col } from "react-bootstrap";



class About extends Component {
  state = {  }
  render() { 
    return (
      <div>
        <Container fluid className="margin">
          <Row className="center">
            <Col lg="8">
        <Card>
      <Card.Title className="center margin">What is JOB SEEKER?</Card.Title>
      <Card.Body className="margin">
        <p>Job Seeker is a web-app designed with the coding bootcamp graduate in mind. </p>
    
      <p>With the average bootcamp graduate taking anywhere from 3 months to a year to land their first developer job, having the right tools to keep you motivated and on track can make all the difference.</p>

      <p>Job Seeker allows for individuals to keep track of their job hunting goals and progress. With Job Seeker it's easy to: </p>
        <ul className="margin">
          <li>
        Catalogue and Save Jobs of Interest
        </li>
        <li>
        Easily manage your job applications by switching their status based on your level of interaction
        </li>
        <li>
        Set Daily Goals for applications, Informational Interviews, and Coding Practice
        </li>
        <li>
        Monitor your progress in a way that keeps the job seeker accountable, making it easier to reach your goals and increase your chances of scoring that dream job
          </li>
        <li>
        Update your contact list so you can keep tabs on the people you know who work in the company you're applying with
        </li>
        <li>
        Manage your screen time with the convenient Break Timer
        </li>
        </ul>
        <p>Job Seeker is every bootcamp graduates new BEST FRIEND. Now let's GO GET YOU A JOB!</p>
       </Card.Body>
      </Card>
      </Col>
      </Row>
      <Row className="center margin">
        <Col lg="8" className="center">
      <p className="small text-center">Job Seeker was built using Ruby on Rails and React, with a little help from Bootstrap</p>
      </Col>
      </Row>
      </Container>
      </div>
     );
  }
}
 
export default About;
