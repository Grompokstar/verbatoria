$(function(){

    $(window).ready(function(){
        $('.main-menu-btn').on('click', function () {
            $('.main-menu').toggleClass('visible');
            $('.main-menu-btn').toggleClass('close');
            $('.main-menu-btn svg').toggleClass('visible');
            $('.overlay').toggleClass('visible');
        });

        var sliders = $('.video-slider__text'),
            sliderCircles = $('.slider-circles .circle'),
            i = 0,
            repeat = false;

        $('#play-btn').on('click', function() {
            $('.slider-img').hide();
            $('.slider-circles').show();
            $(sliders[i]).toggleClass('show');
            $(sliders[i+1]).toggleClass('show');
            i++;
            $('video').get(0).play();

            setInterval(function() {
                if (i == 0  && repeat) {
                    $(sliders[sliders.length-1]).toggleClass('show');
                    $(sliders[i+1]).toggleClass('show');
                    $(sliderCircles[sliderCircles.length - 1]).toggleClass('active');
                    $(sliderCircles[i]).toggleClass('active');
                } else {
                    $(sliders[i]).toggleClass('show');
                    $(sliders[i+1]).toggleClass('show');
                    $(sliderCircles[i-1]).toggleClass('active');
                    $(sliderCircles[i]).toggleClass('active');
                }

                i++;
                if (i == 4) {
                    i = 0;
                    repeat = true;
                }
            }, 5000);
        });
    });

}());

