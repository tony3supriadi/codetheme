$(document).ready(function () {

    /* #NAVIGATION */
    $('.menu ul').superfish({
        delay: 100,
        speed: 500,
        speedOut: 200,
        animation: { opacity: 'show', height: 'show' }
    });

    /* #SLIDER */
    $(window).load(function () {
        $('.slider').fractionSlider({
            'fullWidth': true,
            'controls': true,
            'responsive': true,
            'dimensions': "1920,450",
            'increase': true,
            'pauseOnHover': true,
            'slideEndAnimation': false,
            'autoChange': true,
        });
    });

    /* #SWIPE SLIDER */
    window.mySwipe = new Swipe(document.getElementById('slider'), {
        startSlide: 2,
        speed: 400,
        auto: 3000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function (index, elem) { },
        transitionEnd: function (index, elem) { }
    });

    /*----------------------------------------------------*/
    /*	Carousel
    /*----------------------------------------------------*/
    // Add classes for other carousels
    var $carousel = $('.recent-work-jc');
    var scrollCount;
    function adjustScrollCount() {
        if ($(window).width() < 768) {
            scrollCount = 1;
        } else {
            scrollCount = 3;
        }
    }

    function adjustCarouselHeight() {
        $carousel.each(function () {
            var $this = $(this);
            var maxHeight = -1;
            $this.find('li').each(function () {
                maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
            });
            $this.height(maxHeight);
        });
    }

    function initCarousel() {
        adjustCarouselHeight();
        adjustScrollCount();
        var i = 0;
        var g = {};
        $carousel.each(function () {
            i++;
            var $this = $(this);
            g[i] = $this.jcarousel({
                animation: 600,
                scroll: scrollCount
            });
            $this.jcarousel('scroll', 0);
            $this.prev().find('.jcarousel-prev').bind('active.jcarouselcontrol', function () {
                $(this).addClass('active');
            }).bind('inactive.jcarouselcontrol', function () {
                $(this).removeClass('active');
            }).jcarouselControl({
                target: '-=' + scrollCount,
                carousel: g[i]
            });

            $this.prev().find('.jcarousel-next').bind('active.jcarouselcontrol', function () {
                $(this).addClass('active');
            }).bind('inactive.jcarouselcontrol', function () {
                $(this).removeClass('active');
            }).jcarouselControl({
                target: '+=' + scrollCount,
                carousel: g[i]
            });

            $this.touchwipe({
                wipeLeft: function () {
                    $this.jcarousel('scroll', '+=' + scrollCount);
                },
                wipeRight: function () {
                    $this.jcarousel('scroll', '-=' + scrollCount);
                }
            });
        });
    }

    $(window).load(function () {
        initCarousel();
    });

    $(window).resize(function () {
        $carousel.each(function () {
            var $this = $(this);
            $this.jcarousel('destroy');
        });
        initCarousel();
    });

})