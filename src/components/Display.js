import React, { Component } from "react";
import "./Display.css";

class Display extends Component {
  render() {
    const display = this.props.expression;
    return <div className="display">{display.replace(/(.)(?=.)/g, "$1 ")}</div>;
  }
}

export default Display;
