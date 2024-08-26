$(document).ready(function() {
  $('.hamburger').on('click', function() {
    $('.hamburger').toggleClass('arrow');
  });

  var testimonials = $('#testimonials-carousel');
  testimonials.owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    items: 1,
    dots: true
  });

  var instaowl = $('#insta');
  instaowl.owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    items: 4,
    dots: true,
    responsiveClass: true,
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 2
      },
      // breakpoint from 480 up
      500: {
        items: 2,
        nav: false
      },
      // breakpoint from 768 up
      768: {
        items: 4
      }
    }
  });

  $('#testimonials-prev > a').click(function(e) {
    testimonials.trigger('prev.owl.carousel');
    e.preventDefault();
  });

  $('#testimonials-next > a').click(function(e) {
    testimonials.trigger('next.owl.carousel');
    e.preventDefault();
  });

  $('#insta-prev > a').click(function(e) {
    instaowl.trigger('prev.owl.carousel');
    e.preventDefault();
  });

  $('#insta-next > a').click(function(e) {
    instaowl.trigger('next.owl.carousel');
    e.preventDefault();
  });
});