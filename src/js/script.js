@@include("node_modules/swiper/dist/js/swiper.min.js")
@@include("node_modules/wowjs/dist/wow.min.js")

new WOW().init();

var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  // pagination: {
  //   el: '.swiper-pagination',
  // },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});

function pageNavigationClassToggle() {
  var elem = document.querySelector('.mg-page_navigation');
  var body = document.querySelector('body');

  elem.classList.toggle('mg--nav_is_opened');
  body.classList.toggle('mg--nav_is_opened');
}

document.querySelector('#mg-page_nav__toggle-button').addEventListener('click', pageNavigationClassToggle);