"use strict";
const buttonToggle = document.querySelector('.buttonToggle');
const btn_addTask = document.querySelector('#btn_addTask');
const inputTask = document.querySelector('.taskDescrip');
const btn_setName = document.querySelector('.btn-setName');
const motivationPhrase = document.querySelector('#motivationPhrase');
var taskState;
(function (taskState) {
    taskState["Done"] = "done";
    taskState["Pending"] = "pending";
    taskState["Deleted"] = "deleted";
})(taskState || (taskState = {}));
let listTask = [];
function getTask(taskId) {
    const task = listTask.find(task => task.taskId === taskId);
    return task;
}
function saveTask(task) {
    if (!getTask(task.taskId)) {
        listTask.push(task);
        localStorage.setItem('tasks', JSON.stringify(listTask));
    }
    else {
        listTask.forEach((taskCopy) => {
            if (taskCopy.taskId === task.taskId) {
                taskCopy.descrip = task.descrip;
                taskCopy.state = task.state;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(listTask));
    }
}
function updateTask(taskId) {
    const inputCheck = document.querySelector(`#inputCheck${taskId}`);
    const inputText = document.querySelector(`#inputText${taskId}`);
    const task = {
        taskId: taskId,
        descrip: inputText.value,
        state: inputCheck.checked ? taskState.Done : taskState.Pending
    };
    saveTask(task);
    renderizarListTask();
}
function deleteTask(taskId) {
    const newList = listTask.filter(task => task.taskId !== taskId);
    listTask = [...newList];
    localStorage.setItem('tasks', JSON.stringify(listTask));
    renderizarListTask();
    toggleWarningContainer();
}
function getListTasks() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        const listTask = JSON.parse(tasks);
        return listTask;
    }
    return [];
}
function setUserName(name) {
    localStorage.setItem('userName', name);
    motivationPhrase.classList.add('appear');
    motivationPhrase.innerHTML = `Vamos a cumplir tus metas ${name}`;
}
function toggleWarningContainer() {
    const warningContainer = document.querySelector('.warning');
    if (getListTasks().length > 0) {
        warningContainer.style.display = 'none';
        listTask = [...getListTasks()];
    }
    else {
        warningContainer.style.display = 'block';
    }
}
function getNextTaskId() {
    const tasks = getListTasks();
    console.log(JSON.stringify(tasks));
    if (tasks.length > 0) {
        return tasks.sort((a, b) => b.taskId - a.taskId)[0].taskId + 1;
    }
    return 1;
}
function renderizarListTask() {
    const ul = document.querySelector('#ul');
    let list = '';
    const tasks = getListTasks();
    for (let i = 0; i < tasks.length; i++) {
        list += `
        <li id="li${tasks[i].taskId}">
        <input  onchange="updateTask(${tasks[i].taskId})" id="inputCheck${tasks[i].taskId}" style="font-size:0.5rem;" class="form-check-input" type="checkbox" value="" ${tasks[i].state === 'done' ? 'checked' : ''} >
        <button type="button"  onclick="deleteTask(${tasks[i].taskId})"  class="btn_delete btn btn-danger">
        <i class='bx bx-trash'></i>
        </button>
        <input id="inputText${tasks[i].taskId}" onchange="updateTask(${tasks[i].taskId})" class="${tasks[i].state === 'done' ? 'lineThrough' : ''}" value="${tasks[i].descrip}"/>
        
        </li>
        `;
    }
    ul.innerHTML = list;
}
buttonToggle.addEventListener('click', () => {
    const toggleIcon = document.querySelector('.toggleIcon');
    let listClass = Array.from(toggleIcon.classList);
    if (listClass[1].endsWith('off')) {
        toggleIcon.classList.remove('bi-toggle-off');
        toggleIcon.classList.add('bi-toggle-on');
        document.body.style.backgroundColor = '#000';
    }
    if (listClass[1].endsWith('on')) {
        toggleIcon.classList.remove('bi-toggle-on');
        toggleIcon.classList.add('bi-toggle-off');
        document.body.style.backgroundColor = '#f1f1f1';
    }
});
btn_addTask.addEventListener('click', () => {
    let value = inputTask.value;
    if (value) {
        const task = {
            taskId: getNextTaskId(),
            descrip: value,
            state: taskState.Pending
        };
        saveTask(task);
        renderizarListTask();
        toggleWarningContainer();
        inputTask.value = '';
        inputTask.focus();
    }
});
inputTask.addEventListener('keyup', (e) => {
    let value = inputTask.value;
    if (e.key == 'Enter' && value) {
        const task = {
            taskId: getNextTaskId(),
            descrip: value,
            state: taskState.Pending
        };
        saveTask(task);
        renderizarListTask();
        toggleWarningContainer();
        inputTask.value = '';
        inputTask.focus();
    }
});
btn_setName.addEventListener('click', () => {
    swal("Write your name:", {
        content: "input",
    }).then((value) => {
        if (value) {
            setUserName(value);
            btn_setName.classList.toggle('disactive');
        }
    });
});
motivationPhrase.addEventListener('click', () => {
    swal("Write something here:", {
        content: "input",
    }).then((value) => {
        if (value) {
            setUserName(value);
        }
    });
});
window.addEventListener('load', () => {
    renderizarListTask();
    const userName = localStorage.getItem('userName');
    toggleWarningContainer();
    if (getListTasks().length > 0) {
        listTask = [...getListTasks()];
    }
    if (userName) {
        btn_setName.classList.toggle('disactive');
        setUserName(userName);
    }
});
//# sourceMappingURL=index.js.map