const form = document.forms.formtoDo;
const inputTask = form.elements.task;
const addTaskBtn = form.elements.addTask;
const listTasks = document.getElementById("list-container");
const deleteAllBtn = document.getElementById("deleteAll");
const deleteCompleteBtn = document.getElementById("deleteComplete");
const spanCompleteds = document.getElementById("completed");
const spanNameUser = document.getElementById("nameUser");
const titleToDo = document.getElementById("h1");
const cuteBtn = document.getElementById("cuteBtn");
const darkBtn = document.getElementById("darkBtn");
const lightBtn = document.getElementById("lightBtn");
const toDO = document.getElementById("paint");
let tasks = JSON.parse(localStorage.getItem("listas")) || [];
let updateLocal = (set, localItem) => {
  // localStorage.setItem("listas", JSON.stringify(tasks));
  localStorage.setItem(set, JSON.stringify(localItem));
};
let nameUser = JSON.parse(localStorage.getItem("nameUser")) || "";
let themeUser = JSON.parse(localStorage.getItem("Theme")) || "";
// let rose = ["cuteTheme"];
let tasksCompleted = 0;
document.addEventListener("DOMContentLoaded", () => {
  if (tasks) {
    createElement();
    customTheme(themeUser);
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
  });
  listTasks.addEventListener("click", deleteTask);
  listTasks.addEventListener("change", checkIn);
  deleteCompleteBtn.addEventListener("click", deleteCompletes);
  deleteAllBtn.addEventListener("click", deleteAllTasks);
  cuteBtn.addEventListener("click", (e) => {
    console.log(e);
    customTheme("cute");
  });
  darkBtn.addEventListener("click", () => customTheme("dark"));
  welcomeToDO(nameUser);
});
