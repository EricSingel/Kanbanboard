async function init() {
  includeHTML();
  await load();
  renderBacklogTask();
}

function renderBacklogTask() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    addNewBacklogTR(task, i);
  }
}

function addNewBacklogTR(task, i) {
  let table = document.getElementById('backlogTable');
  let newRow = table.insertRow(table.rows.length);
  newRow.classList.add('task-row');
  newRow.setAttribute('id', newRow.rowIndex);
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);

  cell1.innerHTML = `
  <div class="user-container">
    <div id="userColorBL${i}"></div>
    <img id="userImgBL${i}" src="assets/img/icon plus.png" alt="" />
    <div class="name-div">
      <span id='nameBL${i}'>${task.user}</span>
      <span id='emailBL${i}' class="email">${task.user}</span>
    </div>
  </div>
  `;

  cell2.innerHTML = `
  <div id='categoryBL${i}'>
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

  addTasksValues(task, i);
}

function addTasksValues(task, i) {
  let category = document.getElementById('categoryBL' + i);
  let details = document.getElementById('detailsBL' + i);

  category.innerHTML = task.category;
  details.innerHTML = `
  ${task.title}<br>
  Due Date: ${task.date}<br>
  Urgency: ${task.urgency}
  `;
}

function addRowHandler(table) {
  let rows = table.getElementsByTagName('tr');
  for (i = 1; i < rows.length; i++) {
    let row = table.rows[i];
    row.onclick = () => {};
  }
}
