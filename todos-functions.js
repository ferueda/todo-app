'use strict'

// get todos from localStorage
const getTodosFromLocalStorage = function () {
  const todosJSON = localStorage.getItem('todos');

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return []
  }

};

// save new todos to localStorage
const saveTodosToLocalStorage = function (todos) {
  return localStorage.setItem('todos', JSON.stringify(todos));
};

// remove todo by id
const removeTodo = function (id) {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex > -1) todos.splice(todoIndex, 1);
};

// toggle completed value for a given todo
const toggleTodo = function (id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) todo.completed = !todo.completed;
};

// create todo DOM element
const createTodoDomElement = function (todo) {
  const todoContainer = document.createElement('div');
  const p = document.createElement('span');
  const checkBox = document.createElement('input');
  const delBtn = document.createElement('button');

  // setup checkbox
  checkBox.setAttribute('type', 'checkbox');
  checkBox.checked = todo.completed;
  todoContainer.appendChild(checkBox);
  checkBox.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodosToLocalStorage(todos);
    displayTodos(todos, filters);
  });

  // setup todo element
  p.textContent = todo.name;
  todoContainer.appendChild(p);

  // setup delete todo btn
  delBtn.textContent = 'x';
  todoContainer.appendChild(delBtn);
  delBtn.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodosToLocalStorage(todos);
    displayTodos(todos, filters);
  });

  return todoContainer;
};

// render todos
const displayTodos = function (todos, filter) {
  const filteredTodos = todos.filter(todo => {
    const matchText = todo.name.toLowerCase().includes(filter.searchText.toLowerCase());
    const matchHidden = !filters.hideCompleted || !todo.completed;
    return matchText && matchHidden;
  });

  document.querySelector('#todos-container').innerHTML = '';

  generateSummaryDOM(filteredTodos);

  filteredTodos.forEach(todo => document.querySelector('#todos-container').appendChild(createTodoDomElement(todo)));
};

// get DOM elements for summary list
const generateSummaryDOM = function (todos) {
  const todosLeft = document.createElement('h2');
  todosLeft.textContent = `You have ${todos.filter(todo => !todo.completed).length} todos left.`;
  document.querySelector('#todos-container').appendChild(todosLeft);
};
