// Знаходимо елемент на сторінці

const form = document.querySelector('#form');
const input = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

let tasks = [];

if(localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}


checkEmptyTask()

function addTask(event) {
    event.preventDefault();
    
    // записуємо що ввели в строку вводу в тасктекст
    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask);

    // css class if task is done
    renderTask(newTask);

// очистити поле вводу і повернути фокус

taskInput.value = "";
taskInput.focus();

checkEmptyTask()
saveToLocalStorage()
};

function deleteTask(event) {
    if(event.target.dataset.action !== 'delete') return;
 
    const parentNode = event.target.closest('li');
    parentNode.remove();

    const id = Number(parentNode.id);

    // знаходимо індекс задачі в масиві
    const index = tasks.findIndex((task) => task.id == id);

    tasks.splice(index, 1);

    //видалення задачі фільтрацією масиву
    //tasks = tasks.filter((task) => task.id !== id);

    checkEmptyTask()
    saveToLocalStorage()
}

function doneTask(event) {
    if(event.target.dataset.action !== 'done') return;
        const parentNode = event.target.closest('li');
        const taskTitle = parentNode.querySelector('span');
        taskTitle.classList.add('task-title--done');

        const id = Number(parentNode.id)
        const task = tasks.find( (task) => task.id === id)
        task.done = !task.done
        console.log(task)

        saveToLocalStorage()
}

function checkEmptyTask() {
    if (tasks.length == 0) {
        const emptyList = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`

    tasksList.insertAdjacentHTML('afterbegin', emptyList);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${task.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
</li>`

tasksList.insertAdjacentHTML('beforeend', taskHTML);
}