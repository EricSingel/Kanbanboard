let x = window.matchMedia('(max-width: 1000px)');
x.addEventListener('change', renderBacklogTask);

async function init() {
  await load();
  includeHTML();
  renderBacklogTask();
}

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

function hTableBigger1000px(headerTable) {
  headerTable.innerHTML = `
  <tr>
  <th>ASSIGNED TO</th>
  <th>CATEGORY</th>
  <th>DETAILS</th>
  </tr>
  `;
}

function hTableSmaller1000px(headerTable) {
  headerTable.innerHTML = `
  <tr>
    <th>TASKS</th>
  </tr>
  `;
}

function noTasksInArray(tasksTable, headerTable) {
  tasksTable.innerHTML =
    '<tr><td style="text-align: center">No Tasks</td></tr>';
  if (x.matches) {
    hTableSmaller1000px(headerTable);
  } else {
    hTableBigger1000px(headerTable);
  }
}

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
  <button onclick="addTaskToBoard(${i})" class="bl-btn"><img title="Add to Board" src='assets/img/analysis.png'></button>
  <button onclick="deleteTask(${i})" class="bl-btn"><img title="Delete" src='assets/img/bin.png'></button>
  `;

  addTasksValues(task, i);
  addUserColor(task, i);
  return newRow;
}

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

async function deleteTask(i) {
  let row = document.getElementById(i);
  tasks.splice(i, 1);
  await save();
  row.parentNode.removeChild(row);
  renderBacklogTask();
}

function closeFeedback() {
  document.getElementById('addedToBoard').classList.add('d-none');
}

async function addTaskToBoard(i) {
  let row = document.getElementById(i);
  let add_to_board = document.getElementById('addedToBoard');
  tasks[i].status = 'ToDo';
  await save();
  row.parentNode.removeChild(row);
  add_to_board.classList.remove('d-none');
  renderBacklogTask();
}

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
