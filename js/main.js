let users = [
  {
    name: 'Hans',
    img: '',
    email: 'hans@gmail.com',
  },
  {
    name: 'Dieter',
    img: '',
    email: 'dieter@gmx.de',
  },
  {
    name: 'Jürgen',
    img: '',
    email: 'juergen@web.de',
  },
];

let tasks = [];

function save() {
  let tasksAsText = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksAsText);
}

function load() {
  let tasksAsText = localStorage.getItem('tasks');
  tasks = JSON.parse(tasksAsText);
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    task.id = i;
  }
}
