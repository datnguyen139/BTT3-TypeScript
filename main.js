var newTask = document.querySelector(".newtask");
var newList = document.querySelector(".middle");
var footer = document.querySelector(".bottom");
var selectAll = document.querySelector(".selectall");
;
var todos;
todos = JSON.parse((localStorage.getItem("listTodo") || '[]'));
function countTaskActive() {
    var countTaskActive = todos.length;
    var countTaskCompleted = 0;
    todos.forEach(function (data) {
        if (data.complete === "completed") {
            countTaskActive -= 1;
            countTaskCompleted += 1;
        }
    });
    document.querySelector("strong").innerHTML = "countTaskActive";
    if (countTaskActive == 0 && countTaskCompleted == 0) {
        footer.setAttribute("style", "display: none");
        selectAll.setAttribute("style", "display: none");
    }
    else {
        footer.removeAttribute("style", "display: none");
        selectAll.removeAttribute("style", "display: none");
    }
}
function editTask(event) {
    var edit_task = event.parentElement.firstElementChild;
    edit_task.removeAttribute("readonly", "readonly");
    edit_task.addEventListener('mouseout', function () {
        edit_task.setAttribute("readonly", "readonly");
        if (edit_task.value.trim() === "") {
            alert("please fill the edit");
        }
        else {
            todos[event.id].task = edit_task.value;
        }
        localStorage.setItem("listTodo", JSON.stringify(todos));
    });
}
function CheckComplete(selectask) {
    console.log(selectask);
    var check = selectask.parentElement.firstElementChild;
    var index = parseInt(check.id);
    if (selectask.checked) {
        check.classList.add("checked");
        todos[index].complete = "completed";
    }
    else {
        check.classList.remove("checked");
        todos[index].complete = "active";
    }
    localStorage.setItem("listTodo", JSON.stringify(todos));
}
function DeleteTask(index) {
    var localitem = JSON.parse(localStorage.getItem("listTodo") || '{}');
    todos.splice(index, 1);
    localStorage.setItem("listTodo", JSON.stringify(todos));
    ShowListTask();
}
function ShowListTask() {
    var html = "";
    if (todos) {
        todos.forEach(function (data, id) {
            html += "\n      <div class=\"to-do\">\n        <input type=\"text\" class=\"text\" id = \"".concat(id, "\" value = \"").concat(data.task, "\" ondblclick = \"editTask(this)\" readonly>\n        <input type=\"checkbox\" class=\"checkbox\" id = \"").concat(id, "\" onclick = \"CheckComplete(this)\" >\n        <button class=\"delete\" onclick = \"DeleteTask()\">Delete</button>\n      </div>");
        });
        newList.innerHTML = html;
    }
}
ShowListTask();
newTask.addEventListener('keyup', function (event) {
    var inputValue = newTask.value.trim();
    if (event.key == "Enter" && inputValue == "") {
        alert("please fill in task input");
    }
    else if (event.key === "Enter" && inputValue !== "") {
        if (!todos) {
            todos = [];
        }
        var obj = {
            task: inputValue,
            complete: "active"
        };
        todos.push(obj);
        localStorage.setItem("listTodo", JSON.stringify(todos));
        newTask.value = "";
        ShowListTask();
    }
});
