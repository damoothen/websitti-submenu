(function($){

    $.fn.submenu = function(params){

        var defaults = {
            duration: 200
        };

        params = $.extend({}, defaults, params);

        return this.each(function(){

            var $button = $(this);
            var $window = $(window);
            var id = $button.data('target');
            var align = $button.data('align');
            var $menu = $('#' + id);
            var visible = false;

            var menuWidth = $menu.outerWidth();
            var menuOffset = $button.offset();

            // Place menu after button in DOM.
            $button.after($menu);

            // If menu width is less than button width, set menu width to be equal to button width.
            if ($menu.outerWidth() < $button.outerWidth()) {
                menuWidth = $button.outerWidth();
            }

            // If menu width is more than screen width, set it to be equal to window width
            else if (menuWidth > $window.width()) {
                menuWidth = $window.width();
                menuOffset.left = 0;
            }

            else {
                if (align === 'right') {
                    menuOffset.left = menuOffset.left - menuWidth + $button.outerWidth();
                    if (menuOffset.left < 0) {
                        menuOffset.left = 0;
                    }
                }

                // If no align, menu is aligned to left. Check if menu does not get out of screen
                else {
                    if (menuOffset.left + $menu.outerWidth() > $window.width()) {
                        menuOffset.left = $window.width() - $menu.outerWidth();
                    }
                }
            }

            $menu.width(menuWidth);
            $menu.offset(menuOffset);

            // Display menu
            var showMenu = function(e){
                e.preventDefault();
                var $s = e.data;
                if (!visible) {
                    $s.css({
                        'opacity': 0,
                        'visibility': 'visible'
                    }).animate({
                        'opacity': 1
                    }, params.duration, function(){
                        visible = true;
                        $window.bind('click', $s, hideMenu);
                        $menu.bind('mouseleave', $s, hideMenu);
                    });
                }
            };

            // Hide menu
            var hideMenu = function(e){
                if (visible) {
                    var $s = e.data;
                    $s.animate({
                        opacity: 0
                    }, params.duration, function(){
                        $s.css('visibility', 'hidden');
                        visible = false;
                        $window.unbind('click', hideMenu);
                        $menu.unbind('mouseleave', hideMenu);
                    });
                }
            };

            $button.bind('click', $menu, showMenu);

        });

    };

})(jQuery);
