//TODO Beispielkarte

let tasks = [{
    'id': 0,
    'title': 'Nav-Bar erstellen',
    category: 'ToDo'
}, {
    'id': 1,
    'title': 'E-Mails beantworten',
    category: 'inProgress'
}, {
    'id': 2,
    'title': 'Kundengespräch',
    category: 'Done'
},{
    'id': 3,
    'title': 'software testen',
    category: 'Testing'
},{
    'id': 4,
    'title': 'app responsive machen',
    category: 'ToDo'
}];

let currentDragged;

function showTasks(){
let ToDoTask = tasks.filter(t => t['category'] == 'ToDo');
document.getElementById('ToDo').innerHTML = '';

for(let i = 0;i < ToDoTask.length; i++){
    const element = ToDoTask[i];
    document.getElementById('ToDo').innerHTML += generateTask(element);
}

let inProgressTask = tasks.filter(t => t['category'] == 'inProgress');
document.getElementById('inProgress').innerHTML = '';

for(let i = 0;i < inProgressTask.length; i++){
    const element = inProgressTask[i];
    document.getElementById('inProgress').innerHTML += generateTask(element);
}

let doneTask = tasks.filter(t => t['category'] == 'Done');
document.getElementById('Done').innerHTML = '';

for(let i = 0;i < doneTask.length; i++){
    const element = doneTask[i];
    document.getElementById('Done').innerHTML += generateTask(element);
}

let testingTask = tasks.filter(t => t['category'] == 'Testing');
document.getElementById('Testing').innerHTML = '';


for(let i = 0;i < testingTask.length; i++){
    const element = testingTask[i];
    document.getElementById('Testing').innerHTML += generateTask(element);
}
paintTasks();
}

function paintTasks(){
    if(tasks.category == 'ToDO'){
        document.getElementById('color-line').classList.add('blue');
    }

    if(tasks.category == 'inProgress'){
        document.getElementById('color-line').classList.add('yellow');
    }

    if(tasks.category == 'Testing'){
        document.getElementById('color-line').classList.add('red');
    }

    if(tasks.category == 'Done'){
        document.getElementById('color-line').classList.add('green');
    }
}

function generateTask(element){
    return `
    <div id="allTasks" ondragstart="startDragging(${element['id']})" draggable="true">
    <div id="color-line"></div>
    <p>${element['title']}</p>
    </div>`;
}

function startDragging(id){
    currentDragged = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category){
    tasks[currentDragged]['category'] = category;
    showTasks();
   
}