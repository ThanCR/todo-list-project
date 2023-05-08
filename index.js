
/* task list */

taskList = [];
taskListHTML = '';

/* Add task functions */
const setVisibility = (component, value) => {
    component.style.visibility = value
}

const openNewTaskDialog = (event) => {
    taskDiv = document.querySelector('#createDivTask')
    taskTitle = document.querySelector('.new-task-input');
    taskDescription = document.querySelector('.new-task-textarea');
    taskTitle.value = '';
    taskDescription.value = '';
    setVisibility(taskDiv, 'visible')
}


const addTask = (event) => {
    taskDiv = document.querySelector('#createDivTask')
    taskTitle = document.querySelector('.new-task-input');
    taskDescription = document.querySelector('.new-task-textarea');
    newTaskId = 1;
    taskList.forEach( (task) => {
        if(task.id >= newTaskId){
            newTaskId = task.id + 1;
        }
    })
    addTaskToList(buildTaskObj(newTaskId, taskTitle.value, taskDescription.value));
    setVisibility(taskDiv, 'hidden');
}

const buildTaskObj = (id, title, description) => {
    return {
        id,
        title,
        description
    }
}

const addTaskToList = (taskObj) => {
    taskList.reverse();
    taskList.push(taskObj);
    taskList.reverse();
    updateList();
}

const updateList = () =>{
    taskListHTML = document.querySelector('.task-list');
    taskListHTML.innerHTML = '';
    taskList.forEach(task => {
        taskListHTML.innerHTML +=
        `
        <li class="task-list-item" id="${task.id}">
            <p class="list-item-title">${task.title}</p>
            <p class="list-item-description">${task.description}</p>
            <div class="list-button-container">
                <button class="list-item-edit" onclick={editTask(event)}>Edit</button>
                <button class="list-item-delete" onclick={deleteTask(event)}>Delete</button>
            </div>
            </li>
            `
    });
}

var currentId, currentTitle, currentDescription;

const editTask = (event) => {

    taskDiv = document.querySelector('#editDivTask');
    setVisibility(taskDiv, 'visible')
    //old task id
    currentId = event.srcElement.parentElement.parentElement.id;
    
    //keep values on form appeared
    taskDiv.children[0].children[1].value = event.srcElement.parentElement.parentElement.children[0].innerHTML;
    taskDiv.children[0].children[3].value = event.srcElement.parentElement.parentElement.children[1].innerHTML;
    
}

const updateTask = (id, title, description) =>{
    oldId = taskList.findIndex( task => task.id == id);
    taskList[oldId].title = title;
    taskList[oldId].description = description;
}

const confirmEdition = (event) => {
    newTitle = event.srcElement.parentElement.parentElement.children[1].value;
    newDescription = event.srcElement.parentElement.parentElement.children[3].value;
    taskDiv = document.querySelector('#editDivTask');
    updateTask(currentId, newTitle, newDescription);
    updateList();
    setVisibility(taskDiv, 'hidden');
}

const deleteTask = event =>{
    currentId = Number(event.srcElement.parentElement.parentElement.id);
    title = event.srcElement.parentElement.parentElement.children[0].innerHTML;
    description = event.srcElement.parentElement.parentElement.children[1].innerHTML;

    taskToDelete = taskList.map(task => task.id).indexOf(currentId);
    delete taskList[taskToDelete]
    updateList();
}

const cancelAction = event =>{
   const editDiv = event.srcElement.parentElement.parentElement.parentElement;
   setVisibility(editDiv, 'hidden') 
}
