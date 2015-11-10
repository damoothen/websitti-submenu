(function ($) {

    $.fn.submenu = function (params) {

        var defaults = {
            duration: 100
        };

        params = $.extend({}, defaults, params);


        // Show a submenu with fade in animation
        var showSubmenu = function ($s) {
            $s.css({
                opacity: 0,
                visibility: 'visible'
            }).animate({
                opacity: 1
            }, params.duration);
            return $s;
        };

        // Hide a submenu with fade out animation
        var hideSubmenu = function ($s) {
            $s.animate({
                opacity: 0
            }, params.duration, function () {
                $s.css({
                    visibility: 'hidden'
                });
            });
            return $s;
        };

        return this.each(function () {
            var $button = $(this);
            var $submenu = $('#' + $button.data('target'));
            var coordinates = $button.offset();
            var align = $submenu.data('align');
            var trigger = $button.data('trigger') === 'hover' ? 'mouseenter' : 'click';
            
            // Make submenu minimum width equal to button width
            $submenu.css('min-width', $button.css('width'));
                        
            // Make submenu max width equal to browser width
            $submenu.css('max-width', $(window).width() + 'px');
            
            // Left edge of submenu is aligned with left side of button
            // Special case for right align, set with data-align to right on submenu
            if (align === 'right')
                coordinates.left += ($button.outerWidth() - $submenu.outerWidth());

            $button.on(trigger, function (e) {
                e.preventDefault();
                $submenu.offset(coordinates);
                showSubmenu($submenu);
            });

            $submenu.mouseleave(function () {
                hideSubmenu($submenu);
            });

            $('a', $submenu).click(function (e) {
                hideSubmenu($submenu);
            });

        });

    };

})(jQuery);
