setURL(
  'http://gruppe-141.developerakademie.net/Kanbanboard/smallest_backend_ever-master'
);

let users = [
  {
    name: 'Alex Todor',
    img: 'assets/img/user1.jpg',
    email: 'alex@gmail.com',
  },

  {
    name: 'Vincent Botella',
    img: 'assets/img/user2.jpg',
    email: 'vincent@gmx.de',
  },

  {
    name: 'Eric Singelmann-Seimel',
    img: 'assets/img/user3.jpg',
    email: 'eric@web.de',
  },
];

let loggedInUser = {};

let tasks = [];

/**FUNCTION TO INCLUDE HTML FILES
 *
 *
 */

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName('*');
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute('w3-include-html');
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = 'Page not found.';
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute('w3-include-html');
          includeHTML();
        }
      };
      xhttp.open('GET', file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
  navStyle();
}

/**
 * function to save the logged in user on the server
 *
 * @param {Array} user
 */
async function saveUserLoggedIn(user) {
  await backend.setItem('loggedUser', JSON.stringify(user));
  // let usersAsText = JSON.stringify(users);
  // localStorage.setItem('users', usersAsText);
}

/**
 * function to save the users array on the server
 *
 * @param {Array} user
 */
async function saveUsers() {
  await backend.setItem('users', JSON.stringify(users));
  // let usersAsText = JSON.stringify(users);
  // localStorage.setItem('users', usersAsText);
}

/**
 * function to save the tasks on the server
 */
async function save() {
  await saveUsers();
  await backend.setItem('tasks', JSON.stringify(tasks));
  // let tasksAsText = JSON.stringify(tasks);
  // localStorage.setItem('tasks', tasksAsText);

  await load();
}

/**
 * function to load the tasks from the server
 * and give every task a id
 */
async function load() {
  await downloadFromServer();
  users = (await JSON.parse(backend.getItem('users'))) || [];
  loggedInUser = await JSON.parse(backend.getItem('loggedUser'));
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

/**
 * function to style the navbar so you see on which page you are
 */
function navStyle() {
  if (window.location.pathname == '/Kanbanboard/addTask.html') {
    document.getElementById('addTask').classList.add('a-highlight');
    loggedInUserImg();
  } else if (window.location.pathname == '/Kanbanboard/board.html') {
    document.getElementById('board').classList.add('a-highlight');
    loggedInUserImg();
  } else if (window.location.pathname == '/Kanbanboard/backlog.html') {
    document.getElementById('backlog').classList.add('a-highlight');
    loggedInUserImg();
  } else if (window.location.pathname == '/Kanbanboard/help.html') {
    document.getElementById('help').classList.add('a-highlight');
    loggedInUserImg();
  }
}

/**
 * function to remove an error if no userImg can be found
 */
function loggedInUserImg() {
  let loggedUser = document.getElementById('loggedUser');
  try {
    loggedUser.src = loggedInUser.img;
  } catch (error) {
    console.log('No Image');
  }
}
