async function login() {
  await saveUsers();

  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (name == user.name && email == user.email) {
      saveUserLoggedIn(user);
    }
  }
  window.location = 'addTask.html';
  // init();
}
