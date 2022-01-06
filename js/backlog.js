async function init() {
  await load();
  includeHTML();
  renderBacklogTask();
}

function renderBacklogTask() {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.status != '') {
    } else {
      // addNewBacklogTR(task, i);
      addRowHandler(addNewBacklogTR(task, i), i);
    }
  }
}

function addNewBacklogTR(task, i) {
  let table = document.getElementById('backlogTable');
  let newRow = table.insertRow(table.rows.length);
  newRow.classList.add('task-row');
  // newRow.setAttribute('id', newRow.rowIndex);
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);

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

function closeFeedback(){
  document.getElementById('addedToBoard').classList.add('d-none');
}

function addRowHandler(row, i) {
  let table = document.getElementById('backlogTable');
  let add_to_board = document.getElementById('addedToBoard');
  row.onclick = () => {
    tasks[i].status = 'ToDo';
    save();
    table.deleteRow(row.rowIndex);
    add_to_board.classList.remove('d-none');
  };
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
