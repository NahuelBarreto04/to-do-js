const taskElement = (obj) => {
  return `<input type="checkbox" class="check"><p class="hero__p">${obj.id})${obj.task}</p><button class="btn-remove" class="removeTask"><i class="fa-solid fa-trash remove"></i></button>`;
};
function addTask() {
  let idTask = tasks.length + 1;
  const task = inputTask.value;
  if (task === "") {
    showError("Ingresa una tarea");
    return;
  }
  if (tasks.some((tasks) => tasks.task.toLowerCase() == task.toLowerCase())) {
    showError("Ya has ingresado esta tarea");
    return;
  }
  const taskObj = {
    task: task,
    id: idTask,
    complete: false,
  };
  tasks = [...tasks, taskObj];
  updateLocal();
  createElement();
  form.reset();
}
function createElement() {
  listTasks.innerHTML = "";
  if (tasks) {
    tasks.forEach((obj) => {
      const li = document.createElement("li");
      li.innerHTML = taskElement(obj);
      listTasks.appendChild(li);
      li.classList.add("hero__item");
      li.setAttribute("data-id", obj.id);
    });
  }
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
    updateLocal();
    let id2 = 1;
    if (tasks) {
      listTasks.innerHTML = "";
      tasks.forEach((obj) => {
        obj.id = id2;
        id2++;
        const li = document.createElement("li");
        li.innerHTML = taskElement(obj);
        listTasks.appendChild(li);
        li.classList.add("hero__item");
        li.setAttribute("data-id", obj.id);
      });
      updateLocal();
    }
  }
};
function deleteAllTasks() {
  tasks = [];
  listTasks.innerHTML = "";
  updateLocal();
}

function checkIn(e) {
  // const inputCheckbox = e.target;
  // const InputChecked = e.target.checked;
  // console.log(inputCheckbox);
  // podría poner {target} para desestructurar el evento y traerme solo el target
  console.log(e.target);
  // Busco el li padre de este checkbox que tiene el dataset con el id que necesito
  const id = Number(e.target.parentNode.dataset.id);
  const complete = e.target.checked; // Indica si la tarea ha sido completada o no
  state = state.map((toDo, index) => {
    if (index === id) {
      return { ...toDo, complete }; //Actualizamelo
    }
    return toDo; //Devolvemelo igual si no cambio el estado del checked
  });
  console.log(state);
  renderTodos(state);
  saveState(state);
}

//   //   const target = e.target;
//   //   if (target.tagName === "CHECKBOX") {
//   //     // const checked = target.checked;
//   //   }
// }

// function deleteCompletes() {
//   console.log(listTasks.children);
//   // for (x of listTasks.children) {
//   //   const inputCheckbox = x.firstChild;
//   //   // console.log(inputCheckbox.checked);
//   //   if (inputCheckbox.checked) {
//   //   }
//   // }
//   const markedCheckbox = document.querySelectorAll(
//     'input[type="checkbox"]:checked'
//   );
//   markedCheckbox.forEach((e) => {
//     console.log("aaaaaaa");
//   });

//   console.log(markedCheckbox);
//   // for (var checkbox of markedCheckbox) {
//   // document.body.append(checkbox.value + ' ');
//   // }
//   // }
// }
