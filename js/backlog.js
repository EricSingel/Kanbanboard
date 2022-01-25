let x = window.matchMedia('(max-width: 1000px)');
x.addEventListener('change', renderBacklogTask);

/**
 * Onload function
 */
async function init() {
  await load();
  includeHTML();
  renderBacklogTask();
}

/**
 * function to render new Tasks in Desktopview
 */
function renderBacklogTask() {
  let tasksTable = document.getElementById('backlogTable');
  let headerTable = document.getElementById('table-heading');
  let backlogTasks = tasks.filter((t) => t['status'] == '');

  if (backlogTasks.length == 0) {
    noTasksInArray(tasksTable, headerTable);
  } else {
    tasksTable.innerHTML = '';
    if (x.matches) {
      mobielView(headerTable);
    } else {
      desktopView(headerTable);
    }
  }
}

/**
 * function to render new headertable at change to mobileview
 *
 * @param {HTMLElement} headerTable is the table to describe the tasks
 */
function mobielView(headerTable) {
  hTableSmaller1000px(headerTable);
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.status != '') {
    } else {
      addNewBacklogTRMobile(task, i);
    }
  }
}

/**
 * function to walk through the tasks array at change to desktopview
 *
 * @param {HTMLElement} headerTable
 */
function desktopView(headerTable) {
  headerTable.innerHTML = '';
  hTableBigger1000px(headerTable);

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.status != '') {
    } else {
      addNewBacklogTR(task, i);
    }
  }
}

/**
 * function for the table tags at desktopview
 *
 * @param {HTMLElement} headerTable
 */
function hTableBigger1000px(headerTable) {
  headerTable.innerHTML = `
  <tr>
  <th>ASSIGNED TO</th>
  <th>CATEGORY</th>
  <th>DETAILS</th>
  </tr>
  `;
}

/**
 * function for the table tags at mobileview
 *
 * @param {HTMLElement} headerTable
 */
function hTableSmaller1000px(headerTable) {
  headerTable.innerHTML = `
  <tr>
    <th>TASKS</th>
  </tr>
  `;
}

/**
 * function to render view if no tasks available
 *
 * @param {HTMLElement} tasksTable
 * @param {HTMLElement} headerTable
 */
function noTasksInArray(tasksTable, headerTable) {
  tasksTable.innerHTML =
    '<tr><td style="text-align: center">No Tasks</td></tr>';
  if (x.matches) {
    hTableSmaller1000px(headerTable);
  } else {
    hTableBigger1000px(headerTable);
  }
}

/**
 * function to render a new task in a table row for desktopview
 *
 * @param {Object} task
 * @param {number} i is the index of the task in the tasks array
 */
function addNewBacklogTR(task, i) {
  let table = document.getElementById('backlogTable');
  let newRow = table.insertRow(table.rows.length);
  newRow.classList.add('task-row');
  newRow.setAttribute('id', i);
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);

  cell1.innerHTML = `
  <div class="user-container">
    <div id="userColorBL${i}" class="userColorBL"></div>
    <img class="user-img-bl" id="userImgBL${i}" src="assets/img/icon plus.png" alt="" />
    <div class="name-div">
      <span id='nameBL${i}'>${task.user.name}</span>
      <span id='emailBL${i}' class="email">${task.user.email}</span>
    </div>
  </div>
  `;

  cell2.innerHTML = `
  <div class="user-container2" id='categoryBL${i}'>
    Marketing
  </div>
  `;

  cell3.innerHTML = `
  <div id = 'detailsBL${i}'>
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
  similique, tempora atque rem ea delectus minus sed maxime nisi.
  Sed dolor maxime placeat. Ipsum possimus ab unde expedita vero
  perspiciatis.
  </div>
  `;

  cell4.innerHTML = `
  <div class="btn-container">
  <button  onclick="addTaskToBoard(${i})" class="bl-btn"><img id="btnAdd" class="img-add" src='assets/img/analysis.png'></button>
  <div id="ttAdd" class="tooltip">Add to Board</div>
  <button id="btnDelete" onclick="deleteTask(${i})" class="bl-btn"><img class="img-delete" src='assets/img/bin.png'></button>
  <div id="ttDelete" class="tooltip">Delete</div>
  </div>
  `;

  addTasksValues(task, i);
  addUserColor(task, i);
  addTooltip();
}

