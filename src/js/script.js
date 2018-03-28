@@include("node_modules/swiper/dist/js/swiper.min.js")

window.onload=function(){
  function pageNavigationClassToggle() {
    var elem = document.querySelector('.mg-nav');
    // var body = document.querySelector('body');
  
    elem.classList.toggle('is-opened');
    // body.classList.toggle('is_opened');
  }
  
  document.querySelector('#mg-nav_btn').addEventListener('click', pageNavigationClassToggle);
}

WebFont.load({
  google: {
    families: ['Poppins:300,400,600,700']
  }
});

var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  // loop: true,
  // autoplay: {
  //   delay: 1000,
  // },
  slidesPerView: 5,
  // loopedSlides: 15
})