/**
 * If the user logs in with a username and password stored in the application, this function allows him/her to enter and use the application as user X and not as a guest.
 */
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
}
