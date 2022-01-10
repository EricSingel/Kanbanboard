function menuOpen() {
  let menu = document.getElementById('menuLinks');
  let menuImg = document.getElementById('menuImg');

  menu.classList.toggle('menu-links-open');
  if (menuImg.src == 'http://127.0.0.1:5500/assets/img/menu-4-32.ico') {
    menuImg.src = 'http://127.0.0.1:5500/assets/img/x-mark-32.ico';
  } else {
    menuImg.src = 'http://127.0.0.1:5500/assets/img/menu-4-32.ico';
  }
}

window.addEventListener('mouseup', function (event) {
  let menu = document.getElementById('menuLinks');
  let menuBtn = document.getElementById('menuImg');
  if (
    event.target != menu &&
    event.target.parentNode != menu &&
    event.target != menuBtn
  ) {
    menu.classList.remove('menu-links-open');
    menuBtn.src = 'http://127.0.0.1:5500/assets/img/menu-4-32.ico';
  }
});
