async function init() {
  await load();
  includeHTML();
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
    <div class="taskDiv" onclick="wholeTask(${i})" id="allTasks" ondragstart="startDragging(${element['id']})" draggable="true">
        <div id="color-line${i}" class="color-line"></div>
        <p class="title">${element['title']}</p>
            <div class="person-info">
                <img src="${element.user.img}">
                <p>${element.user.name}</p>
            </div>
        <button onclick="deleteTask(${i}, event)">Delete</button>
        <select name="state${i}" id="state${i}" class="dropdown-state" onclick="stopPropogation(event)" onchange="switchState(this, ${i})">
        <option id="todoOpt" value="ToDo">ToDo</option>
        <option id="inprogOpt" value="inProgress">InProgress</option>
        <option id="testOpt" value="Testing">Testing</option>
        <option id="doneOpt" value="Done">Done</option>
      </select>
    </div>`;
}

function stopPropogation(e) {
  e.stopPropagation();
}

async function switchState(selOption, taskId) {
  let dropdownState = selOption.value;
  console.log(dropdownState);

  tasks[taskId].status = dropdownState;
  await showTasks();
  switch (dropdownState) {
    case 'ToDo':
      document.getElementById('todoOpt').selected = 'true';
      break;
    case 'inProgress':
      document.getElementById('inprogOpt').selected = 'true';
      document.getElementById('todoOpt').selected = 'false';
      break;
    case 'Testing':
      document.getElementById('testOpt').selected = 'true';
      document.getElementById('todoOpt').selected = 'false';
      break;
    case 'Done':
      document.getElementById('doneOpt').selected = 'true';
      document.getElementById('todoOpt').selected = 'false';
      break;
  }
  await save();
}

async function deleteTask(i, event) {
  event.stopPropagation();
  tasks.splice(i, 1);
  await save();
  showTasks();
}

function wholeTask(i) {
  document.getElementById('taskBigger').innerHTML = '';
  const task = tasks[i];
  for (let i = 0; i < tasks.length; i++) {
    document.getElementById('taskBigger').innerHTML = `
    <div class="biggerTask">
      <div class="close-whole-task">
        <button onclick="closeWholeTask()">Close</button>
      </div>
    
      <div class="task-title-div">
        <h1>${task['title']}</h1>
      </div>

    <div class="user-div-and-description-div">
      <div class="user-div">
        <h2>Assigned to</h2>
          <div class="user-div-person">
          <img src="${task.user.img}">
        <p>${task.user.name}</p>
      </div>  
         
      </div> 

      <div class="description-div">
          <h2>Description</h2>
          <p>${task['description']}</p>
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
  document.getElementById(id).classList.add('background-fields-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('background-fields-highlight');
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(status) {
  tasks[currentDragged]['status'] = status;

  showTasks();
  save();
}
