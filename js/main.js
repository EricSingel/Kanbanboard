//TODO User einbinden
setURL(
  'http://gruppe-141.developerakademie.net/Kanbanboard/smallest_backend_ever-master'
);
let users = [
  {
    name: 'Hans',
    img: 'assets/img/icon plus.png',
    email: 'hans@gmail.com',
  },
  {
    name: 'Dieter',
    img: 'assets/img/icon plus.png',
    email: 'dieter@gmx.de',
  },
  {
    name: 'Jürgen',
    img: 'assets/img/icon plus.png',
    email: 'juergen@web.de',
  },
];

let tasks = [];

function saveUsers() {
  backend.setItem('users', JSON.stringify(users));
  // let usersAsText = JSON.stringify(users);
  // localStorage.setItem('users', usersAsText);
}
saveUsers();

function save() {
  backend.setItem('tasks', JSON.stringify(tasks));
  // let tasksAsText = JSON.stringify(tasks);
  // localStorage.setItem('tasks', tasksAsText);
}

async function load() {
  await downloadFromServer();
  users = JSON.parse(backend.getItem('users')) || [];
  tasks = JSON.parse(backend.getItem('tasks')) || [];
  // let tasksAsText = localStorage.getItem('tasks');
  // tasks = JSON.parse(tasksAsText);
  // let usersAsText = localStorage.getItem('users');
  // users = JSON.parse(usersAsText);
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    task.id = i;
  }
}
