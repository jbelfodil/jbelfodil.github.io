(function(window){

	window.pro = window.pro || {};
	window.pro.navigation = window.pro.navigation || {};

	var navigation = window.pro.navigation;


	navigation.mobile = function() {

		var $menuMobileButton = $('.mobile-nav-button'),
			$menuMobile = $('.main-nav');

		var closeNav = function(){
			$menuMobileButton.removeClass('open-mobile-nav-button');
			$menuMobile.removeClass('open-main-nav');
		};

		$menuMobileButton.on('click', function(e){
			e.stopPropagation();
			$menuMobileButton.toggleClass('open-mobile-nav-button');
			$menuMobile.toggleClass('open-main-nav');
		});

		$menuMobile.on('click', function(e){
			e.stopPropagation();
			closeNav();
		});

		$(window).on('click', function(e){
			closeNav();
		});
	};

	navigation.desktop = function() {

		var $navBar = $('.top-bar'),
			didScroll = false,
			limitBar = 100;

		$(document).scroll(function(){
			didScroll = true;
		});

		$(window).on('scroll', function(){
			changeNavBar();
		});

        var changeNavBar = function(){
        
	        var dT =  $(window).scrollTop();
			
			if(dT >= limitBar) {
				$navBar.addClass('colored-bar');
				return;
			}
			$navBar.removeClass('colored-bar');
		};
	};

})(window);