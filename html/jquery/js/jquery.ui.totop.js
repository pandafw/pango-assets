(function($) {
	$.fn.totop = function() {
		$(this).each(function() {
			var $t = $(this);
			$t.click(function() {
				$('html,body').animate({ scrollTop: 0 }, 'slow');
			}).css({cursor: 'pointer'});
	
			var $w = $(window);
			$w.scroll(function() {
				$t[$w.scrollTop() > $w.height() ? 'show' : 'hide']();
			});
		});
	};

	$(window).on('load', function() {
		$('[totop]').totop();
	});
})(jQuery);

