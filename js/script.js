var slideIndex = 1;
var clicked = false;
showDivs(slideIndex);
var animateObject = {
    'left': 'auto',
    'right': 'auto'
};
var animateObjectReverse = {};

function plusDivs(n, direction) {
    var direction = direction == 1 ? 'left' : 'right';
    animateObject[direction] = 0;
    if(direction == 'left') {
        animateObject['right'] = 'auto';
        animateObjectReverse[direction] = '-100vw';
    } else if (direction == 'right') {
        animateObject['left'] = 'auto';
        animateObjectReverse['left'] = '100vw';
    }
    clicked = true;
    $($('.carousel-slides')[slideIndex-1]).css(animateObject).animate(animateObjectReverse);
    showDivs(slideIndex += n, direction);
}

function currentDiv(n) {
    console.log('n ', n);
    console.log('[slideIndex-1] ', [slideIndex-1]);
    var direction;
    clicked = true;
    if (n > [slideIndex-1]) {
        direction = 'right';
        animateObject['right'] = 'auto';
        animateObjectReverse['left'] = '-100vw';
    } else {
        direction = 'left';
        animateObject['left'] = 'auto';
        animateObjectReverse['left'] = '100vw';
    }
    animateObject[direction] = 0;
    $($('.carousel-slides')[slideIndex-1]).css(animateObject);
    showDivs(slideIndex = n, direction);
}

function showDivs(n, direction) {
    var i;
    var slide = $('.carousel-slides');
    if(slide.length > 0) {
        var dots = $('.carousel-button');
        if (n > slide.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slide.length
        }
        if(!clicked) {
            for (i = 0; i < slide.length; i++) {
                $(slide[i]).css({'display': 'none'});
            }
        }
        for (i = 0; i < dots.length; i++) {
           dots[i].className = dots[i].className.replace(" w3-white", "");
        }
        $(slide[slideIndex-1]).show();

        var cssObject = {
            'position': 'absolute',
            'z-index': 2,
            'top': 0,
            'left': 'auto',
            'right': 'auto'
        }
        cssObject[direction] = '100vw';
        if(clicked) {
            $(slide[slideIndex-1]).css(cssObject).animate(animateObject, function(){
                $(slide[slideIndex-1]).css({'position': 'relative', 'z-index': 1, 'left': 0, 'right': 'auto'});
                for (i = 0; i < slide.length; i++) {
                    if(i == (slideIndex - 1)) {
                        continue;
                    }
                    $(slide[i]).css({'display': 'none'});
                }
            })
        }
        dots[slideIndex-1].className += " w3-white";
        clicked = false;
    }
}

(function(){
    var clicked = false;
    var navigation = $('#main-navigation');
    $('#nav-menu-state').on('change', function() {
        if (!clicked) {
            navigation.toggleClass('active');
        } else {
            setTimeout(function() {
                navigation.toggleClass('active');
            }, 400)
        }
        clicked = !clicked;
    })
    $('.play-btn').on('click', function() {
        $('.embedded-video').show().css({'z-index': 1})
            .attr('src', $('.embedded-video').attr('src') + "&autoplay=1")
    })

    if($(".email-form").length > 0) {
        $(".email-form").validate({
            rules: {
                name: "required",
                email: {
                        required: true,
                        email: true
                    },
                subject: "required",
                message: "required",
                make: "required",
                model: "required",
                registration: "required"
            },
            messages: {
                name: "Required",
                email: {
                        required: "Required",
                        email: "Must be a valid email"
                    },
                subject: "Required",
                message: "Required",
                make: "Required",
                model: "Required",
                registration: "Required"
            }
        });
    }

})();
