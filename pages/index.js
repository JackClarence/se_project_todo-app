import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import {initialTodos, validationConfig} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm("#add-todo-popup", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  section.addItem(values);
  handleAdd(true);
  addTodoPopup.close();
  todoValidator.resetValidation();
});

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed){
  todoCounter.updateCompleted(completed);
};

function handleDelete(completed){
  if(completed){
    todoCounter.updateCompleted(false);
  };
  todoCounter.updateTotal(false);
}

function handleAdd(added){
  if(added){
    todoCounter.updateTotal(true);
  }
}

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const section = new Section({
  items: initialTodos,
  renderer: (data) => {
    const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
    const todoElement = todo.getView();

    return todoElement;
  },
  containerSelector: ".todos__list"
});

/*addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  section.addItem(values);
  addTodoPopup.close();
  todoValidator.resetValidation();
});*/

section.renderItems(initialTodos);

const todoValidator = new FormValidator(validationConfig, addTodoForm);
todoValidator.enableValidation();