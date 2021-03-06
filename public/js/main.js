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
		$('#quantity-input').val(1);
		$("input[type='radio']").each(function () {
			this.checked = false;
		});
		$('.modal-body-section').removeClass('background-red');
		$('.input-div').show();
		let cw = $('#color-cw');
		let g = $('#color-g');
		let c = $('#color-c');
		let w = $('#type-w');
		let d = $('#type-d');
		let n = $('#type-n');
		switch (type) {
			case 'Standard Fiberglass':
				cw.hide();
				break;
			case 'Clear Advantage':
				document.getElementById('charcoal').checked = true;
				g.hide();
				cw.hide();
				break;
			case 'Extra Strength':
				document.getElementById('charcoal').checked = true;
				g.hide();
				cw.hide();
				break;
			case 'Small Insect':
				document.getElementById('charcoal').checked = true;
				g.hide();
				cw.hide();
				break;
			case 'Pet Resistant':
				document.getElementById('charcoal').checked = true;
				g.hide();
				cw.hide();
				w.hide();
				break;
			case 'Solar Protection':
				document.getElementById('charcoal').checked = true;
				g.hide();
				cw.hide();
				d.hide();
				break;
			case 'Doorway Alert':
				document.getElementById('charcoal/white').checked = true;
				g.hide();
				c.hide();
				w.hide();
				break;
			case 'Pool/Patio':
				document.getElementById('charcoal').checked = true;
				g.hide();
				cw.hide();
				break;
		}
	});

	$('.remove').on('click', function (event) {
		const clicked = event.target;
		clicked.parentElement.parentElement.remove();
		getTotal();
	});


	$('#place-order-button').on('click', function (event) {
		let items = document.getElementsByClassName('item');
		if (items.length === 0) {
			window.alert('There is nothing in your cart!');
			return;
		}
		let name = document.getElementById('name-input').value;
		let email = document.getElementById('email-input').value;
		let address = document.getElementById('address-input').value;
		let tel = document.getElementById('tel-input').value;
		if (tel === '') {
			tel = 'not provided'
		}
		let message = document.getElementById('notes-area').value;
		if (message === '') {
			message = 'no message';
		}
		if (name === '' || email === '' || address === '') {
			window.alert('Please fill out required contact info fields.');
			return;
		}
		if (window.confirm('Please confirm that you placed your order')) {
		} else {
			return;
		}
		$.ajax({
			type: "POST",
			url: "PHP/customer.php",
			async: false,
			data: {name : name, email: email, address:address, tel: tel}
		}).done(function (msg) {
			console.log(msg);
		});
		let stringInfo = '';
		for (let i = 0; i < items.length; i++) {
			const info = getRowInfo(items[i]);
			stringInfo += info[4] + ' ' + info[0] + ' ' + info[1] + '(s) ' + '<br>';
		}
		stringInfo += '<br><br>' + 'For a total of ' + document.getElementById('shopping-cart-total')
			.innerText.replace('Total: ', '');
		$.ajax({
			type: "POST",
			url: "PHP/order.php",
			async: false,
			data: {
				name: name,
				email: email,
				address: address,
				tel: tel,
				message: message,
				order_str: stringInfo
			}
		}).done(function (msg) {
			console.log('order reached');
			console.log(msg);
		});
		for (let i = 0; i < items.length; i++) {
			const info = getRowInfo(items[i]);
			(function(e) {
				$.ajax({
					type: "POST",
					url: "PHP/item.php",
					async: false,
					data: {
						type: e[0],
						frame: e[1],
						color: e[2],
						installation: e[3],
						quantity: e[4],
						price: e[5],
						discount_price: e[6]
					}
				}).done(function (msg) {
					console.log(msg);
				});
			})(info);
		}
		//resetting all fields
		while (items.length > 0) {
			items[0].remove();
		}
		document.getElementById('name-input').value = '';
		document.getElementById('email-input').value = '';
		document.getElementById('tel-input').value = '';
		document.getElementById('notes-area').value = '';
		document.getElementById('address-input').value = '';
		getTotal();
		$('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
		let x = document.getElementById("toast");
		x.innerText = 'Order Placed! Please check email/spam for confirmation';
		x.className = "show-long";
		setTimeout(function() {
				x.className = x.className.replace("show-long", "");
				x.innerText = "Item added to cart";
			}, 7500);
		//works but taken out to save emails
		/*const template_params = {
			"to_email": email,
			"to_name": name,
			"message_html": stringInfo,
			"order_message": message,
			"phone_number": tel
		};

		const service_id = "default_service";
		const template_id = "template_a1Pt7OUW";
		emailjs.send(service_id, template_id, template_params);*/
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

function addToCart() {
	if (checkModalInputs()) {
		const type = document.getElementById('myModalLabel').innerText;
		const quantity = document.getElementById('quantity-input').value;
		let color;
		let frame;
		let installation;
		let totalPrice;
		if (document.getElementById('charcoal').checked) {
			color = 'Charcoal';
		} else if (document.getElementById('gray').checked) {
			color = 'Gray';
		} else {
			color = 'Charcoal/White'
		}
		if (document.getElementById('window').checked) {
			frame = 'Window';
		} else if (document.getElementById('door').checked) {
			frame = 'Door';
		} else {
			frame = 'Non-Standard';
		}
		if (document.getElementById('installation-yes').checked) {
			installation = 'Yes';
		} else {
			installation = 'No';
		}
		let price = calculatePrice(type, frame, quantity, installation);
		if ((type ==='Window' || 'Non-Standard') && quantity >= 4) {
			totalPrice = price * .75;
		} else {
			totalPrice = price;
		}
		let items = document.getElementsByClassName('item');
		for (let i = 0; i < items.length; i++) {
			let atts = getRowInfo(items[i]);
			if (areSameItems(atts[0], atts[1], atts[2], type, frame, color)) {
				if (window.confirm('This type, frame, and color is already in your cart! Do you still want to proceed?')) {
				} else {
					return;
				}
			}
		}
		price = '$' + price.toFixed(2);
		totalPrice = '$' + totalPrice.toFixed(2);
		let itemRow = document.createElement('div');
		itemRow.classList.add('item', 'row', 'vertical-align-body');
		let cartBody = document.getElementById('cart-body');
		itemRow.innerHTML = `<div class="col">
				<h4 class="shopping-cart-header">${type}</h4>
			</div>
			<div class="col-custom">
				<h4 class="shopping-cart-header">${frame}</h4>
			</div>
			<div class="col-custom">
                    <h4 class="shopping-cart-header">${color}</h4>
                </div>
			<div class="col-custom">
				<h4 class="shopping-cart-header">${installation}</h4>
			</div>
			<div class="col-custom">
				<h4 class="shopping-cart-header">${quantity}</h4>
			</div>
			<div class="col-custom">
				<h4 class="shopping-cart-header">${price}</h4>
			</div>
			<div class="col-custom price-col">
				<h4 class="shopping-cart-header item-final-price">${totalPrice}</h4>
			</div>
			<div class="col-custom">
				<button class="btn remove">Remove</button>
			</div>`;
		cartBody.append(itemRow);
		getTotal();
		let x = document.getElementById("toast");
		x.className = "show";
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	}

	$('.remove').on('click', function (event) {
		const clicked = event.target;
		clicked.parentElement.parentElement.remove();
		getTotal();
	});
}

function calculatePrice(type, frame, quantity, installation) {
	let singlePrice = 0.00;
	let totalPrice = 0.00;
	let installationFee = 2.5 * quantity;
	switch (type) {
		case 'Standard Fiberglass':
			if (frame === 'Door') {
				singlePrice = 25.00;
			} else {
				singlePrice = 20.00;
				if (quantity > 2) {
					installationFee = 5.00;
				}
			}
			break;
		case 'Pet Resistant':
			if (frame === 'Door') {
				singlePrice = 32.50;
			} else {
				singlePrice = 27.50;
				if (quantity > 2) {
					installationFee = 5.00;
				}
			}
			break;
		case 'Solar Protection':
			singlePrice = 25.00;
			if (quantity > 2) {
				installationFee = 5.00;
			}
			break;
		case 'Doorway Alert':
			if (frame === 'Door') {
				singlePrice = 27.50;
			} else {
				singlePrice = 22.50;
				if (quantity > 2) {
					installationFee = 5.00;
				}
			}
			break;
		default:
			if (frame === 'Door') {
				singlePrice = 27.50;
			} else {
				singlePrice = 22.50;
				if (quantity > 2) {
					installationFee = 5.00;
				}
			}
			break;
	}
	totalPrice += singlePrice * quantity;
	if (installation === 'Yes') {
		totalPrice += installationFee;
	}
	return totalPrice;
}

function checkModalInputs() {
	let toReturn = true;
	if(!(document.getElementById('charcoal').checked || document.getElementById('gray').checked || document.getElementById('charcoal/white').checked)) {
		toReturn = false;
		let colorSection = document.getElementById('color-section');
		colorSection.classList.add('background-red');
		let colorInputs = colorSection.getElementsByTagName('input');
		for (let i = 0; i < colorInputs.length; i++) {
			colorInputs[i].onclick = function () {
				colorSection.classList.remove('background-red');
			}
		}
	}
	if (!(document.getElementById('window').checked || document.getElementById('door').checked || document.getElementById('non-standard').checked)) {
		toReturn = false;
		let frameSection = document.getElementById('frame-section');
		frameSection.classList.add('background-red');
		let frameInputs = frameSection.getElementsByTagName('input');
		for (let i = 0; i < frameInputs.length; i++) {
			frameInputs[i].onclick = function () {
				frameSection.classList.remove('background-red');
			}
		}
	}
	if(!(document.getElementById('installation-yes').checked || document.getElementById('installation-no').checked)) {
		toReturn = false;
		let installationSection = document.getElementById('installation-section');
		installationSection.classList.add('background-red');
		let installationInputs = installationSection.getElementsByTagName('input');
		for (let i = 0; i < installationInputs.length; i++) {
			installationInputs[i].onclick = function () {
				installationSection.classList.remove('background-red');
			}
		}
	}

	/*
	$("input[type='radio']", '.modal-body-section').each(function () {
		this.click( function () {
			let div = this.parentElement.parentElement;
			console.log(div);
			div.removeClass('background-red');
		});
	});*/
	/*

	console.log("charcoal checked " + document.getElementById('charcoal').checked);
	console.log("gray checked " + document.getElementById('gray').checked);
	console.log("charcoal/white checked " + document.getElementById('charcoal/white').checked);
	console.log("window checked " + document.getElementById('window').checked);
	console.log("door checked " + document.getElementById('door').checked);
	console.log("non-standard checked " + document.getElementById('non-standard').checked);
	console.log("installation-yes checked " + document.getElementById('installation-yes').checked);
	console.log("installation-no checked " + document.getElementById('installation-no').checked);*/
	if (!toReturn) {
		$('#add-to-cart').removeAttr('data-dismiss');
		alert('Please fill out all fields');
	} else {
		$('#add-to-cart').attr('data-dismiss', 'modal');
	}
	return toReturn;
}

function getTotal() {
	let items = document.getElementsByClassName('item-final-price');
	let total = 0.00;
	for (let i = 0; i < items.length; i++) {
		total += parseFloat(items[i].innerText.replace('$', ''));
	}
	total = total.toFixed(2);
	document.getElementById('shopping-cart-total').innerText = 'Total: $' + total;
}

function areSameItems (type1, frame1, color1, type2, frame2, color2) {
	if (type1 === type2) {
		if (frame1 === frame2) {
			if (color1 === color2) {
				return true;
			}
		}
	}
	return false;
}
//order is type, frame, color, installation, quantity, price, total-price
function getRowInfo(ItemRow) {
	const info = ItemRow.getElementsByClassName('shopping-cart-header');
	let textArray = [];
	for (let i = 0; i < info.length; i++) {
		textArray.push(info[i].innerText);
	}
	return textArray;
}

