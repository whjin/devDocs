$(function () {
    var $box = $('#box'),
        $indicators = $('.goto-slide'),
        $effects = $('.effect'),
        $timeIndicator = $('#time-indicator'),
        slideInterval = 5000;

    var switchIndicator = function ($c, $n, currIndex, nextIndex) {
        $timeIndicator.stop().css('width', 0);
        $indicators.removeClass('current').eq(nextIndex).addClass('current');
    };

    var startTimeIndicator = function () {
        $timeIndicator.animate({
            width: '680px'
        }, slideInterval);
    };

    $box.boxSlider({
        speed: 1000,
        autoScroll: true,
        timeout: slideInterval,
        next: '#next',
        prev: '#prev',
        pause: '#pause',
        effect: 'scrollVert3d',
        blindCount: 15,
        onbefore: switchIndicator,
        onafter: startTimeIndicator

    });

    startTimeIndicator();

    $('#controls').on('click', '.goto-slide', function (e) {
        $box.boxSlider('showSlide', $(this).data('slideindex'));
        e.preventDefault();
    });

    $('#effect-list').on('click', '.effect', function (e) {
        var $effect = $(this);

        $box.boxSlider('option', 'effect', $effect.data('fx'));
        $effects.removeClass('current');
        $effect.addClass('current');

        switchIndicator(null, null, 0, 0);
        e.preventDefault();
    })
});