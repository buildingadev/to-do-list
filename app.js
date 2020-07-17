const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkBtnAction);
filterOption.addEventListener('click', filterTodo);


function addTodo(event) {
    //Prevent form from submit
    event.preventDefault();

    //create Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo to local storage
    saveLocalTodos(todoInput.value);

    //check completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //check eliminate button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append todo list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = '';
}


function checkBtnAction(e) {
    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        deleteItem(item);
    }
    else if (item.classList[0] === 'complete-btn') {
        itemCompleted(item);
    }
}

function deleteItem(item) {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeItemLocStorage(todo);
    todo.addEventListener('transitionend', () => {
        todo.remove();
    })
}

function itemCompleted(item) {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
}

function filterTodo(e) {
    const todos = todoList.childNodes;

    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case "completed":
                todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none';
                break;
            case "uncompleted":
                !todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none';
                break;
        }
    })
}

//local storage
function saveLocalTodos(todo) {

    todos = checkTodos();
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos() {

    todos = checkTodos();

    todos.forEach(todo => {
        //create Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check completed button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //check eliminate button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //append todo list
        todoList.appendChild(todoDiv);
    })
}

function removeItemLocStorage(todo){

    todos = checkTodos();

    const todoIndex = todo.children[0].innerText;
    
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function checkTodos(){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}