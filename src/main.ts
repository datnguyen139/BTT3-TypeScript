const newTask = (<HTMLInputElement>document.querySelector(".newtask"))
const newList = (<HTMLElement>document.querySelector(".middle"))
const footer = (<HTMLElement>document.querySelector(".bottom"))
const selectAll = (<HTMLButtonElement>document.querySelector("#select"))
const itemLeft = (<HTMLElement>document.querySelector("strong"))
const clearcomplete = (<HTMLButtonElement>document.querySelector(".clearcompleted"))
const active = (<HTMLAnchorElement>document.querySelector("#active"))
const all = (<HTMLAnchorElement>document.querySelector("#all"))
const completed = (<HTMLAnchorElement>document.querySelector("#completed"))

window.DeleteTask = function(id: number){
  return DeleteTask(id);
}
window.CheckComplete = function(selectask: HTMLInputElement){
  return CheckComplete(selectask)
}
window.editTask = function(event: HTMLInputElement){
  return editTask(event)
}

interface ListTodo {
  task: string
  complete: string
};

let todos: ListTodo[];
todos = JSON.parse((localStorage.getItem("listTodo")||'[]'));

active.addEventListener('click', function() {
  ShowListTask("active")
  active.classList.add("active")
  all.classList.remove("active")
  completed.classList.remove("active")
})

all.addEventListener('click', function() {
  ShowListTask("all")
  active.classList.remove("active")
  all.classList.add("active")
  completed.classList.remove("active")
})

completed.addEventListener('click', function() {
  ShowListTask("completed")
  active.classList.remove("active")
  all.classList.remove("active")
  completed.classList.add("active")
})


clearcomplete.addEventListener('click',function() {
  let newtodos = todos.reduce((newtodos, data) => (data.complete !== "completed" && newtodos.push(data),newtodos),[])
  todos = newtodos
  localStorage.setItem("listTodo",JSON.stringify(todos))
  ShowListTask("all")
})

selectAll.addEventListener('click',function() {
  if(selectAll.className === "select" ) {
    todos.forEach(data =>{
      data.complete = "completed"
    })
    selectAll.className = "selectall"
  } else {
    todos.forEach(data =>{
      data.complete = "active"
    })
    selectAll.className = "select"
  }
  localStorage.setItem("listTodo",JSON.stringify(todos))
  ShowListTask("all")
})

function countTaskActive() {
  let countTaskActive = todos.length
  let countTaskCompleted = 0
  todos.forEach(data => {
      if (data.complete === "completed") {
          countTaskActive -= 1
          countTaskCompleted += 1
      }
  })
  itemLeft.innerHTML = `${countTaskActive}`
  if (countTaskActive === 0 && countTaskCompleted === 0) {
      footer.setAttribute("style", "display: none")
      selectAll.setAttribute("style", "display: none")
  } else {
      footer.removeAttribute("style")
      selectAll.removeAttribute("style")
  }
}

function editTask(event: HTMLInputElement) {
  let edit_task = event.parentElement.firstElementChild
  console.log(edit_task)
  edit_task.removeAttribute("readonly")
  edit_task.addEventListener('mouseout', function() {
      edit_task.setAttribute("readonly", "readonly")
      localStorage.setItem("listTodo", JSON.stringify(todos))
  })
}

function CheckComplete(selectask: HTMLInputElement) {
  let check = selectask.parentElement.firstElementChild;
  let index: number = parseInt(check.id)
  if(selectask.checked) {
    check.classList.add("checked");
    todos[index].complete = "completed";
    countTaskActive()
  } else {
    check.classList.remove("checked");
    todos[index].complete = "active";
    countTaskActive()
  }
  if(completed.classList.contains("active") === true)
    ShowListTask("completed")
  else if(active.classList.contains("active") === true) {
    ShowListTask("active")
  } else {
    ShowListTask("all")
  }
  localStorage.setItem("listTodo",JSON.stringify(todos))
}

function DeleteTask(id: number){
  todos.splice(id,1)
  localStorage.setItem("listTodo", JSON.stringify(todos))
  if(completed.classList.contains("active") === true)
    ShowListTask("completed")
  else if(active.classList.contains("active") === true) {
    ShowListTask("active")
  } else {
    ShowListTask("all")
  }
  countTaskActive()
}

function ShowListTask(event: string) {
  let html: string = "";
  if (todos) {
    todos.forEach((data, id) => {
      let ischeck: string = data.complete
      if (ischeck === "completed") {
          ischeck = "checked"
      } else {
          ischeck = ""
      }
      if (event === data.complete || event === "all") {
      html += `
      <div class="to-do">
        <input type="text" class="text ${ischeck}" id = "${id}" value = "${data.task}" ondblclick = "editTask(this)" readonly>
        <input type="checkbox" class="checkbox" id = "${id}" onclick = "CheckComplete(this)" ${ischeck}>
        <button class="delete" id="${id}" onclick = "DeleteTask(${id})"><i class="fa-solid fa-xmark"></i></button>
      </div>`
      }
    })
    newList.innerHTML = html;
    countTaskActive()
  }
}
ShowListTask("all")

newTask.addEventListener('keyup', function(event) {
  let inputValue: string = newTask.value.trim();
  if (event.key == "Enter" && inputValue == "") {
    alert("please fill in task input");
  } else if (event.key === "Enter" && inputValue !== "") {
    if (!todos) {
        todos = [];
    }
     let obj: ListTodo = {
        task:inputValue,
        complete: "active"
    }
    todos.push(obj)
    localStorage.setItem("listTodo", JSON.stringify(todos));
    newTask.value = "";
    ShowListTask("all")
    countTaskActive()
  }
})
