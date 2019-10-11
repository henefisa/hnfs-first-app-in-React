import React, { Component } from "react";
import "./App.css";
import TrafficLight from "./components/trafficlight";
import TodoItems from "./components/todoItems";
import tick from "./svg-icon/tick.svg";

const RED = 0;
const YELLOW = 1;
const GREEN = 2;

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentColor: RED,
      allComplete: false,
      todoItems: [
        { title: "Ngủ", isComplete: false },
        { title: "Ngáy", isComplete: false },
        { title: "Say Hola", isComplete: false }
      ]
    };
    setInterval(() => {
      this.setState({
        currentColor: this.getNextColor(this.state.currentColor)
      });
    }, 1000);

    this.insertTodo = this.insertTodo.bind(this);
    this.completeAll = this.completeAll.bind(this);
  }

  getNextColor(color) {
    switch (color) {
      case RED:
        return YELLOW;
      case YELLOW:
        return GREEN;
      case GREEN:
        return RED;
      default:
        return RED;
    }
  }

  onItemClicked(item) {
    return event => {
      const { isComplete } = item;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      console.log(index);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
    };
  }

  insertTodo(event) {
    const { todoItems } = this.state;
    if (event.keyCode === 13) {
      let text = event.target.value;
      if (!text) return;
      text = text.trim();
      if (!text) {
        return;
      }
      this.setState({
        todoItems: [
          {
            title: text,
            isComplete: false
          },
          ...todoItems
        ]
      });

      event.target.value = "";
    }
  }

  completeAll(event) {
    const { todoItems, allComplete } = this.state;
    todoItems.forEach((item) => {
      item.isComplete = !allComplete;
    });
    this.setState({
      allComplete: !allComplete
    })
  }

  render() {
    const { currentColor } = this.state;
    const { todoItems } = this.state;
    return (
      <div className="App">
        <TrafficLight currentColor={currentColor} />
        <div className="input--todo">
          <img
            src={tick}
            alt="Complete all"
            width={32}
            height={32}
            onClick={this.completeAll}
          />
          <input
            type="text"
            placeholder="Add a new todo item"
            onKeyUp={this.insertTodo}
          />
        </div>
        {todoItems.length &&
          todoItems.map((item, index) => (
            <TodoItems
              key={index}
              item={item}
              onClick={this.onItemClicked(item)}
            />
          ))}
      </div>
    );
  }
}

export default App;
