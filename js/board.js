async function init() {
  includeHTML();
  await load();
  showTasks();
}

let currentDragged;

function showTasks() {
  let ToDoTask = tasks.filter((t) => t['status'] == 'ToDo');
  document.getElementById('ToDo').innerHTML = '';

  for (let i = 0; i < ToDoTask.length; i++) {
    const element = ToDoTask[i];
    document.getElementById('ToDo').innerHTML += generateTask(
      element,
      element.id
    );
    paintTasks(element.id);
  }

  let inProgressTask = tasks.filter((t) => t['status'] == 'inProgress');
  document.getElementById('inProgress').innerHTML = '';

  for (let i = 0; i < inProgressTask.length; i++) {
    const element = inProgressTask[i];
    document.getElementById('inProgress').innerHTML += generateTask(
      element,
      element.id
    );
    paintTasks(element.id);
  }

  let testingTask = tasks.filter((t) => t['status'] == 'Testing');
  document.getElementById('Testing').innerHTML = '';

  for (let i = 0; i < testingTask.length; i++) {
    const element = testingTask[i];
    document.getElementById('Testing').innerHTML += generateTask(
      element,
      element.id
    );
    paintTasks(element.id);
  }

  let doneTask = tasks.filter((t) => t['status'] == 'Done');
  document.getElementById('Done').innerHTML = '';

  for (let i = 0; i < doneTask.length; i++) {
    const element = doneTask[i];
    document.getElementById('Done').innerHTML += generateTask(
      element,
      element.id
    );
    paintTasks(element.id);
  }
}

function paintTasks(i) {
  if (tasks[i].status == 'ToDo') {
    document.getElementById('color-line' + i).classList.add('blue');
  }

  if (tasks[i].status == 'inProgress') {
    document.getElementById('color-line' + i).classList.add('yellow');
  }

  if (tasks[i].status == 'Done') {
    document.getElementById('color-line' + i).classList.add('green');
  }

  if (tasks[i].status == 'Testing') {
    document.getElementById('color-line' + i).classList.add('red');
  }
}

function generateTask(element, i) {
  return `
    <div onclick="wholeTask(${i})" id="allTasks" ondragstart="startDragging(${element['id']})" draggable="true">
        <div id="color-line${i}" class="color-line"></div>
        <p class="title">${element['title']}</p>
            <div class="person-info">
                <img src="${element.user.img}">
                <p>${element.user.name}</p>
            </div>
        <button>Delete</button>
    </div>`;
}

function wholeTask(i) {
  document.getElementById('taskBigger').innerHTML = '';
  const task = tasks[i];
  for (let i = 0; i < tasks.length; i++) {
    document.getElementById('taskBigger').innerHTML = `
    <div>
      <div class="close-whole-task">
        <img onclick="closeWholeTask()" src="assets/img/chevron-up.ico">
      </div>
     
      <div class="task-title-div">
        <h1>${task['title']}</h1>
        <p>${task['description']}</p>
      </div>
     
      <div class="user-div">
        <p>Assigned to</p>
          <div class="user-div-person">
            <img src="${task.user.img}">
            <p>${task.user.name}</p>
          </div>      
      </div> 
    </div>
    `;
  }

  showWholeTask();
}

function showWholeTask() {
  document.getElementById('taskBigger').classList.add('transform-task');
}

function closeWholeTask() {
  document.getElementById('taskBigger').classList.remove('transform-task');
}

function startDragging(id) {
  currentDragged = id;
}

function highlight(id) {
  document.getElementById(id).classList.add('background-fields');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('background-fields');
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(status) {
  tasks[currentDragged]['status'] = status;

  showTasks();
}
