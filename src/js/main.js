window.onload=function(){
  function pageNavigationClassToggle() {
    var elem = document.querySelector('.mg-nav');
    var body = document.querySelector('body');
    var html = document.querySelector('html');
  
    // elem.classList.toggle('is-opened');
    // body.classList.toggle('disable-scroll');
    body.classList.toggle('sidenav-is-opened');
    console.log('clicked')
    // html.classList.toggle('disable-scroll');
  }
  
  var navBtn = document.querySelectorAll('.mg-nav_btn');
  var sidenavLinks = document.querySelectorAll('.mg-nav_sidenav a');
  
  navBtn.forEach(function(element){
    element.addEventListener('click', pageNavigationClassToggle);
  }) 
  sidenavLinks.forEach(function(element){
    element.addEventListener('click', pageNavigationClassToggle);
  }) 
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
  // loopedSlides: 1,
  // autoplay: {
  //   delay: 1000,
  // },
  // slidesPerView: 5,
  slidesPerView: 'auto'
  // loopedSlides: 15
})

// grab an element
var myElement = document.querySelector(".mg-nav.clone");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement, {
  "offset": 1000,
  "tolerance": 0
});
// initialise
headroom.init();