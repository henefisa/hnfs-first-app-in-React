import React, { Component } from "react";

import classNames from "classnames";

import "./TodoItems.css";

import check from "../svg-icon/check.svg";
import checkDone from "../svg-icon/check-complete.svg";

class TodoItems extends Component {
  render() {
    const { item, onClick } = this.props;
    let url = check;
    if (item.isComplete) {
      url = checkDone;
    }
    return (
      <div className="todoItems">
        <img
          onClick={onClick}
          src={url}
          width={32}
          height={32}
          alt={item.isComplete ? "Checked" : "Check"}
        />
        <p
          className={classNames({
            complete: item.isComplete === true
          })}
        >
          {item.title}
        </p>
      </div>
    );
  }
}

export default TodoItems;
