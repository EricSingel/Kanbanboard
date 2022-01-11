function menuOpen() {
  let menu = document.getElementById('menuLinks');
  let menuImg = document.getElementById('menuImg');

  menu.classList.toggle('menu-links-open');
  if (
    menuImg.src ==
    'http://gruppe-141.developerakademie.net/assets/img/menu-4-32.ico'
  ) {
    menuImg.src =
      'http://gruppe-141.developerakademie.net/assets/img/x-mark-32.ico';
  } else {
    menuImg.src =
      'http://gruppe-141.developerakademie.net/assets/img/menu-4-32.ico';
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
    menuBtn.src =
      'http://gruppe-141.developerakademie.net/assets/img/menu-4-32.ico';
  }
});
