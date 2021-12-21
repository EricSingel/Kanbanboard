//TODO User einbinden
setURL(
  'http://gruppe-141.developerakademie.net/Kanbanboard/smallest_backend_ever-master'
);

let users = [
  {
    name: 'Alex Todor',
    img: 'assets/img/user1.jpg',
    email: 'hans@gmail.com',
  },

  {
    name: 'Vincent Botella',
    img: 'assets/img/user2.jpg',
    email: 'dieter@gmx.de',
  },

  {
    name: 'Eric Singelmann-Seimel',
    img: 'assets/img/user3.jpg',
    email: 'juergen@web.de',
  },
];

let tasks = [];

async function saveUsers() {
  await backend.setItem('users', JSON.stringify(users));
  // let usersAsText = JSON.stringify(users);
  // localStorage.setItem('users', usersAsText);
}

async function save() {
  await backend.setItem('tasks', JSON.stringify(tasks));
  // let tasksAsText = JSON.stringify(tasks);
  // localStorage.setItem('tasks', tasksAsText);
  await saveUsers();

  load();
}

async function load() {
  await downloadFromServer();
  users = (await JSON.parse(backend.getItem('users'))) || [];
  tasks = (await JSON.parse(backend.getItem('tasks'))) || [];
  // let tasksAsText = localStorage.getItem('tasks');
  // tasks = JSON.parse(tasksAsText);
  // let usersAsText = localStorage.getItem('users');
  // users = JSON.parse(usersAsText);
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    task.id = i;
  }
}
