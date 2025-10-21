const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = [];

const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
  todos = JSON.parse(savedTodos);
  todos.forEach(addTodoToList);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  const newTodo = {
    text: text,
    completed: false
  };

  todos.push(newTodo);
  addTodoToList(newTodo);
  saveTodos();
  input.value = "";
});

function addTodoToList(todo) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  const span = document.createElement("span");
  span.textContent = todo.text;

  if (todo.completed) {
    span.style.textDecoration = "line-through";
    span.style.opacity = "0.6";
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  const img = document.createElement("img");
  img.src = "img/dump.svg";
  img.alt = "delete-task";
  deleteBtn.appendChild(img);

  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;
    if (todo.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    } else {
      span.style.textDecoration = "none";
      span.style.opacity = "1";
    }
    saveTodos(); 
  });

  deleteBtn.addEventListener("click", function () {
    li.remove();
    todos = todos.filter(t => t.text !== todo.text);
    saveTodos();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

