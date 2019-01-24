$(function () {
    var interval = 4000;
    var current = 0;
    var current_thumb = 0;
    var num_thumb_wrapper = $('#msg_thumbs .msg_thumb_wrapper').length;
    var num_images_wrapper = 6;

    play();
    slideshowMouseEvent();

    function slideshowMouseEvent() {
        $('#msg_slideshow').unbind('mouseenter')
            .bind('mouseenter', showControls)
            .andSelf()
            .unbind('mouseleave')
            .bind('mouseleave', hideControls)
    }

    $('#msg_grid').bind('click', function (e) {
        hideControls();
        $('#msg_slideshow').unbind('mouseenter').unbind('mouseleave');
        pause();
        $('#msg_thumbs').stop().animate({'top': '0'}, 500);
        e.preventDefault();
    });

    $('#msg_thumb_close').bind('click', function (e) {
        showControls();
        slideshowMouseEvent();
        $("#msg_thumbs").stop().animate({'top': '-230px'}, 500);
        e.preventDefault();
    });

    $("#msg_pause_play").bind('click', function (e) {
        var $this = $(this);
        if ($this.hasClass('msg_play')) {
            play();
        } else {
            pause();
        }
        e.preventDefault();
    });

    $('#msg_next').bind('click', function (e) {
        pause();
        next();
        e.preventDefault();
    });
    $('#msg_prev').bind('click', function (e) {
        pause();
        prev();
        e.preventDefault();
    });

    function showControls() {
        $('#msg_controls').stop().animate({'right': '15px'}, 500);
    }

    function hideControls() {
        $("#msg_controls").stop().animate({'right': '-110px'}, 500);
    }

    function play() {
        next();
        $('#msg_pause_play').addClass('msg_pause').removeClass('msg_play');
        playtime = setInterval(next, interval);
    }

    function pause() {
        $('#msg_pause_play').addClass('msg_play').removeClass('msg_pause');
        clearTimeout(playtime);
    }

    function next() {
        ++current;
        showImage('r');
    }

    function prev() {
        --current;
        showImage('l');
    }

    function showImage(direction) {
        alternateThumbs();
        var $thumb = $('#msg_thumbs .msg_thumb_wrapper:nth-child(' + current_thumb + ')')
            .find('a:nth-child(' + parseInt(current - num_images_wrapper * (current_thumb - 1)) + ')')
            .find('img');
        if ($thumb.length) {
            var source = $thumb.attr('alt');
            var $currentImage = $('#msg_wrapper').find('img');
            if ($currentImage.length) {
                $currentImage.fadeOut(function () {
                    $(this).remove();
                    $('<img>').load(function () {
                        var $image = $(this);
                        resize($image);
                        $image.hide();
                        $('#msg_wrapper').empty().append($image.fadeIn());
                    }).attr('src', source);
                })
            } else {
                $('<img>').load(function () {
                    var $image = $(this);
                    resize($image);
                    $image.hide();
                    $('#msg_wrapper').empty().append($image.fadeIn())
                }).attr('src', source);
            }
        } else {
            if (direction == 'r') {
                --current;
            } else if (direction == 'l') {
                ++current;
            }
            alternateThumbs();
            return;
        }
    }

    function alternateThumbs() {
        $('#msg_thumbs').find('.msg_thumb_wrapper:nth-child(' + current_thumb + ')').hide();
        current_thumb = Math.ceil(current / num_images_wrapper);

        if (current_thumb > num_thumb_wrapper) {
            current_thumb = 1;
            current = 1;
        } else if (current_thumb == 0) {
            current_thumb = num_thumb_wrapper;
            current = current_thumb * num_images_wrapper;
        }
        $('#msg_thumbs').find('.msg_thumb_wrapper:nth-child(' + current_thumb + ')').show();
    }

    $('#msg_thumb_next').bind('click', function (e) {
        next_thumb();
        e.preventDefault();
    });
    $('#msg_thumb_prev').bind('click', function (e) {
        prev_thumb();
        e.preventDefault();
    });

    function next_thumb() {
        var $next_wrapper = $('#msg_thumbs').find('.msg_thumb_wrapper:nth-child(' + parseInt(current_thumb + 1) + ')');
        if ($next_wrapper.length) {
            $('#msg_thumbs').find('.msg_thumb_wrapper:nth-child(' + current_thumb + ')').fadeOut(function () {
                ++current_thumb;
                $next_wrapper.fadeIn();
            })
        }
    }

    function prev_thumb() {
        var $prev_wrapper = $('#msg_thumbs').find('.msg_thumb_wrapper:nth-child(' + parseInt(current_thumb - 1) + ')');
        if ($prev_wrapper.length) {
            $('#msg_thumbs').find('.msg_thumb_wrapper:nth-child(' + current_thumb + ')').fadeOut(function () {
                --current_thumb;
                $prev_wrapper.fadeIn();
            })
        }
    }

    $('#msg_thumbs .msg_thumb_wrapper > a').bind('click', function (e) {
        var $this = $(this);
        $('#msg_thumb_close').trigger('click');
        var $index = $this.index();
        var $parent_index = $this.parent().index();
        current = parseInt($parent_index * num_images_wrapper + $index + 1);
        showImage();
        e.preventDefault();
    }).bind('mouseenter', function () {
        var $this = $(this);
        $this.stop().animate({'opacity': '1'})
            .bind('mouseleave', function () {
                var $this = $(this);
                $this.stop().animate({'opacity': '0.5'})
            })
    });

    function resize($image) {
        var theImage = new Image();
        theImage.src = $image.attr('src');
        var imgWidth = theImage.width;
        var imgHeight = theImage.height;

        var containerWidth = 400;
        var containerHeight = 400;

        if (imgWidth > containerWidth) {
            var newWidth = containerWidth;
            var ratio = imgWidth / containerWidth;
            var newHeight = imgHeight / ratio;
            if (newHeight > containerHeight) {
                var $newHeight = containerHeight;
                var $ratio = newHeight / containerHeight;
                var $newWidth = newWidth / $ratio;
                theImage.width = $newWidth;
                theImage.height = $newHeight;
            } else {
                theImage.width = newWidth;
                theImage.height = newHeight;
            }
        } else if (imgHeight > containerHeight) {
            var newHeight = containerHeight;
            var ratio = imgHeight / containerHeight;
            var newWidth = imgWidth / ratio;
            if (newWidth > containerWidth) {
                var $newWidth = containerWidth;
                var $ratio = newWidth / containerWidth;
                var $newHeight = newHeight / $ratio;
                theImage.height = $newHeight;
                theImage.width = $newWidth;
            } else {
                theImage.width = newWidth;
                theImage.height = newHeight;
            }
        }
        $image.css({
            'width': theImage.width,
            'height': theImage.height
        })
    }
});

