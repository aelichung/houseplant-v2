$(function() {

    var itemsOwl = $('#items-carousel');
    itemsOwl.owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      items: 4,
      dots: true,
      center: true,
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

    $('#item-prev > a').click(function(e) {
      itemsOwl.trigger('prev.owl.carousel');
      e.preventDefault();
    });

    $('#item-next > a').click(function(e) {
      itemsOwl.trigger('next.owl.carousel');
      e.preventDefault();
    });
  });
