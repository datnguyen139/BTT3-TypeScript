// export {}

const newTask = (<HTMLInputElement>document.querySelector(".newtask"));
const newList = (<HTMLScriptElement>document.querySelector(".middle"));

interface ListTodo {
  task: string
  complete: string
};

let todo: ListTodo[];
todo = JSON.parse((localStorage.getItem("listTodo")||'{}'));

function ShowListTask (){
  let html: string = "";
  if (todo) {
    todo.forEach((data, id) => {
            html += `
          <div class="to-do">
            <input type="text" class="text" id = "${id}" value = "${data.task}" ondblclick = "editlist(this)" readonly>
            <input type="checkbox" class="checkbox" id = "${id}" onclick = "checkstatus(this)" >
            <button class="delete" onclick = "deletelist()">Delete</button>
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
    if (!todo) {
        todo = [];
    }
     let obj: ListTodo = {
        task:inputValue,
        complete: "active"
    }
    todo.push(obj)
    localStorage.setItem("listTodo", JSON.stringify(todo));
    newTask.value = "";
    ShowListTask()
  }
})
