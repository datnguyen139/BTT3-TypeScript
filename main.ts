const newTask = document.querySelector(".newtask");
const newList = document.querySelector(".middle");

let todo: object[] = [];

todo = JSON.parse(localStorage.getItem("listTodo"));

let listTodo: {
  task: string,
  complete: string,
};

newTask.addEventListener('keyup', function(event){
  let inputValue: string = newTask.value.trim();
  if (event.key == "Enter" && inputValue == "") {
    alert("please fill in task input");
} else if (event.key === "Enter" && inputValue !== "") {
    if (!todo) {
        todo = [];
    }
     listTodo = {
        task:inputValue,
        complete: "active"
    }
    todo.push(listTodo)
    localStorage.setItem("listTodo", JSON.stringify(todo));
    newTask.value = "";
    ShowListTask()
  }
})

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