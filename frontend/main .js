
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


let form = document.getElementById('myForm')
let indicator = 0
let item_id;


function  getTodos(){
    let url = 'http://127.0.0.1:8000/api/get-todos'
    let wrapper = document.getElementById('subContainer')
    wrapper.innerHTML = ''
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        
        // console.log(data)
        for(var d of data){
            // console.log(d.title)

            let listContainer = `
            <div class = 'wrapper'>
            <div class = 'wrapperText'><p>${d.title}</p></div>
                <div class = 'iconsContainer'>
                    <div class = 'editbtn' data-id = ${d.id} ><i class="fas fa-pen-alt"></i></div>
                    <div class = 'delbtn' data-id = ${d.id}><i class="fas fa-trash"></i></div> 
                </div>
    </div>
            `
            wrapper.innerHTML += listContainer
        }


        let editBtns = wrapper.getElementsByClassName('editbtn')
        let delBtns = wrapper.getElementsByClassName('delbtn')
        console.log(editBtns)
        for(let i = 0; i<editBtns.length; i++){
            delBtns[i].addEventListener('click', deleteTodo)
            editBtns[i].addEventListener('click', function(e){
                console.log('e.target')
                let eBtnParent = editBtns[i].parentElement.parentElement
                console.log(eBtnParent)
                let todoItem = eBtnParent.children[0].innerText
                document.getElementById('textInput').value = todoItem
                
                if(document.getElementById('textInput').value == todoItem){
                    indicator = 1
                    item_id = this.dataset.id
                }
                console.log(item_id)
                
                // form.addEventListener('submit', updateTodo)
    
            })
        }


    })
       
}
getTodos()

// function addTodo(){
    
    
    
    form.addEventListener('submit', function(e){
        e.preventDefault()
        let item = document.getElementById('textInput').value
        console.log(item)
        let url = 'http://127.0.0.1:8000/api/create-todo'
        if(indicator == 1){
            url = `http://127.0.0.1:8000/api/update-todo/${item_id}`
        }
        
        
        
        let newItem = {title: item }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(newItem),
            })
            .then(function(response){
                getTodos()
                form.reset()
                
                console.log(indicator)
                
            })
           
    })
    
     
function deleteTodo(e){
    console.log(e.target)
    let del_id = this.dataset.id
    let url = `http://127.0.0.1:8000/api/delete-todo/${del_id}`
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // 'X-CSRFToken': csrftoken,
        }
       
        })
        .then(function(response){
            indicator = 0
            getTodos()
            
            
        })
}