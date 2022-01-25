/**
 * Onload function
 */
async function init() {
  await load();
  includeHTML();
}

TheUsersOfTheTask = {};

/**
 * Function to empty all input fields when the user clicks the "cancel" button
 */
function eraseTask() {
  document.getElementById('title').value = '';
  document.getElementById('date').value = '';
  document.getElementById('category').value = '';
  document.getElementById('urgency').value = '';
  document.getElementById('description').value = '';
  document.getElementById('userImages').innerHTML = '';
}

/**
 * Function to create a new task and send the user to the "backlog" section once the "create task" button is clicked
 */
async function addTask() {
  let title = document.getElementById('title').value;
  let date = document.getElementById('date').value;
  let category = document.getElementById('category').value;
  let urgency = document.getElementById('urgency').value;
  let description = document.getElementById('description').value;
  let task = {
    title: title,
    date: date,
    category: category,
    urgency: urgency,
    description: description,
    status: '',
    user: TheUsersOfTheTask,
  };
  if (
    task.user &&
    Object.keys(task.user).length === 0 &&
    task.user.constructor === Object
  ) {
    alert('Please assign a user to the task!');
    return;
  }
  tasks.push(task);
  await save();
  eraseTask();
  window.location = 'backlog.html';
}

/**
 * Function to display the available users to whom the user can assign the new task
 */
function showUsers() {
  let userSelectMenu = document.getElementById('userSelectMenu');
  let userSelect = document.getElementById('userSelect');
  userSelect.innerHTML = '';
  userSelectMenu.classList.toggle('userSelectOpen');

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    userSelect.innerHTML += `
    <div onclick="addUserToTask(${i})" class="user-pic-and-name cursor-pointer-br50">
      <img src="${user.img}" alt="" />
      <span>${user.name}</span>
    </div>
    `;
  }
}

/**
 * Function to add the selected user to the "assigned to" area
 *
 * @param {number} i - This is the index of the user
 */
function addUserToTask(i) {
  let userSelectMenu = document.getElementById('userSelectMenu');
  let userImages = document.getElementById('userImages');

  TheUsersOfTheTask = users[i];
  userSelectMenu.classList.remove('userSelectOpen');
  userImages.innerHTML = `<img src="${users[i].img}" />`;
}
