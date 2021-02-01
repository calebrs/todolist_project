const Todo = require("./todo");

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
    }
    this.todos.push(todo);    
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.todos.length - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`Invalid Index: ${index}`);
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(item => item.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)
  }

  toString() {
    let logList = `---- ${this.title} ----`;
    for (let index = 0; index < this.size(); index += 1) {
      logList += '\n' + this.todos[index].toString();
    }

    return logList;
  }

  forEach(callback) {
    for (let index = 0; index < this.todos.length; index += 1) {
      callback(this.todos[index]);
    }
  }

  filter(callback) {
    let filteredList = new TodoList(this.title);
    this.forEach(todo => {
      if (callback(todo)) {
        filteredList.add(todo);
      }
    });

    return filteredList;
  }

  findByTitle(title) {
    return this.filter(todo => todo.title === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => (!todo.isDone()));
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo !== undefined) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone())
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone())
  }

  toArray() {
    return this.todos.slice();
  }
}

module.exports = TodoList;