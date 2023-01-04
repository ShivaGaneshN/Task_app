
// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
// const csrftoken = getCookie('csrftoken');


// let form = document.getElementById('myForm')
// let indicator = 0
// let item_id;


// function  getTodos(){
//     let url = 'http://127.0.0.1:8000/api/get-todos'
//     let wrapper = document.getElementById('subContainer')
//     wrapper.innerHTML = ''
//     fetch(url)
//     .then((response)=>response.json())
//     .then((data)=>{
        
//         // console.log(data)
//         for(var d of data){
//             // console.log(d.title)

//             let listContainer = `
//             <div class = 'wrapper'>
//             <div class = 'wrapperText'><p>${d.title}</p></div>
//             <div class = 'wrapperText'><p>${d.dateTime}</p></div>
//                 <div class = 'iconsContainer'>
//                     <div class = 'editbtn' data-id = ${d.id} ><i class="fas fa-pen-alt"></i></div>
//                     <div class = 'delbtn' data-id = ${d.id}><i class="fas fa-trash"></i></div> 
//                 </div>
//     </div>
//             `
//             wrapper.innerHTML += listContainer
//         }


//         let editBtns = wrapper.getElementsByClassName('editbtn')
//         let delBtns = wrapper.getElementsByClassName('delbtn')
//         console.log(editBtns)
//         for(let i = 0; i<editBtns.length; i++){
//             delBtns[i].addEventListener('click', deleteTodo)
//             editBtns[i].addEventListener('click', function(e){
//                 console.log('e.target')
//                 let eBtnParent = editBtns[i].parentElement.parentElement
//                 console.log(eBtnParent)
//                 let todoItem = eBtnParent.children[0].innerText
//                 document.getElementById('textInput').value = todoItem
                
//                 if(document.getElementById('textInput').value == todoItem){
//                     indicator = 1
//                     item_id = this.dataset.id
//                 }
//                 console.log(item_id)
                
//                 // form.addEventListener('submit', updateTodo)
    
//             })
//         }


//     })
       
// }
// getTodos()

// // function addTodo(){
    
    
    
//     form.addEventListener('submit', function(e){
//         e.preventDefault()
//         let item = document.getElementById('textInput').value
//         let datetime = document.getElementById('birthdaytime').value
//         console.log(datetime)
//         let url = 'http://127.0.0.1:8000/api/create-todo'
//         if(indicator == 1){
//             url = `http://127.0.0.1:8000/api/update-todo/${item_id}`
//         }
        
        
        
//         let newItem = {title: item, dateTime: datetime }
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'X-CSRFToken': csrftoken,
//             },
//             body: JSON.stringify(newItem),
//             })
//             .then(function(response){
//                 getTodos()
//                 form.reset()
                
//                 console.log(indicator)
                
//             })
           
//     })
    
     
// function deleteTodo(e){
//     console.log(e.target)
//     let del_id = this.dataset.id
//     let url = `http://127.0.0.1:8000/api/delete-todo/${del_id}`
//     fetch(url, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             // 'X-CSRFToken': csrftoken,
//         }
       
//         })
//         .then(function(response){
//             indicator = 0
//             getTodos()
            
            
//         })
// }




const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");

let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});