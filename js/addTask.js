function init() {
  includeHTML();
}

TheUsersOfTheTask = [];

function addTask() {
  let title = document.getElementById('title').value;
  let date = document.getElementById('date').value;
  let category = document.getElementById('category').value;
  let urgency = document.getElementById('urgency').value;
  let description = document.getElementById('description').value;
  let user = TheUsersOfTheTask[TheUsersOfTheTask.length - 1];
  let task = {
    title: title,
    date: date,
    category: category,
    urgency: urgency,
    description: description,
    status: '',
    user: user,
    board: 'false',
  };

  tasks.push(task);
  save();
}

function showUsers() {
  let userSelectMenu = document.getElementById('userSelectMenu');
  let userSelect = document.getElementById('userSelect');
  userSelect.innerHTML = '';
  userSelectMenu.classList.toggle('userSelectOpen');

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    userSelect.innerHTML += `
    <div onclick="addUserToTask(${i})" class="Addtask-table-section-Users-Select">
      <img src="${user.img}" class="cursor-pointer" alt="" />
      <span>${user.name}</span>
    </div>
    `;
  }
}

function addUserToTask(i) {
  TheUsersOfTheTask.push(users[i]);
  let userSelectMenu = document.getElementById('userSelectMenu');
  userSelectMenu.classList.toggle('userSelectClose');
}
