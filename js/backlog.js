function init() {
  includeHTML();
  addNewBacklogTR();
}

function renderBacklogTask() {
  let table = document.getElementById('backlogTable');
}

function addNewBacklogTR() {
  let table = document.getElementById('backlogTable');
  let newRow = table.insertRow(table.rows.length);
  newRow.classList.add('task-row');
  newRow.setAttribute('id', newRow.rowIndex);
  console.log(newRow.rowIndex);
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);

  cell1.innerHTML = `
  <div class="user-container">
    <div id="userColorBL"></div>
    <img id="userImgBL" src="assets/img/icon plus.png" alt="" />
    <div class="name-div">
      <span id='nameBL'>Eric Singelmann-Seimel</span>
      <span id='emailBL' class="email">eric@gmail.com</span>
    </div>
  </div>
  `;

  cell2.innerHTML = `
  <div id='categoryBL'>
    Marketing
  </div>
  `;

  cell3.innerHTML = `
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
  similique, tempora atque rem ea delectus minus sed maxime nisi.
  Sed dolor maxime placeat. Ipsum possimus ab unde expedita vero
  perspiciatis.
  `;
}

function addRowHandler(table) {
  let rows = table.getElementsByTagName('tr');
  for (i = 1; i < rows.length; i++) {
    let row = table.rows[i];
    row.onclick = () => {};
  }
}
