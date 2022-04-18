var newTask = document.querySelector(".newtask");
var newList = document.querySelector(".middle");
var todo = [];
todo = JSON.parse(localStorage.getItem("listTodo"));
var listTodo;
newTask.addEventListener('keyup', function (event) {
    var inputValue = newTask.value.trim();
    if (event.key == "Enter" && inputValue == "") {
        alert("please fill in task input");
    }
    else if (event.key === "Enter" && inputValue !== "") {
        if (!todo) {
            todo = [];
        }
        listTodo = {
            task: inputValue,
            complete: "active"
        };
        todo.push(listTodo);
        localStorage.setItem("listTodo", JSON.stringify(todo));
        newTask.value = "";
        ShowListTask();
    }
});
function ShowListTask() {
    var html = "";
    if (todo) {
        todo.forEach(function (data, id) {
            html += "\n          <div class=\"to-do\">\n            <input type=\"text\" class=\"text\" id = \"".concat(id, "\" value = \"").concat(data.task, "\" ondblclick = \"editlist(this)\" readonly>\n            <input type=\"checkbox\" class=\"checkbox\" id = \"").concat(id, "\" onclick = \"checkstatus(this)\" >\n            <button class=\"delete\" onclick = \"deletelist()\">Delete</button>\n          </div>");
        });
        newList.innerHTML = html;
    }
}
