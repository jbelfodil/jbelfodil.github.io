(function (window) {
    // Create the defaults once
    window.pro = window.pro || {};
    window.pro.pageScroller = window.pro.pageScroller || {};

    var pageScroller = window.pro.pageScroller;

    var options = {};

    options.$spyItems = $('.page-scroller');

    pageScroller.init = function () {

        options.$spyItems.on('click',function (e) {
            anchorScroll(e, this);
        });
    };

    function anchorScroll(event, elmt) {
        event.preventDefault();

        var target = elmt.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 1200, 'swing');
    }

})(window);