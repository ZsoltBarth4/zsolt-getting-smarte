//DOM elements to use
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const todoTypes = document.getElementById("todo-types");
const badges = document.querySelectorAll(".badge");
//Local storage call in
const todos = JSON.parse(localStorage.getItem("todos"));
//loop through all of the LS elements
if (todos) {
  todos.forEach((todo) => addTodo(todo));
}
//submit and run add todo function
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  //get the input text
  let todoText = input.value;
  //get the type from the select input
  let todoType = todoTypes.value;
  if (todo) {
    //if todo exist load it
    todoText = todo.text;
    todoType = todo.type;
  }
  // todo text check
  if (todoText) {
    const todoEl = document.createElement("li");
    todoEl.innerHTML = `${todoText} <span class="badge ${todoType}">${todoType}</span>`;
    //line through if it is completed
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.type = todoType;
    //click controls left completed right remove from the list
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEl.remove();

      updateLS();
    });
    //insert the todo
    todosUL.appendChild(todoEl);
    input.value = "";

    updateLS();
  }
}

//local storage update
function updateLS() {
  todosEl = document.querySelectorAll("li");
  const todos = [];

  //make a node list all the elements
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
      type: todoEl.type,
    });
  });
  // make a string to save it in LS
  localStorage.setItem("todos", JSON.stringify(todos));
}

//problem which I can't solve is that if I save it then the type also saved in the text and starting to pile up.
//Any suggestion?
