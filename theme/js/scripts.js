$(function(){

    $(window).ready(function(){

        $("body").on('click', '[href*="#"]', function(e){
            $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - 90}, 1000);
            e.preventDefault();
        });

        //header
        var $mainMenu = $('.main-menu'),
            $mainMenuLinks = $('.main-menu a'),
            $mobileMainMenu = $('.mobile-main-menu'),
            $cityBtn = $('#city-btn'),
            $cityMenu = $('#city-menu'),
            $dropdownItems = $('.dropdown li'),
            $languageBtn = $('.language-btn'),
            $languageList = $('.language-list'),
            $headerOverlay = $('.header-overlay'),
            $clickToToggleSubmenu = $('.click-to-toggle'),
            $chooseAgeLinks = $('a[href="#choose-age"]');

        function toggleMainMenu() {
            $mainMenu.toggleClass('visible');
            $mobileMainMenu.toggleClass('visible');
            $('.main-menu-btn').toggleClass('close');
            $('.main-menu-btn svg').toggleClass('visible');
            $('.overlay').toggleClass('visible');
        }

        $('.main-menu-btn').on('click', function () {
            toggleMainMenu();
        });

        $mainMenuLinks.on('click', function() {
            toggleMainMenu();
        });

        $chooseAgeLinks.on('click', function() {
            var packageId = $(this).attr('data-package');
            $('.choose-age-item[data-package="' + packageId + '"]').click();
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

        $languageBtn.on('click', function() {
            $headerOverlay.toggleClass('show');
            $languageList.toggleClass('open');
        });

        $('.language-list li').on('click', function() {
            $headerOverlay.toggleClass('show');
            $languageList.toggleClass('open');
        });

        $clickToToggleSubmenu.on('click', function() {
            $(this).closest('.submenu-toggle').toggleClass('open');
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
            isStarPartnersIncrement = false,
            currentStepId,
            stepIcons = $('.step-item-icon'),
            clickedStepId,
            $spincrement = $(".spincrement"),
            $clockOval = $('#clock-oval'),
            step2Timer, step3Timer,
            stepCircles = $('.step-item-circle'),
            stepDuration = 9000,
            $sliderBtns = $('.slider-btn'),
            $sliderBtnLeft = $('.slider-btn.left'),
            $sliderBtnRight = $('.slider-btn.right');

        $sliderBtnLeft.hide();

        function startStepsAnimation() {
            var circleCount = 0,
                timerStep2;
            stepIcons.get(0).click();
            var timerStep1 = setInterval(function() {
                $(stepCircles.get(circleCount)).addClass('active');
                if (circleCount <= 2) {
                    circleCount++;
                }
            }, stepDuration/4);

            step2Timer = setTimeout(function() {
                clearInterval(timerStep1);
                stepCircles.removeClass('active');
                stepIcons.get(1).click();

                timerStep2 = setInterval(function() {
                    $(stepCircles.get(circleCount)).addClass('active');
                    if (circleCount <= 5) {
                        circleCount++;
                    }
                }, stepDuration/4);
            }, stepDuration);

            step3Timer = setTimeout(function() {
                clearInterval(timerStep2);
                stepCircles.removeClass('active');
                stepIcons.get(2).click();
                $('.diagram-bg').addClass('animate');
            }, stepDuration*2);
        }

        $(window).on('scroll', function() {
            var d = document.documentElement;
            if (!isStartStepAnimation) {
                var stepsSlider = document.getElementsByClassName('steps-slider'),
                    rectSlider = stepsSlider[0].getBoundingClientRect();

                if (d.clientHeight - rectSlider.bottom > 0) {
                    startStepsAnimation();
                    isStartStepAnimation = true;
                }
            }



            if (!isStarPartnersIncrement) {
                var partnerNumbers = document.getElementsByClassName('partner-numbers'),
                    rectNumbers = partnerNumbers[0].getBoundingClientRect();

                if (d.clientHeight - rectNumbers.top > 0) {
                    $('.partners-spincrement').spincrement({
                        duration: 3000,
                        thousandSeparator: ''
                    });
                    isStarPartnersIncrement = true;
                }
            }
        });


        stepIcons.on('click', function() {
            currentStepId = $('.step-item-icon.active').attr('data-step');
            clickedStepId = $(this).attr('data-step');
            $sliderBtns.show();

            if (clickedStepId == 1) {
                $sliderBtnLeft.hide();
                $clockOval.removeClass('go-time');
                $clockOval.addClass('go-time');
                $(".spincrement-1").spincrement({duration: stepDuration});
            } else if (clickedStepId == 2) {
                $(".spincrement-2").spincrement({duration: stepDuration});
            } else if (clickedStepId == 3) {
                $('.diagram-bg').addClass('animate');
                $sliderBtnRight.hide();
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
            $sliderBtns.show();
            if (Number(currentStepId) - 1 === 1) {
                $(".spincrement-1").spincrement({duration: stepDuration});
                $sliderBtnLeft.hide();
                $clockOval.addClass('go-time');
            } else if (Number(currentStepId) - 1 === 2) {
                $(".spincrement-2").spincrement({duration: stepDuration});
            } else if (Number(currentStepId) - 1 === 3) {
                $sliderBtnRight.hide();
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
            $sliderBtns.show();
            if (Number(currentStepId) + 1 === 1) {
                $sliderBtnLeft.hide();
                $(".spincrement-1").spincrement({duration: stepDuration});
            } else if (Number(currentStepId) + 1 === 2) {
                $(".spincrement-2").spincrement({duration: stepDuration});
            } else if (Number(currentStepId) + 1 === 3) {
                $sliderBtnRight.hide();
                $('.diagram-bg').addClass('animate');
            }
            $spincrement.spincrement({duration: stepDuration});

            if (currentStepId < 3) {
                $('#step-' + currentStepId).removeClass('current');
                $('#step-' + (Number(currentStepId) + 1)).addClass('current');

                stepIcons.removeClass('active');
                $('.step-item-icon[data-step="' + (Number(currentStepId) + 1) +  '"]').addClass('active');
            }
        });


    });

}());

