var slideIndex = 1;
var clicked = false;
showDivs(slideIndex);

function plusDivs(n) {
    clicked = true;
    $($('.carousel-slides')[slideIndex-1]).css({'left': 0}).animate({
        'left': '-100vw'
    })
    showDivs(slideIndex += n);
}

function currentDiv(n) {
    clicked = true;
    showDivs(slideIndex = n);
}

function showDivs(n) {
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
        if(clicked) {
            $(slide[slideIndex-1]).css({'position': 'absolute', 'z-index': 2, 'top': 0, 'left': '100vw'}).animate({
                'left': 0
            }, function(){
                $(slide[slideIndex-1]).css({'position': 'relative', 'z-index': 1});
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
    $('.play-btn').on('click', function() {
        $('.embedded-video').show().css({'z-index': 1})
            .attr('src', $('.embedded-video').attr('src') + "&autoplay=1")
    })

    $('.facebook').on('click', function() {
        $('.right-semicircle').animate({
            width: 0
        }, 200, function() {});
        $(this).css({'width': '90%'}).animate({
            top: '25%',
            right: '-20px'
        })
        $(this).children('p').animate({
            'left': '25%'
        }, function() {
            $('.fb-page').css({'z-index': '-1'}).animate({
                opacity: 1
            })
        })
    })

    $('.services-banner')

})();
