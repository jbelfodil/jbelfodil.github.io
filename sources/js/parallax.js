(function (window) {

    window.pro = window.pro || {};
    window.pro.parallax = window.pro.parallax || {};

    var parallax = window.pro.parallax;

    var options = {};

    options.$parallaxBoxes = $('.parallax-container');
    options.$parallaxItems = options.$parallaxBoxes.find('.parallax-item');
    options.wHeight = window.innerHeight + 100;
    options.dimensions = [];

    parallax.init = function () {

        actualizeDimensions();

        $(window).on('scroll', function(){
            scrolly();
        });

        $(window).on('resize', function() {
            actualizeDimensions();
            scrolly();
        });

    };

    function actualizeDimensions() {

        options.dimensions = [];

        options.$parallaxBoxes.each(function(index){
            var $currentBox = options.$parallaxBoxes.eq(index),
                $currentItem = $currentBox.find('.parallax-item'),
                $currentBoxHeight = $currentBox.outerHeight(true);


            options.dimensions.push({
                offsetTop : $currentBox.offset().top,
                height : $currentBoxHeight,
                velocity : $currentItem.attr('data-velocity')
            });

            var itemHeight = options.wHeight > $currentBoxHeight ? options.wHeight : $currentBoxHeight;

            $currentItem.css('height', itemHeight);

        });

        if(options.wHeight + 100 < $(window).height()){
            options.wHeight = $(window).height();
        }
    }

    function scrolly() {

        var dT =  $(window).scrollTop();

        options.$parallaxBoxes.css({
            'z-index' : '0'
        });

        for(var i = 0,l = options.dimensions.length; i < l; i++){

            var currentBoxDimensions = options.dimensions[i];

            if(currentBoxDimensions.offsetTop < (dT + options.wHeight) && dT < (currentBoxDimensions.offsetTop + currentBoxDimensions.height)) {

                var $currentBox = options.$parallaxBoxes.eq(i),
                    $currentItem = $currentBox.find('.parallax-item');

                var position = (dT - currentBoxDimensions.offsetTop ) * currentBoxDimensions.velocity;
                $currentBox.css({
                    'z-index' : '1'
                });

                $currentItem.css({
                    'transform' : 'translate(0,' + position + 'px)',
                    'transform' : 'translate3d(0,' + position + 'px,0)'
                });

                break;
            }
        }
    }

})(window);