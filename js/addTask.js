async function init() {
  await load();
  await loadAtAddTask();
  includeHTML();
}

TheUsersOfTheTask = {};

function eraseTask() {
  document.getElementById('title').value = '';
  document.getElementById('date').value = '';
  document.getElementById('category').value = '';
  document.getElementById('urgency').value = '';
  document.getElementById('description').value = '';
  document.getElementById('userImages').innerHTML = '';
}

async function addTask() {
  let title = document.getElementById('title').value;
  let date = document.getElementById('date').value;
  let category = document.getElementById('category').value;
  let urgency = document.getElementById('urgency').value;
  let description = document.getElementById('description').value;
  // let user = TheUsersOfTheTask[TheUsersOfTheTask.length - 1];
  let task = {
    title: title,
    date: date,
    category: category,
    urgency: urgency,
    description: description,
    status: '',
    user: TheUsersOfTheTask,
  };

  tasks.push(task);
  await save();
  eraseTask();
  window.location = 'backlog.html';
}

function showUsers() {
  let userSelectMenu = document.getElementById('userSelectMenu');
  let userSelect = document.getElementById('userSelect');
  userSelect.innerHTML = '';
  userSelectMenu.classList.toggle('userSelectOpen');

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    userSelect.innerHTML += `
    <div onclick="addUserToTask(${i})" class="Addtask-table-section-Users-Select cursor-pointer">
      <img src="${user.img}" alt="" />
      <span>${user.name}</span>
    </div>
    `;
  }
}

function addUserToTask(i) {
  let userSelectMenu = document.getElementById('userSelectMenu');
  let userImages = document.getElementById('userImages');

  TheUsersOfTheTask = users[i];
  userSelectMenu.classList.remove('userSelectOpen');
  userImages.innerHTML = `<img src="${users[i].img}" />`;
}
