$(function() {
    /**
     * Add animations waypoints
     */
    function addWaypoints() {
        $('.anim-trigger-top-in-view').waypoint({
          handler: function(direction) {
            if (direction == 'down') {
                var classNames = ($(this)[0]).className.split(' ');
                var animationName = '';

                for(i = 0; i < classNames.length; i++) {
                    if(classNames[i].indexOf('anim-name-') == 0) {
                        animationName = classNames[i].split('-').pop();
                    };
                }

                for(i = 0; i < classNames.length; i++) {
                    if(classNames[i].indexOf('animation-m') == 0 && $(window).innerWidth() > 600) {
                        $(this).css("-webkit-animation-name", animationName);
                    };
                    if(classNames[i].indexOf('animation-s') == 0) {
                        $(this).css("-webkit-animation-name", animationName);
                    };
                }
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

    function animateBanner(element) {
        console.log('hello world');
        var animateAmount = (($(element).width() - $(window).innerWidth()) / $(element).width()) * 100;
        if($(window).innerWidth() < $(element).width()) {
          $(element)
              .css({'margin-left': animateAmount + 'vw'})
              .animate({'margin-left': '-' + animateAmount + 'vw'}, 10000, function(){
                  $(this).animate({'margin-left': animateAmount + 'vw'}, 10000, function(){
                      animateBanner(element)
                  });
              })
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