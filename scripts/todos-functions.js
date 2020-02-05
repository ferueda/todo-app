'use strict';

// get todos from localStorage
const getTodosFromLocalStorage = function() {
  const todosJSON = localStorage.getItem('todos');

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// save new todos to localStorage
const saveTodosToLocalStorage = function(todos) {
  return localStorage.setItem('todos', JSON.stringify(todos));
};

// remove todo by id
const removeTodo = function(id) {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex > -1) todos.splice(todoIndex, 1);
};

// toggle completed value for a given todo
const toggleTodo = function(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) todo.completed = !todo.completed;
};

// create todo DOM element
const createTodoDomElement = function(todo) {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const p = document.createElement('span');
  const checkBox = document.createElement('input');
  const delBtn = document.createElement('button');

  // setup checkbox
  checkBox.setAttribute('type', 'checkbox');
  checkBox.checked = todo.completed;
  containerEl.appendChild(checkBox);
  checkBox.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodosToLocalStorage(todos);
    displayTodos(todos, filters);
  });

  // setup todo element
  p.textContent = todo.name;
  containerEl.appendChild(p);

  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');

  todoEl.appendChild(containerEl);

  // setup delete todo btn
  delBtn.textContent = 'remove';
  delBtn.classList.add('button', 'button--text');
  todoEl.appendChild(delBtn);
  delBtn.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodosToLocalStorage(todos);
    displayTodos(todos, filters);
  });

  return todoEl;
};

// render todos
const displayTodos = function(todos, filter) {
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
const generateSummaryDOM = function(todos) {
  const todosLeft = document.createElement('h2');
  const filtered = todos.filter(todo => !todo.completed);
  todosLeft.classList.add('list-title');
  todosLeft.textContent = `You have ${filtered.length} ${filtered.length === 1 ? 'todo' : 'todos'} left.`;
  document.querySelector('#todos-container').appendChild(todosLeft);
};
