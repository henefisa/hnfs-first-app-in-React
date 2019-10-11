import React, { Component } from "react";
import classNames from "classnames";

import "./trafficlight.css";

const RED = 0;
const YELLOW = 1;
const GREEN = 2;

class TrafficLight extends Component {

  render() {
    const { currentColor } = this.props;
    return (
      <div className="trafflic-light">
        <div
          className={classNames("bubl", "red", {
            active: currentColor === RED
          })}
        />
        <div
          className={classNames("bubl", "yellow", {
            active: currentColor === YELLOW
          })}
        />
        <div
          className={classNames("bubl", "green", {
            active: currentColor === GREEN
          })}
        />
      </div>
    );
  }
}

export default TrafficLight;
