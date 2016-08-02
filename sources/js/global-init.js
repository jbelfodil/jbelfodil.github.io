(function(window){


	// theme color
	var themeColor = $('.colored').css('color');

	pro.navigation.mobile();
	pro.navigation.desktop();

	pro.scrollSkill.init({
		to: {
			color: themeColor,
			width: 2
		}
	});

	// scrollSpy for navbar
	pro.navSpy.init();

	// pageScroll
	pro.pageScroller.init();

	// contact form
	//pro.contact.init();

	//placeholder
	//$('input, textarea').placeholder();

	// if no mobile
	if( $('html').hasClass('no-touch') ) {

		// wow anim
		var wow = new WOW({
	      offset: 50
	    });

		wow.init();
	}

})(window);
