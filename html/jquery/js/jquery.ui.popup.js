(function ($) {
	function __click(evt) {
		var el = evt.target;
		if (!el || el.tagName == "HTML") {
			return;
		}

		var $e = $(el);
		if ($e.hasClass('ui-popup') || $e.closest('.ui-popup').length) {
			return;
		}

		var $c = $('.ui-popup:visible>.ui-popup-content'), c = $c.data('popup');
		if (c && c.trigger == el) {
			return;
		}

		_hide($c);
		$(document).off('click.popup');
	}

	function __ajaxError(xhr, status, err) {
		if (xhr.responseJSON) {
			return JSON.stringify(xhr.responseJSON, null, 2);
		}

		return xhr.responseText || '<h1>' + (err || status) + '</h1>';
	}

	function __align($p, trigger, position) {
		var $a = $p.find('.ui-popup-arrow').hide();
		if (position == 'center') {
			$p.addClass('ui-popup-center').css({
				top: '50%',
				left: '50%'
			});
			return;
		}

		$p.removeClass('ui-popup-center');

		var $t = $(trigger), tw = $t.outerWidth(), th = $t.outerHeight(), p = $t.offset();
		var $w = $(window), pw = $p.outerWidth(), ph = $p.outerHeight();

		switch (position) {
			case 'top left':
				p.top -= (ph + 11); // arrow height
				p.left -= (pw - 50);
				$a.attr('class', 'ui-popup-arrow dn hr1 vb');
				break;
			case 'top right':
				p.top -= (ph + 11); // arrow height
				p.left += (tw - 50);
				$a.attr('class', 'ui-popup-arrow dn hl1 vb');
				break;
			case 'top center':
				p.top -= (ph + 11); // arrow height
				p.left += (tw - pw) / 2;
				$a.attr('class', 'ui-popup-arrow dn hc vb');
				break;
			case 'top':
				p.top -= (ph + 11); // arrow height
				var x = p.left + (tw - pw) / 2;
				if (x > $w.scrollLeft()) {
					p.left = x;
					$a.attr('class', 'ui-popup-arrow dn hc vb');
				} else {
					p.left += (tw - 50);
					$a.attr('class', 'ui-popup-arrow dn hl1 vb');
				}
				break;
			case 'bottom left':
				p.top += th + 11; // arrow height
				p.left -= (pw - 50);
				$a.attr('class', 'ui-popup-arrow up hr1 vt');
				break;
			case 'bottom right':
				p.top += th + 11; // arrow height
				p.left += (tw - 50);
				$a.attr('class', 'ui-popup-arrow up hl1 vt');
				break;
			case 'bottom center':
				p.top += th + 11; // arrow height
				p.left += (tw - pw) / 2;
				$a.attr('class', 'ui-popup-arrow up hc vt');
				break;
			case 'bottom':
				p.top += th + 11; // arrow height
				var x = p.left + (tw - pw) / 2;
				if (x > $w.scrollLeft()) {
					p.left = x;
					$a.attr('class', 'ui-popup-arrow up hc vt');
				} else {
					p.left += (tw - 50);
					$a.attr('class', 'ui-popup-arrow up hl1 vt');
				}
				break;
			case 'left down':
				p.left -= (pw + 11); // arrow width
				p.top -= 20;
				$a.attr('class', 'ui-popup-arrow rt hr vt1');
				break;
			case 'left up':
				p.left -= (pw + 11); // arrow width
				p.top = p.top - ph + th + 20;
				$a.attr('class', 'ui-popup-arrow rt hr vb1');
				break;
			case 'left middle':
				p.left -= (pw + 11); // arrow width
				p.top -= (ph / 2 - 20);
				$a.attr('class', 'ui-popup-arrow rt hr vm');
				break;
			case 'left':
				p.left -= (pw + 11); // arrow width
				var y = p.top - (ph / 2 - 20);
				if (y > $w.scrollTop()) {
					p.top = y;
					$a.attr('class', 'ui-popup-arrow rt hr vm');
				} else {
					p.top -= 20;
					$a.attr('class', 'ui-popup-arrow rt hr vt1');
				}
				break;
			case 'right down':
				p.left += tw + 11; // arrow width
				p.top -= 20;
				$a.attr('class', 'ui-popup-arrow lt hl vt1');
				break;
			case 'right up':
				p.left += tw + 11; // arrow width
				p.top = p.top - ph + th + 20;
				$a.attr('class', 'ui-popup-arrow lt hl vb1');
				break;
			case 'right middle':
				p.left += tw + 11; // arrow width
				p.top -= (ph / 2 - 20);
				$a.attr('class', 'ui-popup-arrow lt hl vm');
				break;
			case 'right':
				p.left += tw + 11; // arrow width
				var y = p.top - (ph / 2 - 20);
				if (y > $w.scrollTop()) {
					p.top = y;
					$a.attr('class', 'ui-popup-arrow lt hl vm');
				} else {
					p.top -= 20;
					$a.attr('class', 'ui-popup-arrow lt hl vt1');
				}
				break;
			case 'auto':
			default:
				var x = p.left + (pw / 2) - $w.scrollLeft(), y = p.top + (ph / 2) - $w.scrollTop();
				if (y > $w.height() / 2 && p.top - ph - 11 >= 0) {
					p.top -= (ph + 11); // arrow height
					p.left += (tw - pw) / 2;
					$a.attr('class', 'ui-popup-arrow dn hc vb');
				} else {
					p.top += th + 11; // arrow height
					p.left += (tw - pw) / 2;
					$a.attr('class', 'ui-popup-arrow up hc vt');
				}
				break;
		}

		$p.css({
			position: 'absolute',
			top: p.top + "px",
			left: p.left + "px"
		});
		$a.show();
	}

	function __mypop($c) {
		return $c.parent('.ui-popup');
	}

	function _toggle($c, trigger) {
		trigger = trigger || window;
		var $p = __mypop($c);
		if ($p.is(':hidden')) {
			_show($c, trigger);
			return;
		}

		var c = $c.data('popup');
		if (c.trigger === trigger) {
			_hide($c);
			return;
		}

		_show($c, trigger);
	}

	function _show($c, trigger) {
		_hide($('.ui-popup:visible>.ui-popup-content'));

		var $p = __mypop($c).show(), c = $c.data('popup');

		if (!c.loaded) {
			c.showing = trigger || window;
			__align($p, c.showing, c.position);
			_load($c);
			return;
		}

		$c.trigger('show.popup');

		c.trigger = trigger || window;
		__align($p, c.trigger, c.position);
		$c.hide().css('visibility', 'visible')[c.transition](function () {
			$c.trigger('shown.popup');
			if (c.clickHide == true || c.clickHide == 'true') {
				$(document).on('click.popup', __click);
			}
		});
	}

	function _hide($c) {
		$c.trigger('hide.popup');
		var $p = __mypop($c);
		if ($p.is(':visible')) {
			$p.hide();
			$(document).off('click.popup');
			$c.trigger('hidden.popup');
		}
	}

	function _load($c, c) {
		$c.trigger('load.popup');
		$c.html('<div class="ui-popup-loading"></div>');

		c = $.extend($c.data('popup'), c);
		$.ajax({
			url: c.url,
			data: c.data,
			dataType: c.dataType,
			method: c.method,
			success: function (html) {
				$c.css('visibility', 'hidden').html(html);
			},
			error: function (xhr, status, err) {
				$c.css('visibility', 'hidden').html((c.ajaxError || __ajaxError)(xhr, status, err));
			},
			complete: function () {
				c.loaded = true;
				$c.trigger('loaded.popup');
				if (c.showing) {
					if (__mypop($c).is(':visible')) {
						_show($c, c.showing);
					}
					delete c.showing;
				}
			}
		});
	}

	function _update($c, o) {
		if (o) {
			$.extend($c.data('popup'), o);
		}
	}

	function _callback($c) {
		var c = $c.data('popup');
		if (typeof (c.callback) == 'function') {
			c.callback.apply(c.trigger, [].slice.call(arguments, 1));
		}
	}

	function __camelCase(s) {
		s = s.charAt(0).toLowerCase() + s.slice(1);
		return s.replace(/[-_](.)/g, function(m, g) {
			return g.toUpperCase();
		});
	}

	function __options($c) {
		var c = {};
		var ks = ['url', 'method', 'data', 'data-type', 'position', 'transition', 'click-hide', 'callback'];
		$.each(ks, function (i, k) {
			var o = $c.attr('popup-' + k);
			if (o !== undefined && o !== null && o != '') {
				k = __camelCase(k);
				c[k] = k == 'callback' ? new Function(o) : o;
			}
		})
		return c;
	}

	function __init($c, c) {
		var $p = __mypop($c);
		if ($p.length) {
			_update($c, c);
			return;
		}

		c = $.extend({}, $.popup.defaults, __options($c), c);

		$p = $('<div class="ui-popup">').css({ 'display': 'none' })
			.append($('<div class="ui-popup-arrow">'))
			.append($('<i class="ui-popup-close">&times;</i>'))
			.appendTo('body');

		if (c.cssClass) {
			$p.addClass(c.cssClass);
		}

		$p.find('.ui-popup-close').click(function () {
			_hide($c);
		});

		$c.appendTo($p).data('popup', c).addClass('ui-popup-content').css({ 'display': 'block' });

		if (c.url) {
			c.loaded = false;
			if (c.autoload) {
				_load($c);
			}
		} else {
			c.loaded = true;
		}
	}

	var api = {
		load: _load,
		show: _show,
		hide: _hide,
		update: _update,
		toggle: _toggle,
		callback: _callback
	};

	$.fn.popup = function (c) {
		var args = [].slice.call(arguments);
		this.each(function () {
			var $c = $(this);

			if (typeof (c) == 'string') {
				var p = $c.data('popup');
				if (!p) {
					__init($c);
				}
				args[0] = $c;
				api[c].apply($c, args);
				return;
			}

			__init($c, c);
		});
		return this;
	};

	$.popup = function () {
		var $c = $('.ui-popup:visible>.ui-popup-content');
		$c.popup.apply($c, arguments);
		return $c;
	};

	$.popup.defaults = {
		dataType: 'html',
		method: 'GET',
		position: 'auto',
		transition: 'slideDown',
		clickHide: true
	};

	// POPUP DATA-API
	// ==================
	$(window).on('load', function () {
		$('[data-spy="popup"]').popup();
		$('[popup-target]').click(function () {
			var $t = $(this), c = __options($t);
			$($t.attr('popup-target')).popup(c).popup('toggle', this);
		});
	});

})(jQuery);
