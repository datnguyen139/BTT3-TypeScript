const newTask = (<HTMLInputElement>document.querySelector(".newtask"));
const newList = (<HTMLScriptElement>document.querySelector(".middle"));
const footer = (<HTMLElement>document.querySelector(".bottom"));
const selectAll = (<HTMLButtonElement>document.querySelector(".selectall"))

interface ListTodo {
  task: string
  complete: string
};

let todos: ListTodo[];
todos = JSON.parse((localStorage.getItem("listTodo")||'[]'));

function countTaskActive() {
  let countTaskActive: number = todos.length
  let countTaskCompleted: number = 0
  todos.forEach(data => {
      if (data.complete === "completed") {
          countTaskActive -= 1
          countTaskCompleted += 1
      }
  })
  document.querySelector("strong").innerHTML = "countTaskActive"
  if (countTaskActive == 0 && countTaskCompleted == 0) {
      footer.setAttribute("style", "display: none")
      selectAll.setAttribute("style", "display: none")
  } else {
      footer.removeAttribute("style", "display: none")
      selectAll.removeAttribute("style", "display: none")
  }
}

function editTask(event: any) {
  let edit_task = event.parentElement.firstElementChild
  edit_task.removeAttribute("readonly", "readonly")
  edit_task.addEventListener('mouseout', function() {
      edit_task.setAttribute("readonly", "readonly")
      if (edit_task.value.trim() === "") {
          alert("please fill the edit")
      } else {
          todos[event.id].task = edit_task.value
      }
      localStorage.setItem("listTodo", JSON.stringify(todos))
  })
}

function CheckComplete(selectask: HTMLInputElement) {
  console.log(selectask);

  let check = selectask.parentElement.firstElementChild;
  let index: number = parseInt(check.id)
  if(selectask.checked) {
    check.classList.add("checked");
    todos[index].complete = "completed";
  } else {
    check.classList.remove("checked");
    todos[index].complete = "active";
  }
  localStorage.setItem("listTodo",JSON.stringify(todos))
}

function DeleteTask(index: number) {
  let localitem = JSON.parse(localStorage.getItem("listTodo")||'{}');
  todos.splice(index, 1)
  localStorage.setItem("listTodo", JSON.stringify(todos))
  ShowListTask()
}

function ShowListTask() {
  let html: string = "";
  if (todos) {
    todos.forEach((data, id) => {
      html += `
      <div class="to-do">
        <input type="text" class="text" id = "${id}" value = "${data.task}" ondblclick = "editTask(this)" readonly>
        <input type="checkbox" class="checkbox" id = "${id}" onclick = "CheckComplete(this)" >
        <button class="delete" onclick = "DeleteTask()">Delete</button>
      </div>`
    })
    newList.innerHTML = html;
  }
}
ShowListTask()

newTask.addEventListener('keyup', function(event){
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
    ShowListTask()
  }
})
