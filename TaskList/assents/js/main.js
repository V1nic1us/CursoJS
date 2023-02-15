const inputTasks= document.querySelector('.new-tasks');
const addTasks= document.querySelector('.add-tasks');
const tasks= document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li');
    return li;
}

function criaTask(textInput) {
    const li= createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    clearInput();
    clearTasks(li);
    save();
}

function save() {
    const liTasks = tasks.querySelectorAll('li');
    const listTasks = [];
    
    for (let tasks of liTasks) {
        let taskText= tasks.innerText;
        taskText= taskText.replace('Apagar', '').trim();
        listTasks.push(taskText);
        
        console.log(taskText);
    }

    const tasksJSON= JSON.stringify(listTasks);
    localStorage.setItem('localTasks', tasksJSON)
    console.log(listTasks);
}

function recoverTasks() {
    const tasks= localStorage.getItem('localTasks');
    const listTasks= JSON.parse(tasks)

    for (const tasks of listTasks) {
        criaTask(tasks);
    }
    console.log(listTasks);
}

function clearInput() {
    inputTasks.value ='';
    inputTasks.focus();
}

function clearTasks(li) {
    li.innerText += ' ';
    const deleteButton= document.createElement('button');
    deleteButton.innerText = 'Apagar';
    // deleteButton.classList.add('apagar');
    deleteButton.setAttribute('class', 'apagar');
    deleteButton.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(deleteButton);
}

addTasks.addEventListener('click', function() {
    // console.log(addTasks.value)
    if (!inputTasks.value) return;
    criaTask(inputTasks.value);
});

inputTasks.addEventListener('keypress', function (e) {
    // console.log(e);
    if(e.key=== "Enter"){
        if (!inputTasks.value) return;
        criaTask(inputTasks.value);
    }
})

document.addEventListener('click', function(e) {
    const el= e.target;
    // console.log(e.target);
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        save();
        // console.log('apagar clicado');
    }
})

recoverTasks()