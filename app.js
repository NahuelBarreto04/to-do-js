const taskElement = (obj) => {
  return `<input type="checkbox" class="check"><p class="hero__p">${obj.id})${obj.task}</p><button class="btn-remove" class="removeTask"><i class="fa-solid fa-trash remove"></i></button>`;
};
const spanComplete = (numTaskCompletes) => {
  console.log(numTaskCompletes);
  return `Te quedan ${numTaskCompletes} tareas por realizar`;
};
function addTask() {
  let idTask = tasks.length + 1;
  const task = inputTask.value.trim();
  if (task === "") {
    showError("Ingresa una tarea");
    form.reset();

    return;
  }
  if (tasks.some((tasks) => tasks.task.toLowerCase() == task.toLowerCase())) {
    showError("Ya has ingresado esta tarea");
    form.reset();
    return;
  }
  const taskObj = {
    task: task,
    id: 0,
    complete: false,
  };
  tasks = [...tasks, taskObj];
  createElement();
  form.reset();
}
function createElement() {
  listTasks.innerHTML = "";
  let id2 = 1;
  if (tasks) {
    tasks.forEach((obj) => {
      obj.id = id2;
      id2++;
      const li = document.createElement("li");
      li.innerHTML = taskElement(obj);
      listTasks.appendChild(li);
      li.classList.add("hero__item");
      li.setAttribute("data-id", obj.id);
      if (obj.complete) {
        li.firstChild.checked = true;
      }
    });
  }
  let taskscompleteds = tasks.filter((task) => task.complete).length || 0;
  if (taskscompleteds > 0) {
    spanCompleteds.innerHTML = spanComplete(taskscompleteds);
    deleteCompleteBtn.style.display = "flex";
  } else {
    spanCompleteds.innerHTML = spanComplete(taskscompleteds);
    deleteCompleteBtn.style.display = "none";
  }
  let tasksLength = tasks.length;
  if (tasksLength > 0) {
    deleteAllBtn.style.display = "flex";
  } else {
    deleteAllBtn.style.display = "none";
  }

  updateLocal("listas", tasks);
}
function showError(msgError) {
  const liError = document.createElement("li");
  liError.innerHTML = msgError;
  liError.classList.add("error");
  listTasks.appendChild(liError);
  setTimeout(() => {
    liError.classList.remove("error");
    liError.remove();
  }, 2000);
}
let deleteTask = (e) => {
  const button = e.target.parentElement;
  if (button.tagName === "BUTTON") {
    const liParentButton = button.parentNode;
    const deleteId = Number(liParentButton.getAttribute("data-id"));
    tasks = tasks.filter((task) => task.id !== deleteId);
    listTasks.removeChild(liParentButton);
    createElement();
    updateLocal("listas", tasks);
  }
};
function deleteAllTasks() {
  tasks = [];
  listTasks.innerHTML = "";
  updateLocal("listas", tasks);
  createElement();
}

function checkIn(e) {
  const id = Number(e.target.parentNode.dataset.id);
  const complete = e.target.checked;
  tasks = tasks.map((toDo) => {
    if (toDo.id === id) {
      return { ...toDo, complete };
    }
    return toDo;
  });
  updateLocal("listas", tasks);
  createElement();
}

function deleteCompletes() {
  tasks = tasks.filter((obj) => obj.complete === false);
  updateLocal("listas", tasks);
  createElement();
}

let welcomeToDO = (name) => {
  const capitalice = (name) => {
    let firstLetter = name.charAt(0).toUpperCase();
    let nameSlice = name.slice(1, name.length);
    let capitaliceName = firstLetter + nameSlice;
    return capitaliceName;
  };
  let nameTitle;
  if (name === "") {
    let nameles = prompt("Ingresa tú nombre:").trim().toLocaleLowerCase();
    nameTitle = capitalice(nameles);
    updateLocal("nameUser", nameTitle);
  } else {
    nameTitle = capitalice(name);
  }
  let day = new Date();
  let timeDay = day.getHours();
  if (timeDay >= 6 && timeDay <= 12) {
    titleToDo.innerHTML = `Buenos días ${nameTitle}`;
  } else if (timeDay >= 12 && timeDay < 20) {
    titleToDo.innerHTML = `Buenas tarde ${nameTitle}`;
  } else if (timeDay >= 20 || timeDay < 6) {
    titleToDo.innerHTML = `Buenas noches ${nameTitle}`;
  }
};

// let cuteTheme = (cute) => {
//   // for (x of listTasks.children) {
//   //   x.style.background = "white";
//   // }
//   for (x of cute) {
//     if (listTasks.className === "cuteTheme") {
//       listTasks.classList.remove(x);
//       console.log(listTasks.className);
//     } else {
//       listTasks.classList.add(x);
//     }
//     // console.log(x);
//   }
//   // updateLocal("Theme", rose);
// };
