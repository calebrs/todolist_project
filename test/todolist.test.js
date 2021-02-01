const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray on todolist returns a copy of todos', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first method return the first item in list', () => {
    expect(list.first()).toBe(todo1);
  });

  test('last method return the first item in list', () => {
    expect(list.last()).toBe(todo3);
  });

  test('shift removes first item in the list, and returns the first item', () => {
    expect(list.shift()).toBe(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop removes last item in the list and returns the last item', () => {
    let itemPopped = list.pop();
    expect(itemPopped).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone method returns true when items are all done and false when incompolete', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
    list.markAllUndone();
    expect(list.isDone()).toBe(false);
  });

  test('add method throws typeerror if an invalid item is added', () => {
    expect(() => list.add(5)).toThrow(TypeError);
    expect(() => list.add('hi')).toThrow(TypeError);
  });

  test('itemAt returns an item at the given index', () => {
    expect(() => list.itemAt(-1)).toThrow();
    expect(list.itemAt(1)).toBe(todo2);
  });

  test('markdoneAt throws error with invalid input, also item.isDone returns true', () => {
    expect(() => list.markDoneAt(-1)).toThrow();
    list.markDoneAt(1);
    expect(todo2.isDone()).toBe(true);
    expect(todo1.isDone()).toBe(false);
  });

  test('markUndoneAt throws error with invalid input, also item.isDone returns true', () => {
    expect(() => list.markDoneAt(-1)).toThrow();
    list.markAllDone()
    list.markUndoneAt(1);
    expect(todo2.isDone()).toBe(false);
    expect(todo1.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
  });

  test('markAllDone sets all of the isDone properties of the items to true', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo1.isDone()).toBe(true);
    expect(todo1.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt takes an item out at the input index', () => {
    expect(() => list.removeAt(5)).toThrow();
    list.removeAt(1);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
  
    expect(list.toString()).toBe(string);
  });

  test('returns the correct string when only one item is complete', () => {
    let oneDoneString = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    list.markDoneAt(0);
    expect(list.toString()).toBe(oneDoneString);
  });

  test('returns the correct string when all the items are complete', () => {
    let allDoneString = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(allDoneString);
  });

  test('forEach iterates over all of the elements in the list', () => {
    list.forEach(item => item.markDone())
    expect(list.isDone()).toBe(true);
  });

  test('filter returns a new list that has been filtered according to callback', () => {
    todo2.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo2);

    expect(list.filter(item => item.isDone())).toEqual(newList);
  });

  test('findbyTitle returns the correct item. returns nothing if not found', () => {
    let newList = new TodoList(list.title);

    expect(list.findByTitle('Buy milk')).toEqual(todo1);
    expect(list.findByTitle('by mlk')).toBe(undefined);
  });

  test('allDone returns list of the items that are marked as done', () => {
    let doneList = new TodoList(list.title);
    doneList.add(todo2);

    list.markDoneAt(1);
    expect(list.allDone()).toEqual(doneList);
  });

  test('allNotDone returns a list of all the items that are incomplete', () => {
    let imcompleteList = new TodoList(list.title);
    imcompleteList.add(todo1);
    imcompleteList.add(todo3);

    list.markDoneAt(1);
    expect(list.allNotDone()).toEqual(imcompleteList);
  });

  test('markDone marks an item done by the title that is input', () => {
    list.markDone('Buy milk');

    expect(todo1.isDone()).toBe(true);
  });

})