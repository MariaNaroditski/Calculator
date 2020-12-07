import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
  isOperator = (val) => {
    return !isNaN(val) || val === "." || val === "=";
  };
  isBrucket = (val) => {
    return val === "(" || val === ")";
  };

  render() {
    const isOperator = this.isOperator(this.props.children);
    return (
      <div
        className={`button ${isOperator ? "" : "operator"} 
        ${!isOperator && this.isBrucket(this.props.children) ? "brucket" : ""} 
        ${this.props.disable ? "disable" : ""}`}
        onClick={() => this.props.handleClick(this.props.children)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Button;
