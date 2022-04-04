const date = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");
const button = document.querySelector("#button-enter");
const check = "fa-regular fa-circle-check";
const uncheck = "fa-regular fa-circle";
const lineThrough = "line-through";
let id;
let arrayList;
//date

const DATE = new Date();
date.innerHTML = DATE.toLocaleDateString("en-MX", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

// function add-task

const addTask = (task, id, completed, eliminated) => {
  if (eliminated) {
    return;
  }

  const isCheck = completed ? check : uncheck;
  const line = completed ? lineThrough : "";
  const element = `
    <li>
        <i class="${isCheck}" data="checker" id="${id}"></i>
        <p class="text ${line}"> ${task} </p>
        <i class="fa-solid fa-trash-can" data="eliminated" id="${id}" ></i>
    </li>`;

  list.insertAdjacentHTML("beforeend", element);
};

//adding tasks
button.addEventListener("click", () => {
  const task = input.value;
  if (task) {
    addTask(task, id, false, false);
    arrayList.push({
      nombre: task,
      id: id,
      completed: false,
      eliminated: false,
    });
    input.value = "";
    id++;
  }
  localStorage.setItem("ToDo", JSON.stringify(arrayList));
});

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    const task = input.value;
    if (task) {
      addTask(task, id, false, false);
      arrayList.push({
        nombre: task,
        id: id,
        completed: false,
        eliminated: false,
      });
      input.value = "";
      id++;
    }
    localStorage.setItem("ToDo", JSON.stringify(arrayList));
  }
});

//check or unchecked tasks

list.addEventListener("click", (event) => {
  const element = event.target;
  const elementData = element.attributes.data.value;

  if (element.classList == uncheck) {
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
    arrayList[element.id].completed = arrayList[element.id].completed
      ? false
      : true;
    element.classList = check;
  }

  if (elementData === "eliminated") {
    element.parentElement.remove();
    arrayList[element.id].eliminated = true;
  }
  localStorage.setItem("ToDo", JSON.stringify(arrayList));
});

//Local storage get items

let data = localStorage.getItem("ToDo");
if (data) {
  arrayList = JSON.parse(data);
  arrayList.forEach((task) => {
    addTask(task.nombre, task.id, task.completed, task.eliminated);
  });
  id = arrayList.length;
} else {
  arrayList = [];
  id = 0;
}