function addTooltip() {
  let btnAdd = document.getElementById('btnAdd');
  let ttAdd = document.getElementById('ttAdd');
  let btnDelete = document.getElementById('btnDelete');
  let ttDelete = document.getElementById('ttDelete');
  btnAdd.addEventListener('mouseover', showTooltip);
  btnAdd.addEventListener('mouseout', hideTooltip);
  btnDelete.addEventListener('mouseover', showTooltip1);
  btnDelete.addEventListener('mouseout', hideTooltip1);
  function showTooltip() {
    ttAdd.classList.add('tt-add');
  }

  function hideTooltip() {
    ttAdd.classList.remove('tt-add');
  }

  function showTooltip1() {
    ttDelete.classList.add('tt-delete');
  }

  function hideTooltip1() {
    ttDelete.classList.remove('tt-delete');
  }
}

/**
 * function to put the values in the rendered table row at desktopview
 *
 * @param {Object} task
 * @param {number} i is the index of the task in the tasks array
 */
function addTasksValues(task, i) {
  let category = document.getElementById('categoryBL' + i);
  let details = document.getElementById('detailsBL' + i);
  let img = document.getElementById('userImgBL' + i);
  img.src = task.user.img;
  category.innerHTML = task.category;
  details.innerHTML = `
  ${task.title}<br>
  Due Date: ${task.date}<br>
  Urgency: ${task.urgency}
  `;
}

/**
 * function to put the values in the rendered table row at mobileview
 *
 * @param {Object} task
 * @param {number} i is the index of the task in the tasks array
 */
function addTasksValuesMobile(task, i) {
  let details = document.getElementById('detailsBL' + i);
  let img = document.getElementById('userImgBL' + i);

  img.src = task.user.img;
  details.innerHTML = `
  <span title="Title">${task.title}</span><br>
  <span title="Category">${task.category}</span><br>
  <span title="Name">${task.user.name}</span>
  `;
}

/**
 * function to delete a task in the table
 *
 * @param {number} i is the index of the task at the table
 */
async function deleteTask(i) {
  let row = document.getElementById(i);
  tasks.splice(i, 1);
  await save();
  row.parentNode.removeChild(row);
  renderBacklogTask();
}

/**
 * function to close the feedback div
 */
function closeFeedback() {
  document.getElementById('addedToBoard').classList.add('d-none');
}

/**
 * function to add the task to the board
 *
 * @param {number} i is the index of the task at the table
 */
async function addTaskToBoard(i) {
  let row = document.getElementById(i);
  let add_to_board = document.getElementById('addedToBoard');
  tasks[i].status = 'ToDo';
  await save();
  row.parentNode.removeChild(row);
  add_to_board.classList.remove('d-none');
  renderBacklogTask();
}

/**
 * function to show the category with a color in a div
 *
 * @param {Object} task
 * @param {number} i is the index of the task at the table
 */
function addUserColor(task, i) {
  let category = task.category;
  let userColorDiv = document.getElementById('userColorBL' + i);
  if (category == 'Marketing') {
    userColorDiv.style.backgroundColor = 'blue';
  } else if (category == 'Sale') {
    userColorDiv.style.backgroundColor = 'red';
  } else {
    userColorDiv.style.backgroundColor = 'green';
  }
}

/**
 * function to render a new task in a table row for mobileview
 *
 * @param {Object} task
 * @param {number} i is the index of the task in the tasks array
 */
function addNewBacklogTRMobile(task, i) {
  let table = document.getElementById('backlogTable');
  let newRow = table.insertRow(table.rows.length);
  newRow.classList.add('task-row');
  newRow.setAttribute('id', i);
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);

  cell1.innerHTML = `
  <div class="user-container">
    <div id="userColorBL${i}" class="userColorBL"></div>
    <img class="user-img-bl" id="userImgBL${i}" src="assets/img/icon plus.png" alt="" />
    <div class="details-bl" id = 'detailsBL${i}'></div>
  </div>
  `;
  cell2.innerHTML = `
  <button onclick="addTaskToBoard(${i})" class="bl-btn"><img title="Add to Board" src='assets/img/analysis.png'></button>
  <button onclick="deleteTask(${i})" class="bl-btn"><img title="Delete" src='assets/img/bin.png'></button>
  `;

  addTasksValuesMobile(task, i);
  addUserColor(task, i);
  return newRow;
}
