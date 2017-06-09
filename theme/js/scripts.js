$(function(){

    $(window).ready(function(){
        var $mainMenu = $('.main-menu');

        $('.main-menu-btn').on('click', function () {
            $mainMenu.toggleClass('visible');
            $('.main-menu-btn').toggleClass('close');
            $('.main-menu-btn svg').toggleClass('visible');
            $('.overlay').toggleClass('visible');
        });

        $(document).mouseup(function (e) {
            var header = $("header");

            if (!header.is(e.target) && header.has(e.target).length === 0) {
                if ($mainMenu.hasClass('visible')) {
                    $mainMenu.toggleClass('visible');
                    $('.main-menu-btn').toggleClass('close');
                    $('.main-menu-btn svg').toggleClass('visible');
                    $('.overlay').toggleClass('visible');
                }
            }
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
                if (i === 0  && repeat) {
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
                if (i === 4) {
                    i = 0;
                    repeat = true;
                }
            }, 5000);
        });

        var packageScheme = {
            "4-7": [1, 2, 3, 12],
            "7-11": [1, 5, 2, 3, 6],
            "11-14": [1, 7, 2, 3, 8],
            "14-17": [1, 9, 4, 3],
            "17": [11, 10, 3]
        };

        var currentPackage = $('.choose-age-item.active').attr('data-package');
        var $packageSections = $('.package-section');
        var $ageItems = $('.choose-age-item');

        packageScheme[currentPackage].forEach(function(id) {
            $('.package-section[data-id="' + id + '"]').addClass('show-section');
        });

        $ageItems.on('click', function() {
            $ageItems.removeClass('active');
            $(this).addClass('active');

            currentPackage = $(this).attr('data-package');
            $packageSections.removeClass('show-section');

            packageScheme[currentPackage].forEach(function(id) {
                $('.package-section[data-id="' + id + '"]').addClass('show-section');
            });
        });



        $packageSections.on('mouseenter', function(e) {
            $packageSections.removeClass('current');
            $(this).addClass('current');

            var sectionId = $(this).attr('data-id');

            $('.package-section-description__text-container').removeClass('current');
            $('.package-section-description__text-container[data-id="' + sectionId + '"]').addClass('current');
        })


    });

}());

