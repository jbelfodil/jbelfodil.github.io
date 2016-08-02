(function (window) {

    window.pro = window.pro || {};
    window.pro.navSpy = window.pro.navSpy || {};

    var navSpy = window.pro.navSpy;

    var options = {};

    options.$spyItems = $('.nav-spy');
    options.dimensions = [];


    navSpy.init = function () {

        getSectionInfos();

        $(window).on('scroll', function(){
            scrollCheck();
        });

        $(window).on('resize', function() {
            getSectionInfos();
        });
    };

    function getSectionInfos() {

        options.dimensions = [];

        options.$spyItems.each(function(index){
            var $currentItem = options.$spyItems.eq(index),
                sectionId = $currentItem[0].hash,
                $section = $(sectionId);

            if($section.length > 0) {

                options.dimensions.push({
                    offsetTop: parseInt($section.offset().top, 10),
                    height: parseInt($section.outerHeight(true), 10)
                });
            }
        });
    }

    function scrollCheck() {

        var dT =  $(window).scrollTop();

        options.$spyItems.removeClass('active');

        for(var i = 0,l = options.dimensions.length; i < l; i++){

            var currentSectionDimensions = options.dimensions[i];

            if(dT >= currentSectionDimensions.offsetTop && dT < (currentSectionDimensions.offsetTop + currentSectionDimensions.height -1) ){

                options.$spyItems.eq(i).addClass('active');

                return;
            }
        }
    }

})(window);