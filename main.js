const form = document.forms.formtoDo;
const inputTask = form.elements.task;
const addTaskBtn = form.elements.addTask;
const listTasks = document.getElementById("list-container");
const deleteAllBtn = document.getElementById("deleteAll");
const deleteComplete = document.getElementById("deleteComplete");
const completeds = document.getElementById("completed");
let tasks = JSON.parse(localStorage.getItem("listas")) || [];
let tasksComplete = JSON.parse(localStorage.getItem("completo")) || [];
let updateLocal = () => {
  localStorage.setItem("listas", JSON.stringify(tasks));
};
let updateComplete = () => {
  localStorage.setItem("completo", JSON.stringify(tasksComplete));
};

let tasksCompleted = 0;
document.addEventListener("DOMContentLoaded", () => {
  if (tasks.length > 0) {
    createElement();
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
  });
  listTasks.addEventListener("click", deleteTask);
  listTasks.addEventListener("change", checkIn);
  // deleteCompletes();
  // deleteComplete.addEventListener("click", deleteCompletes);
  deleteAllBtn.addEventListener("click", deleteAllTasks);
});
