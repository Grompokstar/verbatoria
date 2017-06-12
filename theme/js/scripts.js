$(function(){

    $(window).ready(function(){

        //header
        var $mainMenu = $('.main-menu'),
            $cityBtn = $('#city-btn'),
            $cityBtnIcon = $('#city-btn .fa'),
            $cityMenu = $('#city-menu'),
            $dropdownItems = $('.dropdown li');

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

        $cityBtn.on('click', function() {
            $(this).closest('.dropdown').toggleClass('city-bg');
            $('#city-btn .fa').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
            $cityMenu.toggleClass('show');
        });

        $dropdownItems.on('click', function() {
            $cityMenu.toggleClass('show');
            var city = $(this).find('a').html();
            $cityBtn.html(city + '<span class="fa fa-angle-down">');
        });



        //video-slider

        var sliders = $('.video-slider__text'),
            sliderCircles = $('.slider-circles .circle'),
            i = 0,
            repeat = false;

        $('#play-btn-circle').addClass('go-time');

        setTimeout(function() {
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
        }, 10000);

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
        var sectionBackground = $('.package-section-description');
        var backgrounds = ['2_4-7', '2_7-11', '2_11-14', '3_4-7', '3_7-11', '3_11-14', '3_14-17', '3_17', '4_14-17',
            '5_7-11', '6_7-11', '7_11-14', '8_11-14', '9_14-17', '10_14-17', '10_17', '11_17', '12_4-7'];

        packageScheme[currentPackage].forEach(function(id) {
            $('.package-section[data-id="' + id + '"]').addClass('show-section').css('order', i);
        });



        // Пакеты исследований

        $ageItems.on('click', function() {
            $ageItems.removeClass('active');
            $(this).addClass('active');
            $packageSections.removeClass('current');

            currentPackage = $(this).attr('data-package');
            $packageSections.removeClass('show-section');

            packageScheme[currentPackage].forEach(function(id, i) {
                var $currentSection = $('.package-section[data-id="' + id + '"]');
                var sectionId = $currentSection.attr('data-id');
                var sectionBgIndex = sectionId;
                if (backgrounds.indexOf(sectionId + '_' + currentPackage) !== -1) {
                    sectionBgIndex += '_' + currentPackage;
                }

                if (i === 0) {
                    $currentSection.addClass('current');
                    $('.package-section-description__text-container').removeClass('current');
                    $('.package-section-description__text-container[data-id="' + sectionId + '"]').addClass('current');
                    sectionBackground.css('background-image', 'url("theme/images/Home/bullets_bg/' + sectionBgIndex + '.jpg")');
                }

                $currentSection.addClass('show-section').css('order', i);
            });
        });


        $packageSections.on('mouseenter', function(e) {
            $packageSections.removeClass('current');
            $(this).addClass('current');

            var sectionId = $(this).attr('data-id');
            var sectionBgIndex = sectionId;
            if (backgrounds.indexOf(sectionId + '_' + currentPackage) !== -1) {
                sectionBgIndex += '_' + currentPackage;
            }

            sectionBackground.css('background-image', 'url("theme/images/Home/bullets_bg/' + sectionBgIndex + '.jpg")');

            $('.package-section-description__text-container').removeClass('current');
            $('.package-section-description__text-container[data-id="' + sectionId + '"]').addClass('current');
        });

        //Шаги "Как мы работаем"

        var isStartStepAnimation = false,
            currentStepId,
            stepIcons = $('.step-item-icon'),
            clickedStepId,
            $spincrement = $(".spincrement"),
            $clockOval = $('#clock-oval'),
            step2Timer, step3Timer,
            stepCircles = $('.step-item-circle');

        function startStepsAnimation() {
            var circleCount = 0,
                timerStep2;
            stepIcons.get(0).click();
            var timerStep1 = setInterval(function() {
                $(stepCircles.get(circleCount)).addClass('active');
                if (circleCount <= 2) {
                    circleCount++;
                }
            }, 1500);

            step2Timer = setTimeout(function() {
                clearInterval(timerStep1);
                stepCircles.removeClass('active');
                stepIcons.get(1).click();

                timerStep2 = setInterval(function() {
                    $(stepCircles.get(circleCount)).addClass('active');
                    if (circleCount <= 5) {
                        circleCount++;
                    }
                }, 1500);
            }, 6000);

            step3Timer = setTimeout(function() {
                clearInterval(timerStep2);
                stepCircles.removeClass('active');
                stepIcons.get(2).click();
                $('.diagram-bg').addClass('animate');
            }, 12000);
        }

        $(window).on('scroll', function() {
            if (!isStartStepAnimation) {
                var stepsSlider = document.getElementsByClassName('steps-slider'),
                    rect = stepsSlider[0].getBoundingClientRect(),
                    d = document.documentElement;

                if (d.clientHeight - rect.bottom > 0) {
                    startStepsAnimation();
                    isStartStepAnimation = true;
                }
            }

        });


        stepIcons.on('click', function() {
            currentStepId = $('.step-item-icon.active').attr('data-step');
            clickedStepId = $(this).attr('data-step');

            if (clickedStepId == 1) {
                $clockOval.removeClass('go-time');
                $clockOval.addClass('go-time');
                $(".spincrement-1").spincrement({duration: 6000});
            } else if (clickedStepId == 2) {
                $(".spincrement-2").spincrement({duration: 6000});
            }

            if (clickedStepId != currentStepId) {
                stepIcons.removeClass('active');
                $(this).addClass('active');
                $('.step').removeClass('current');
                $('#step-' + clickedStepId).addClass('current');
            }



        });

        $('.slider-btn.left').on('click', function() {
            clearTimeout(step2Timer);
            clearTimeout(step3Timer);
            currentStepId = $('.step.current').attr('data-step');
            if (Number(currentStepId) - 1 === 1) {
                $(".spincrement-1").spincrement({duration: 6000});
            } else if (Number(currentStepId) - 1 === 2) {
                $(".spincrement-2").spincrement({duration: 6000});
            }

            if (currentStepId > 1) {
                $('#step-' + currentStepId).removeClass('current');
                $('#step-' + (Number(currentStepId) - 1)).addClass('current');

                stepIcons.removeClass('active');
                $('.step-item-icon[data-step="' + (Number(currentStepId) - 1) +  '"]').addClass('active');
            }
        });


        $('.slider-btn.right').on('click', function() {
            clearTimeout(step2Timer);
            clearTimeout(step3Timer);
            currentStepId = $('.step.current').attr('data-step');
            if (Number(currentStepId) + 1 === 1) {
                $(".spincrement-1").spincrement({duration: 6000});
            } else if (Number(currentStepId) + 1 === 2) {
                $(".spincrement-2").spincrement({duration: 6000});
            }
            $spincrement.spincrement({duration: 6000});

            if (currentStepId < 3) {
                $('#step-' + currentStepId).removeClass('current');
                $('#step-' + (Number(currentStepId) + 1)).addClass('current');

                stepIcons.removeClass('active');
                $('.step-item-icon[data-step="' + (Number(currentStepId) + 1) +  '"]').addClass('active');
            }
        });


    });

}());

