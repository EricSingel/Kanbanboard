/**
 * Onload async function
 */
async function init() {
  await load();
  includeHTML();
  showTasks();
}

let currentDragged;

/**
 * Function to filter the state and show the task
 */
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

/**
 * function that paint the color div
 * @param {number} i - the index of the task
 */
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

/**
 * this function generates the task in the board secion
 * 
 * @param {object} element - element is the variable in the showTasks() function
 * @param {number} i - 
 * 
 */
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
          <option hidden value="" selected></option>
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
  showTasks();
  // switch (dropdownState) {
  //   case 'ToDo':
  //     document.getElementById('todoOpt').selected = 'true';
  //     break;
  //   case 'inProgress':
  //     document.getElementById('inprogOpt').selected = 'true';
  //     document.getElementById('todoOpt').selected = 'false';
  //     break;
  //   case 'Testing':
  //     document.getElementById('testOpt').selected = 'true';
  //     document.getElementById('todoOpt').selected = 'false';
  //     break;
  //   case 'Done':
  //     document.getElementById('doneOpt').selected = 'true';
  //     document.getElementById('todoOpt').selected = 'false';
  //     break;
  // }
  await save();
}

/**
 * Function to delete the asks in board
 * @param {number} i - index to know which task should be deleted
 * @param {*} event - this event is for the stopPropagation
 */
async function deleteTask(i, event) {
  event.stopPropagation();
  tasks.splice(i, 1);
  await save();
  showTasks();
}

/**
 * this function opens the task with more details
 * @param {number} i - index to know whick task should be opened
 */
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
        <h2>Title</h2>
        <p>${task['title']}</p>
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

/**
 * function that shows the whole task with more informaton
 */
function showWholeTask() {
  document.getElementById('taskBigger').classList.add('transform-task');
}

/**
 *this function closes the whole task with more information 
 */
function closeWholeTask() {
  document.getElementById('taskBigger').classList.remove('transform-task');
}

/**
 * function to move the task
 * @param {HTMLElement} id 
 */
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

/**
 * this function moves the task to the right state
 * @param {Parameters} status - the state of the board fields: todo, inprogress, testing and done
 */
function moveTo(status) {
  tasks[currentDragged]['status'] = status;
  showTasks();
  save();
}
