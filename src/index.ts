const buttonToggle = <HTMLElement>document.querySelector('.buttonToggle')
const btn_addTask = <HTMLElement>document.querySelector('#btn_addTask')
const inputTask = <HTMLInputElement>document.querySelector('.taskDescrip')
const btn_setName = <HTMLElement>document.querySelector('.btn-setName')
const motivationPhrase = <HTMLElement>document.querySelector('#motivationPhrase')

declare var swal: any;

enum taskState {Done = 'done', Pending = 'pending',Deleted ='deleted'}

interface task{
    taskId : number,
    descrip : string,
    state : taskState
}

let listTask : task[] = []


function getTask(taskId : number){
    const task : task | undefined = listTask.find(task => task.taskId === taskId)
    return task
}

function saveTask( task :task){
    if(!getTask(task.taskId)){
        listTask.push(task)
        localStorage.setItem('tasks',JSON.stringify(listTask))
    }else{
        listTask.forEach((taskCopy)=>{
            if (taskCopy.taskId === task.taskId) {
                taskCopy.descrip = task.descrip              
                taskCopy.state = task.state              
            }
        })
        localStorage.setItem('tasks',JSON.stringify(listTask))

    }
}

function updateTask(taskId : number){
    const inputCheck = <HTMLInputElement>document.querySelector(`#inputCheck${taskId}`)
    const inputText = <HTMLInputElement>document.querySelector(`#inputText${taskId}`)
    const task : task = {
        taskId : taskId,
        descrip : inputText.value,
        state : inputCheck.checked? taskState.Done : taskState.Pending 
    }
    saveTask(task)
    renderizarListTask()
}

function deleteTask(taskId : number){
    const newList = listTask.filter(task=> task.taskId !== taskId)
    listTask = [...newList]
    localStorage.setItem('tasks',JSON.stringify(listTask))
    renderizarListTask()
    toggleWarningContainer()
}

function getListTasks() : task[]{
    const tasks = localStorage.getItem('tasks')
    if (tasks) {
        const listTask : task[]=JSON.parse(tasks)
        return listTask
    }
    return []
}

function setUserName(name : string) {
    localStorage.setItem('userName',name)
    motivationPhrase.classList.add('appear')
    motivationPhrase.innerHTML = `Vamos a cumplir tus metas ${name}`
}
function toggleWarningContainer(){
    const warningContainer = <HTMLElement>document.querySelector('.warning')

    if (getListTasks().length > 0) {
        warningContainer.style.display='none'
        listTask = [... getListTasks()]
    }else{
        warningContainer.style.display='block'
    }
}

function getNextTaskId() : number{
    const tasks =getListTasks()
    console.log(JSON.stringify(tasks))
    if (tasks.length > 0) {
        return tasks.sort((a,b)=>b.taskId-a.taskId)[0].taskId + 1
    }
    return 1
}
function renderizarListTask(){
    const ul = <HTMLElement>document.querySelector('#ul')
    let list : string = ''
    const tasks : task[] = getListTasks()
    for (let i = 0; i < tasks.length; i++) {
        list += `
        <li id="li${tasks[i].taskId}">
        <input  onchange="updateTask(${tasks[i].taskId})" id="inputCheck${tasks[i].taskId}" style="font-size:0.5rem;" class="form-check-input" type="checkbox" value="" ${tasks[i].state==='done'? 'checked' : ''} >
        <button type="button"  onclick="deleteTask(${tasks[i].taskId})"  class="btn_delete btn btn-danger">
        <i class='bx bx-trash'></i>
        </button>
        <input id="inputText${tasks[i].taskId}" onchange="updateTask(${tasks[i].taskId})" class="${tasks[i].state==='done'? 'lineThrough' : ''}" value="${tasks[i].descrip}"/>
        
        </li>
        `
    }


    ul.innerHTML = list
}
buttonToggle.addEventListener('click',()=>{
    const toggleIcon = <HTMLElement>document.querySelector('.toggleIcon')
    let listClass: string[] = Array.from(toggleIcon.classList);
    if (listClass[1].endsWith('off')) {
        toggleIcon.classList.remove('bi-toggle-off')
        toggleIcon.classList.add('bi-toggle-on')
        document.body.style.backgroundColor = '#000'
    }
    if (listClass[1].endsWith('on')){
        toggleIcon.classList.remove('bi-toggle-on')
        toggleIcon.classList.add('bi-toggle-off')
        document.body.style.backgroundColor = '#f1f1f1'
    }
})

btn_addTask.addEventListener('click',()=>{
    let value : string = inputTask.value
    if (value) {
        const task : task = {
            taskId : getNextTaskId(),
            descrip : value,
            state : taskState.Pending
        }
        saveTask(task)
        renderizarListTask()
        toggleWarningContainer()
    }
})
inputTask.addEventListener('keyup',(e)=>{
    let value = inputTask.value
    if(e.key == 'Enter' && value){
        const task : task = {
            taskId : getNextTaskId(),
            descrip : value,
            state : taskState.Pending
        }
        saveTask(task)
        renderizarListTask()
        toggleWarningContainer()
    }
})
btn_setName.addEventListener('click', () => {
    swal("Write something here:", {
      content: "input",
    }).then((value : string) => {
      if (value) {
        setUserName(value);
        btn_setName.classList.toggle('disactive');
      }
    });
});
motivationPhrase.addEventListener('click',()=>{
    swal("Write something here:", {
        content: "input",
    }).then((value : string) => {
        if (value) {
          setUserName(value);
        }
    });
})

window.addEventListener('load',()=>{
    renderizarListTask()
    const userName =<string>localStorage.getItem('userName')
    toggleWarningContainer()
    if (getListTasks().length > 0) {
        listTask = [... getListTasks()]
    }
    if (userName) {
       btn_setName.classList.toggle('disactive')
       setUserName(userName) 
    }
})


