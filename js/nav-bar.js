/**
 * Changes the menu icon when the user clicks on it.
 */
function menuOpen() {
  let menu = document.getElementById('menuLinks');
  let menuImg = document.getElementById('menuImg');

  menu.classList.toggle('menu-links-open');
  if (
    menuImg.src ==
    window.location.origin + '/Kanbanboard/assets/img/menu-4-32.ico'
  ) {
    menuImg.src =
      window.location.origin + '/Kanbanboard/assets/img/x-mark-32.ico';
  } else {
    menuImg.src =
      window.location.origin + '/Kanbanboard/assets/img/menu-4-32.ico';
  }
}
/**
 * Displays vertical menu when the user clicks on the menu icon.
 */
window.addEventListener('mouseup', function (event) {
  let menu = document.getElementById('menuLinks');
  let menuBtn = document.getElementById('menuImg');
  if (
    event.target != menu &&
    event.target.parentNode != menu &&
    event.target != menuBtn
  ) {
    menu.classList.remove('menu-links-open');
    menuBtn.src =
      window.location.origin + '/Kanbanboard/assets/img/menu-4-32.ico';
  }
});
