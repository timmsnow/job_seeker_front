import React, { Component } from 'react';
import {Button } from "react-bootstrap";


class Metric extends Component {

   state = {
 
      apply: this.props.value,
      info_interview: this.props.value,
      white_boarding_minutes: this.props.value,
      portfolio_minutes: this.props.value,
      breaks: this.props.value,
    
   }

  render() { 
    return ( <div>
      <div className="center margin">

      <Button variant="light" onClick={() => {this.props.decrement(this.props.keys,this.props.values)}} className="margin">-</Button> {this.props.values}/{this.props.goal} <Button variant="light" onClick={() => {this.props.increment(this.props.keys,this.props.values)}} className="margin">+</Button>
    </div>
    </div> );
  }
}
 
export default Metric;