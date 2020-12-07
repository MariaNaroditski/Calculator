import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import "./DeleteButton.css";

class DeleteButton extends Component {
  render() {
    return (
      <div
        className={`delete ${this.props.disable ? "disable" : ""}`}
        onClick={() => this.props.handleClick()}
      >
        <FontAwesomeIcon icon={faBackspace} rotation={180} />
      </div>
    );
  }
}

export default DeleteButton;
