$(function(){

    $(window).ready(function(){

        //video-slider

        var slidesContainer = $('.slides'),
            sliderCirclesBlock = $('.slider-circles'),
            sliderCircles = $('.slider-circles .circle'),
            sliderImg = $('.slider-img'),
            sliderStartText = $('.video-slider__text'),
            sliderTextItems = $('.slides .text-item'),
            sliderItems = $('.video-slider__item'),
            clickedSlideId, videoSlidesInterval,
            videos = $('video'),
            i = 0,
            repeat = false,
            firstVideo = document.getElementById('first-video'),
            $playBtnCircle = $('#play-btn-circle'),
            desktop = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (desktop) {
            setTimeout(function() {
                firstVideo.play();
            }, 1000);
            firstVideo.addEventListener('timeupdate', videoPreloadAnimation);
        } else {
            videos.remove();
            for (var j = 0; j < sliderItems.length; j++) {
                sliderItems.eq(j).addClass('slide-background_' + (j + 1));
            }
            $playBtnCircle.addClass('go-time');
            setTimeout(startVideoSlider, 7000);
        }

        function videoPreloadAnimation() {
            var duration = firstVideo.duration;
            var progress = 200 - (firstVideo.currentTime / duration) * 200;

            $playBtnCircle.attr('stroke-dashoffset', progress);
            if (progress === 200) {
                startVideoSlider();
            }
        }

        function startVideoSlider() {
            firstVideo.removeEventListener('timeupdate', videoPreloadAnimation);
            sliderImg.addClass('hide-left');
            sliderStartText.addClass('hide-left');
            sliderCirclesBlock.show();
            if (desktop) {
                videos.get(i).currentTime = 0;
                videos.get(i).play();
            }
            sliderTextItems.eq(i).addClass('visible-text');
            slidesContainer.addClass('show-' + i);

            videoSlidesInterval = setInterval(function() {
                if (i === 0  && repeat) {
                    slidesContainer.removeClassWild("show-*");
                    slidesContainer.addClass('show-' + i);
                    sliderTextItems.removeClass('visible-text');
                    sliderTextItems.eq(i).addClass('visible-text');
                    $(sliderCircles[sliderCircles.length - 1]).toggleClass('active');
                    $(sliderCircles[i]).toggleClass('active');
                    if (desktop) {
                        videos.get(3).pause();
                        videos.get(i).currentTime = 0;
                        videos.get(i).play();
                    }

                } else if (repeat) {
                    slidesContainer.removeClassWild("show-*");
                    slidesContainer.addClass('show-' + i);
                    sliderTextItems.removeClass('visible-text');
                    sliderTextItems.eq(i).addClass('visible-text');
                    $(sliderCircles[i - 1]).toggleClass('active');
                    $(sliderCircles[i]).toggleClass('active');
                    if (desktop) {
                        videos.get(i - 1).pause();
                        videos.get(i).currentTime = 0;
                        videos.get(i).play();
                    }

                } else {
                    slidesContainer.removeClassWild("show-*");
                    slidesContainer.addClass('show-' + (i+1));
                    sliderTextItems.removeClass('visible-text');
                    sliderTextItems.eq(i + 1).addClass('visible-text');
                    $(sliderCircles[i]).toggleClass('active');
                    $(sliderCircles[i + 1]).toggleClass('active');
                    if (desktop) {
                        videos.get(i).pause();
                        videos.get(i+1).play();
                    }
                }

                i++;
                if (repeat) {
                    if (i === 4) {
                        i = 0;
                    }
                } else {
                    if (i === 3) {
                        i = 0;
                        repeat = true;
                    }
                }
            }, 5000);
        }

        sliderCircles.on('click', function() {
            clearInterval(videoSlidesInterval);

            clickedSlideId = $(this).attr('data-id');
            videos.get(clickedSlideId).play();
            sliderCircles.removeClass('active');
            $(sliderCircles[clickedSlideId]).addClass('active');
            slidesContainer.removeClassWild("show-*");
            slidesContainer.addClass('show-' + clickedSlideId);
            sliderTextItems.removeClass('visible-text');
            sliderTextItems.eq(clickedSlideId).addClass('visible-text');

            if (desktop) {
                for (var i = 0; i < videos.length; i++) {
                    if (i !== clickedSlideId) {
                        videos.get(i).pause();
                    }
                }

                videos.get(clickedSlideId).currentTime = 0;
                videos.get(clickedSlideId).play();
            }
        });



        // Пакеты исследований

        var packageScheme = {
            "4-7": [1, 2, 12],
            "7-11": [1, 5, 2, 6],
            "11-14": [1, 7, 2, 8],
            "14-17": [1, 9, 4],
            "17": [11, 10]
        };

        var currentPackage = $('.choose-age-item.active').attr('data-package');
        var $packageSections = $('.package-section:not(.static)');
        var $ageItems = $('.choose-age-item');
        var sectionBackground = $('.package-section-description');
        var backgrounds = ['2_4-7', '2_7-11', '2_11-14', '3_4-7', '3_7-11', '3_11-14', '3_14-17', '3_17', '4_14-17',
            '5_7-11', '6_7-11', '7_11-14', '8_11-14', '9_14-17', '10_14-17', '10_17', '11_17', '12_4-7'];

        packageScheme[currentPackage].forEach(function(id) {
            $('.package-section[data-id="' + id + '"]').addClass('show-section').css('order', i);
        });


        $ageItems.on('click', function() {
            $ageItems.removeClass('active');
            $(this).addClass('active');
            $packageSections.removeClass('current');

            currentPackage = $(this).attr('data-package');
            $packageSections.removeClass('show-section');

            if (!desktop) {
                $('.mobile-age-package__wrapper[data-package="' + currentPackage + '"]').addClass('visible');
                $('body').addClass('overflow-hidden');
            }

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

                $currentSection.addClass('show-section').css('order', i-5);
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
            step2Timer, step3Timer, stepReturnTimer,
            stepCircles = $('.step-item-circle'),
            stepDuration = 9000,
            $sliderBtns = $('.slider-btn'),
            $sliderBtnLeft = $('.slider-btn.left'),
            $sliderBtnRight = $('.slider-btn.right'),
            $stepIconsDisableOverlay = $('.how-to-work-step-icons .disable-overlay');

        $sliderBtnLeft.hide();

        function startStepsAnimation() {
            var circleCount = 0,
                timerStep2;
            stepIcons.get(0).click();
            $sliderBtns.hide();
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
                $sliderBtns.hide();

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
                $sliderBtns.hide();
                $('.diagram-bg').addClass('animate');
            }, stepDuration*2);

            stepReturnTimer = setTimeout(function() {
                $stepIconsDisableOverlay.hide();
                $sliderBtnLeft.click();
                setTimeout(function() {
                    $sliderBtnLeft.click();
                }, 1000);
            }, stepDuration*3);
        }


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
                $(".spincrement-2").spincrement({duration: stepDuration/2});
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

        $sliderBtnLeft.on('click', function() {
            clearTimeout(step2Timer);
            clearTimeout(step3Timer);
            currentStepId = $('.step.current').attr('data-step');
            $sliderBtns.show();
            if (Number(currentStepId) - 1 === 1) {
                $sliderBtnLeft.hide();
            }  else if (Number(currentStepId) - 1 === 3) {
                $sliderBtnRight.hide();
            }

            if (currentStepId > 1) {
                $('#step-' + currentStepId).removeClass('current');
                $('#step-' + (Number(currentStepId) - 1)).addClass('current');

                stepIcons.removeClass('active');
                $('.step-item-icon[data-step="' + (Number(currentStepId) - 1) +  '"]').addClass('active');
            }
        });


        $sliderBtnRight.on('click', function() {
            clearTimeout(step2Timer);
            clearTimeout(step3Timer);
            currentStepId = $('.step.current').attr('data-step');
            $sliderBtns.show();
            if (Number(currentStepId) + 1 === 1) {
                $sliderBtnLeft.hide();
            } else if (Number(currentStepId) + 1 === 3) {
                $sliderBtnRight.hide();
            }
            $spincrement.spincrement({duration: stepDuration});

            if (currentStepId < 3) {
                $('#step-' + currentStepId).removeClass('current');
                $('#step-' + (Number(currentStepId) + 1)).addClass('current');

                stepIcons.removeClass('active');
                $('.step-item-icon[data-step="' + (Number(currentStepId) + 1) +  '"]').addClass('active');
            }
        });

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


        //mobile age packages

        var mobilePackageSectionsToggle = $('.mobile-package-section__toggle'),
            mobilePackageCloseButtons = $('.mobile-age-package__wrapper .close-btn');


        mobilePackageSectionsToggle.on('click', function() {
            $(this).closest('.mobile-package-section').toggleClass('open');
        });

        mobilePackageCloseButtons.on('click', function() {
            $(this).closest('.mobile-age-package__wrapper').removeClassWild('visible');
            $('body').removeClass('overflow-hidden');
        });


    });

}());