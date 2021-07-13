import React, { Component } from "react";
import {Button } from "react-bootstrap";


class BreakCounter extends Component {
    constructor() {
      super();
      this.state = { time: {}, seconds: 900, showBreakButton: true };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }
  
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
    }

    startTimer() {
      if (this.timer >= 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
        // console.log(this.state.seconds)
        // console.log(this.timer)
      } 
    }

    stopTimer(timer) {
      this.setState({
        showBreakButton: true,
      });
      clearInterval(timer);
    }

    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      // console.log(this.timer);
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
        showBreakButton: false,
      });
      
      // Check if we're at zero.
      if (seconds === 0) { 
        clearInterval(this.timer);
        this.setState({
          time: this.secondsToTime(900),
          seconds: 900,
        });
        this.timer = 0;
        this.onTrigger();
        // this.refreshPage();
      }
    }


    onTrigger = () => {
      this.props.increment(this.props.keys,this.props.values);
      // event.preventDefault();
    };
  
    render() {
      return(
        <div>
          <span className="row center">
          {/* <p className="text-center bold margin">Ready for a Break?</p> */}
          <div className="metric-zone">
          {this.state.showBreakButton === true && <Button size="sm" className="margin-bottom" variant="success" onClick={this.startTimer}>Start Break</Button> }
          {this.state.showBreakButton === false && <Button size="sm" variant="danger" onClick={() => this.stopTimer(this.timer)}>Stop Break</Button> }
          </div>
          </span>
          {this.state.showBreakButton === false && <div className="row center margin-bottom">{this.state.time.m} minutes and {this.state.time.s} seconds</div> }
        </div>
    );
  }
}

export default BreakCounter;
