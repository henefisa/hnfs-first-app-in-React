import React, { Component } from "react";
import "./App.css";
import TrafficLight from "./components/trafficlight";
import TodoItems from "./components/todoItems";
import tick from "./svg-icon/tick.svg";
import classNames from "classnames";

const RED = 0;
const YELLOW = 1;
const GREEN = 2;

class App extends Component {
  constructor() {
    super();
    this.state = {
      filterStatus: null,
      currentColor: RED,
      allComplete: false,
      todoItems: []
    };
    setInterval(() => {
      this.setState({
        currentColor: this.getNextColor(this.state.currentColor)
      });
    }, 1000);

    this.insertTodo = this.insertTodo.bind(this);
    this.completeAll = this.completeAll.bind(this);
  }

  countTodo() {
    const { todoItems } = this.state;
    return todoItems.filter(item => item.isComplete === false).length;
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
    todoItems.forEach(item => {
      item.isComplete = !allComplete;
    });
    this.setState({
      allComplete: !allComplete
    });
  }

  deleteItem(items) {
    return event => {
      const { todoItems } = this.state;
      let tmpArr = [...todoItems];
      items.forEach(item => {
        const index = tmpArr.indexOf(item);
        tmpArr.splice(index,1);
      });
      this.setState({
        todoItems: tmpArr
      });
    };
  }

  filterTodo(filterValue) {
    return () => {
      this.setState({
        filterStatus: filterValue
      });
    };
  }

  render() {
    const { currentColor } = this.state;
    const { todoItems, filterStatus } = this.state;
    return (
      <div className="App">
        <TrafficLight currentColor={currentColor} />
        <div className="todoBox">
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
          {todoItems.length > 0 && filterStatus === null
            ? todoItems.map((item, index) => (
                <TodoItems
                  key={index}
                  item={item}
                  onClick={this.onItemClicked(item)}
                  deleteItem={this.deleteItem([item])}
                />
              ))
            : todoItems
                .filter(item => item.isComplete === filterStatus)
                .map((item, index) => (
                  <TodoItems
                    key={index}
                    item={item}
                    onClick={this.onItemClicked(item)}
                    deleteItem={this.deleteItem([item])}
                  />
                ))}
          {todoItems.length === 0 && (
            <div className="empty-todoItems">
              You have no todo items, add a new one
            </div>
          )}
          <div className="bottom-bar">
            <div className="Counter">
              {this.countTodo() <= 1
                ? `${this.countTodo()} item left`
                : `${this.countTodo()} items left`}
            </div>
            <div className="filter-btn">
              <button
                className={classNames({
                  active: filterStatus === null
                })}
                onClick={this.filterTodo(null)}
              >
                All
              </button>
              <button
                className={classNames({
                  active: filterStatus === false
                })}
                onClick={this.filterTodo(false)}
              >
                Active
              </button>
              <button
                className={classNames({
                  active: filterStatus === true
                })}
                onClick={this.filterTodo(true)}
              >
                Completed
              </button>
            </div>
            <button onClick={this.deleteItem(this.state.todoItems.filter(item => item.isComplete === true))}>Clear completed.</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
