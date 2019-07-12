(function ($) {
  "use strict";
  
  // Preloader
  $(window).on('load', function () {
	  if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	var nav = $('nav');
	var navHeight = nav.outerHeight();

	/*--/ ScrollReveal /Easy scroll animations for web and mobile browsers /--*/
	window.sr = ScrollReveal();
	sr.reveal('.foo', { duration: 1000, delay: 15 });

	/*--/ Carousel owl /--*/
	$('#carousel').owlCarousel({
		loop: true,
		margin: -1,
		items: 1,
		nav: true,
		navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true
	});

	/*--/ Animate Carousel /--*/
	$('.intro-carousel').on('translate.owl.carousel', function () {
		$('.intro-content .intro-title').removeClass('zoomIn animated').hide();
		$('.intro-content .intro-price').removeClass('fadeInUp animated').hide();
		$('.intro-content .intro-title-top, .intro-content .spacial').removeClass('fadeIn animated').hide();
	});

	$('.intro-carousel').on('translated.owl.carousel', function () {
		$('.intro-content .intro-title').addClass('zoomIn animated').show();
		$('.intro-content .intro-price').addClass('fadeInUp animated').show();
		$('.intro-content .intro-title-top, .intro-content .spacial').addClass('fadeIn animated').show();
	});

	/*--/ Navbar Collapse /--*/
	$('.navbar-toggle-box-collapse').on('click', function () {
		$('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
	});
	$('.close-box-collapse, .click-closed').on('click', function () {
		$('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
		$('.menu-list ul').slideUp(700);
	});

	$('.price-a').on('click', function(event) {
		const type = $(event.currentTarget).closest('.col-md-4').find('.card-title-a').text();
		$('#myModalLabel').text(type);
	});

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).bind('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-default').addClass('navbar-reduce');
			$('.navbar-default').removeClass('navbar-trans');
		} else {
			$('.navbar-default').addClass('navbar-trans');
			$('.navbar-default').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Property owl /--*/
	$('#property-carousel').owlCarousel({
		loop: true,
		margin: 30,
		responsive: {
			0: {
				items: 1,
			},
			769: {
				items: 2,
			},
			992: {
				items: 3,
			}
		}
	});

	/*--/ Property owl owl /--*/
	$('#property-single-carousel').owlCarousel({
		loop: true,
		margin: 0,  
		nav: true,
		navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
		responsive: {
			0: {
				items: 1,
			}
		}
	});

	/*--/ News owl /--*/
	$('#new-carousel').owlCarousel({
		loop: true,
		margin: 30,
		responsive: {
			0: {  
				items: 1,
			},
			769: {
				items: 2,
			},
			992: {
				items: 3,
			}
		}
	});

	/*--/ Testimonials owl /--*/
	$('#testimonial-carousel').owlCarousel({
		margin: 0,
		autoplay: true,
		nav: true,
		animateOut: 'fadeOut',
		animateIn: 'fadeInUp',
		navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);

function catalogFilter() {
	const selectionBox = document.getElementById('catalog-select');
	const selection = selectionBox.options[selectionBox.selectedIndex].value;
	if (selection === 'All') {
		$('.door').show();
		$('.window-screen').show();
	} else if (selection === 'Door') {
		$('.window-screen').hide();
		$('.door').show();
	} else if (selection === 'Window') {
		$('.door').hide();
		$('.window-screen').show();
	}
}
//todo refine to let user know which fields
function addToCart() {
	if(document.getElementById('charcoal').checked || document.getElementById('gray').checked) {
		if (document.getElementById('window').checked || document.getElementById('door').checked || document.getElementById('non-standard').checked) {
			console.log('good to go');
			return;
		}
	}
	/*console.log("charcoal checked " + document.getElementById('charcoal').checked);
	console.log("gray checked " + document.getElementById('gray').checked);
	console.log("window checked " + document.getElementById('window').checked);
	console.log("door checked " + document.getElementById('door').checked);
	console.log("non-standard checked " + document.getElementById('non-standard').checked);*/
	alert('Please fill out all fields');
}
