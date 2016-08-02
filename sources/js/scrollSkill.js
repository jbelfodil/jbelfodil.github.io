
(function (window) {

    window.pro = window.pro || {};
    window.pro.scrollSkill = window.pro.scrollSkill || {};

    var scrollSkill = window.pro.scrollSkill;

    var options = {};

    options.$skillItems = $('.competence-item');
    options.circles = [];
    options.dimensions = [];
    options.allDone = 0;
    options.defaults = {
            width: 100,
            trailColor: '#eee',
            trailWidth: 1,
            duration: 2000,
            easing: 'easeOut',
            text: {
                value: '0',
                className: 'competence-percent',
                autoStyle: false
            },
            from: { color: '#eee', width:1 },
            to: { color: '#eee', width: 2 },

            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);
                circle.setText((circle.value() * 100).toFixed(0) + '%');
            }
        };


    scrollSkill.init = function(opt) {

        options.progress = $.extend( {}, options.defaults, opt) ;

        for(var i = 0,l = options.$skillItems.length; i < l; i++) {

            options.circles.push({
                circle : new ProgressBar.Circle(options.$skillItems[i], options.progress),
                skill : options.$skillItems.eq(i).attr('data-skill') / 100,
                progressDone : false
            });
        }

        actualizeDimensions();

        $(window).on('scroll.skill', function(){
            revealProgress();
        });

        $(window).on('resize', function() {
            actualizeDimensions();
        });
    };

    function actualizeDimensions() {

        options.dimensions = [];
        options.wHeight = $(window).height();

        options.$skillItems.each(function(index){

            var $currentSkill = options.$skillItems.eq(index);

            options.dimensions.push({
                offsetTop : $currentSkill.offset().top,
                height : $currentSkill.outerHeight(true)
            });
        });
    }

    function revealProgress() {

        var dT =  $(window).scrollTop();

        for(var i = 0,l = options.$skillItems.length; i < l; i++){

            var currentDimensions = options.dimensions[i],
                currentCircle = options.circles[i];

            if(!currentCircle.progressDone){
                if(currentDimensions.offsetTop < (dT + options.wHeight) && dT < (currentDimensions.offsetTop + currentDimensions.height)) {
                    currentCircle.circle.animate(currentCircle.skill);
                    currentCircle.progressDone = true;
                    options.allDone++;
                }
            }

            if(options.allDone === options.$skillItems.length){
                $(window).off('scroll.skill');
            }
        }
    }

})(window);