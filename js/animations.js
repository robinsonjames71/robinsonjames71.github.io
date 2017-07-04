$(function() {
    /**
     * Add animations waypoints
     */
    function addWaypoints() {
        $('.anim-trigger-top-in-view').waypoint({
          handler: function(direction) {
            if (direction == 'down') {
                $(this).addClass('animation-started');
            }
          },
          offset: function() {
            return $(window).height();
          }
        });
    }

    /**
     * Check if any part of the element is visible in the viewport
     * @param  {DOM node} el
     * @return {Bool}
     */
    function elementIsVisibleInViewport(el, viewport) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while(el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    }

    /**
     * Setup animations on page load.
     * Checks if the element marked as animated are visible.
     * (If an element is already visible we don't want it to animate).
     */
    $(window).on('load', function() {
        var animatedS = $('.animated-s');
        var animatedM = $('.animated-m');

        for (var i = 0; i < animatedS.length; i++) {
            if (!elementIsVisibleInViewport(animatedS[i])) {
                $(animatedS[i]).addClass('animation-xs');
            }
        }

        for (var i = 0; i < animatedM.length; i++) {
            if (!elementIsVisibleInViewport(animatedM[i])) {
                $(animatedM[i]).addClass('animation-sm');
            }
        }

        addWaypoints();
    });


    animateBanner();
    function animateBanner(element) {
        var animateAmount = (($(element).width() - $(window).innerWidth()) / $(element).width()) * 100;
        if($(window).innerWidth() < $(element).width()) {
          $(element)
              .css({'margin-left': animateAmount + 'vw'})
              .animate({'margin-left': '-' + animateAmount + 'vw'}, 20000)
              .animate({'margin-left': animateAmount + '-100vw'}, 20000, animateBanner);
        }
    }

    $('.scroll-container').waypoint({
      handler: function(direction) {
        if (direction == 'down') {
            animateBanner($(this));
        }
      },
      offset: function() {
        return $(window).height();
      }
    });

});