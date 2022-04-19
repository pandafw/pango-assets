if (typeof String.prototype.hashCode != "function") {
	String.prototype.hashCode = function() {
		var h = 0;
		for (var i = 0; i < this.length; i++) {
//			h = 31 * h + this.charCodeAt(i);
			h = ((h << 5) - h) + this.charCodeAt(i); // faster
			h |= 0; // Convert to 32bit integer
		}
		return h;
	};
}
if (typeof String.prototype.isEmpty != "function") {
	String.prototype.isEmpty = function(s) {
		return this.length < 1;
	};
}
if (typeof String.prototype.contains != "function") {
	String.prototype.contains = function(s) {
		return this.indexOf(s) >= 0;
	};
}
if (typeof String.prototype.trimLeft != "function") {
	var re = /^\s+/;
	String.prototype.trimLeft = function() {
		return this.replace(re, "");
	};
}
if (typeof String.prototype.trimRight != "function") {
	var re = /\s+$/;
	String.prototype.trimRight = function() {
		return this.replace(re, "");
	};
}
if (typeof String.prototype.trim != "function") {
	var re = /^\s+|\s+$/g;
	String.prototype.trim = function() {
		return this.replace(re, "");
	};
}
if (typeof String.prototype.stripLeft != "function") {
	var re = /^[\s\u3000]+/;
	String.prototype.stripLeft = function() {
		return this.replace(re, "");
	};
}
if (typeof String.prototype.stripRight != "function") {
	var re = /[\s\u3000]+$/;
	String.prototype.stripRight = function() {
		return this.replace(re, "");
	};
}
if (typeof String.prototype.strip != "function") {
	var re = /^[\s\u3000]+|[\s\u3000]+$/g;
	String.prototype.strip = function() {
		return this.replace(re, "");
	};
}
if (typeof String.prototype.left != "function") {
	String.prototype.left = function(len) {
		return this.substring(0, len);
	};
}
if (typeof String.prototype.mid != "function") {
	String.prototype.mid = String.prototype.substr;
}
if (typeof String.prototype.right != "function") {
	String.prototype.right = function(len) {
		if (len >= this.length) {
			return this;
		}
		return this.substr(this.length - len, len);
	};
}
if (typeof String.prototype.leftPad != "function") {
	String.prototype.leftPad = function(sz, ch) {
		ch = ch || ' ';
		var r = this;
		while (r.length < sz) {
			r = ch + r;
		}
		return r;
	};
}
if (typeof String.prototype.rightPad != "function") {
	String.prototype.rightPad = function(sz, ch) {
		ch = ch || ' ';
		var r = this;
		while (r.length < sz) {
			r += chr;
		}
		return r;
	};
}
if (typeof String.prototype.startsWith != "function") {
	String.prototype.startsWith = function(prefix, toffset) {
		return this.indexOf(prefix) == (toffset || 0);
	};
}
if (typeof String.prototype.endsWith != "function") {
	String.prototype.endsWith = function(suffix) {
		return this.startsWith(suffix, this.length - suffix.length);
	};
}
if (typeof String.prototype.capitalize != "function") {
	String.prototype.capitalize = function() {
		return this.substr(0, 1).toUpperCase() + this.substr(1);
	};
}
if (typeof String.prototype.uncapitalize != "function") {
	String.prototype.uncapitalize = function() {
		return this.substr(0, 1).toLowerCase() + this.substr(1);
	};
}
if (typeof String.prototype.format != "function") {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/\{(\d+)\}/g, function(m, i) {
			return args[i];
		});
	};
}
if (typeof String.prototype.substrAfter != 'function') {
	String.prototype.substrAfter = function(c) {
		var s = this, i = s.indexOf(c);
		return (i >= 0) ? s.substring(i + 1) : "";
	};
}
if (typeof String.prototype.substrBefore != 'function') {
	String.prototype.substrBefore = function(c) {
		var s = this, i = s.indexOf(c);
		return (i >= 0) ? s.substring(0, i) : s;
	};
}
if (typeof String.prototype.ellipsis != 'function') {
	String.prototype.ellipsis = function(len) {
		if (this.length > len) {
			return this.substr(0, len - 3) + "...";
		}
		return this;
	};
}
/**
 * Truncate a string and add an ellipsiz ('...') to the end if it exceeds the specified length
 * the length of charCodeAt(i) > 0xFF will be treated as 2. 
 * @param {String} value The string to truncate
 * @param {Number} length The maximum length to allow before truncating
 * @return {String} The converted text
 */
if (typeof String.prototype.ellipsiz != 'function') {
	String.prototype.ellipsiz = function(len) {
		var sz = 0;
		for (var i = 0; i < this.length; i++) {
			sz++;
			if (this.charCodeAt(i) > 0xFF) {
				sz++;
			}
			if (sz > len) {
				return this.substring(0, i) + '...';
			}
		}
		return this;
	}
}

if (typeof String.prototype.escapeRegExp != "function") {
	String.prototype.escapeRegExp = function() {
		return this.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	};
}
if (typeof String.prototype.escapeHTML != "function") {
	var ehm = {
		'&': '&amp;',
		"'": '&apos;',
		'`': '&#x60;',
		'"': '&quot;',
		'<': '&lt;',
		'>': '&gt;'
	};

	String.prototype.escapeHTML = function() {
		return this.replace(/[&'`"<>]/g, function(c) {
			return ehm[c];
		});
	};
}
if (typeof String.prototype.unescapeHTML != "function") {
	// a simple version, complete version: https://stackoverflow.com/questions/994331/how-to-unescape-html-character-entities-in-java
	var uhm = {
		'&lt;'   : '<',
		'&gt;'   : '>',
		'&amp;'  : '&',
		'&quot;' : '"',
		'&apos;' : "'",
		'&#x27;' : "'",
		'&#x60;' : '`'
	};

	String.prototype.unescapeHTML = function() {
		return this.replace(/&(lt|gt|amp|quot|apos|#x27|#x60);/g, function(t) {
			return uhm[t];
		});
	};
}
if (typeof String.prototype.prettifyXML != "function") {
	String.prototype.prettifyXML = function() {
		var xml = '';
		var pad = 0;
		var ss = this.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3').split('\r\n');
		for (var i = 0; i < ss.length; i++) {
			var s = ss[i];
			var indent = 0;
			if (s.match( /.+<\/\w[^>]*>$/ )) {
			}
			else if (s.match( /^<\/\w/ )) {
				if (pad > 0) {
					pad -= 1;
				}
			}
			else if (s.match( /^<\w[^>]*[^\/]*>.*$/ )) {
				indent = 1;
			}
	
			xml += ('').leftPad(pad * 2) + s + '\r\n';
			pad += indent;
		}
	
		return xml;
	};
}
if (typeof String.prototype.encodeUTF8 != "function") {
	String.prototype.encodeUTF8 = function() {
		string = this.replace(/rn/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}

		return utftext;
	};
}
if (typeof String.prototype.decodeUTF8 != "function") {
	String.prototype.decodeUTF8 = function() {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < this.length ) {
			c = this.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = this.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = this.charCodeAt(i+1);
				c3 = this.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}

		return string;
	};
}
if (typeof String.prototype.encodeBase64 != "function") {
	String.prototype.encodeBase64 = function() {
		if (typeof btoa === 'function') {
			 return btoa(this);
		}
		var base64s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var bits;
		var dual;
		var i = 0;
		var encOut = "";
		while(this.length >= i + 3){
			bits = (this.charCodeAt(i++) & 0xff) <<16 | (this.charCodeAt(i++) & 0xff) <<8 | this.charCodeAt(i++) & 0xff;
			encOut += base64s.charAt((bits & 0x00fc0000) >>18) + base64s.charAt((bits & 0x0003f000) >>12) + base64s.charAt((bits & 0x00000fc0) >> 6) + base64s.charAt((bits & 0x0000003f));
		}
		if(this.length -i > 0 && this.length -i < 3){
			dual = Boolean(this.length -i -1);
			bits = ((this.charCodeAt(i++) & 0xff) <<16) |	 (dual ? (this.charCodeAt(i) & 0xff) <<8 : 0);
			encOut += base64s.charAt((bits & 0x00fc0000) >>18) + base64s.charAt((bits & 0x0003f000) >>12) + (dual ? base64s.charAt((bits & 0x00000fc0) >>6) : '=') + '=';
		}
		return(encOut);
	};
}

if (typeof String.prototype.decodeBase64 != "function") {
	String.prototype.decodeBase64 = function() {
		if (typeof atob === 'function') {
			return atob(this);
		}
		var base64s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var bits, decOut = "";
		for (var i = 0; i < this.length; i += 4) {
			bits = (base64s.indexOf(this.charAt(i)) & 0xff) <<18 | (base64s.indexOf(this.charAt(i +1)) & 0xff) <<12 | (base64s.indexOf(this.charAt(i +2)) & 0xff) << 6 | base64s.indexOf(this.charAt(i +3)) & 0xff;
			decOut += String.fromCharCode((bits & 0xff0000) >>16, (bits & 0xff00) >>8, bits & 0xff);
		}
		if (this.charCodeAt(i -2) == 61) {
			return(decOut.substring(0, decOut.length -2));
		}
		else if (this.charCodeAt(i -1) == 61) {
			return(decOut.substring(0, decOut.length -1));
		}
		else {
			return(decOut);
		}
	};
}

//-----------------------------------
//  Static functions
//-----------------------------------
if (typeof String.defaults != "function") {
	String.defaults = function(s, d) {
		return s == null ? d : s;
	};
}
if (typeof String.hashCode != "function") {
	String.hashCode = function(s) {
		return s == null ? 0 : s.hashCode();
	};
}
if (typeof String.isEmpty != "function") {
	String.isEmpty = function(s) {
		return s == null || s.length < 1;
	};
}
if (typeof String.isNotEmpty != "function") {
	String.isNotEmpty = function(s) {
		return s != null && s.length > 0;
	};
}
if (typeof String.leftPad != "function") {
	String.leftPad = function(s, sz, ch) {
		return s != null ? String(s).leftPad(sz, ch) : "".leftPad(sz, ch);
	};
}
if (typeof String.rightPad != "function") {
	String.rightPad = function(s, sz, ch) {
		return s != null ? String(s).rightPad(sz, ch) : "".rightPad(sz, ch);
	};
}
if (typeof String.startsWith != "function") {
	String.startsWith = function(s, w) {
		return s != null ? String(s).startsWith(w) : false;
	};
}
if (typeof String.endsWith != "function") {
	String.endsWith = function(s, w) {
		return s != null ? String(s).endsWith(w) : false;
	};
}
if (typeof String.substrAfter != "function") {
	String.substrAfter = function(s, c) {
		return s != null ? String(s).substrAfter(c) : "";
	};
}
if (typeof String.substrBefore != "function") {
	String.substrBefore = function(s, c) {
		return s != null ? String(s).substrBefore(c) : "";
	};
}
if (typeof String.ellipsis != "function") {
	String.ellipsis = function(s, l) {
		return s != null ? String(s).ellipsis(l) : "";
	};
}
if (typeof String.ellipsiz != "function") {
	String.ellipsiz = function(s, l) {
		return s != null ? String(s).ellipsiz(l) : "";
	};
}
if (typeof String.escapeHTML != "function") {
	String.escapeHTML = function(s) {
		return s != null ? String(s).escapeHTML() : "";
	};
}
if (typeof String.unescapeHTML != "function") {
	String.unescapeHTML = function(s) {
		return s != null ? String(s).unescapeHTML() : "";
	};
}
if (typeof String.escapePHTML != "function") {
	String.escapePHTML = function(s) {
		return s != null ? String(s).escapePHTML() : "";
	};
}
if (typeof String.unescapePHTML != "function") {
	String.unescapePHTML = function(s) {
		return s != null ? String(s).unescapePHTML() : "";
	};
}
if (typeof String.prettifyXML != "function") {
	String.prettifyXML = function(s) {
		return s != null ? String(s).prettifyXML() : "";
	};
}
if (typeof String.encodeUTF8 != 'function') {
	String.encodeUTF8 = function(s) {
		return s != null ? String(s).encodeUTF8() : "";
	};
}
if (typeof String.decodeUTF8 != 'function') {
	String.decodeUTF8 = function(s) {
		return s != null ? String(s).decodeUTF8() : "";
	};
}
if (typeof String.encodeBase64 != 'function') {
	String.encodeBase64 = function(s) {
		return s != null ? String(s).encodeBase64() : "";
	};
}
if (typeof String.decodeBase64 != 'function') {
	String.decodeBase64 = function(s) {
		return s != null ? String(s).decodeBase64() : "";
	};
}
if (typeof String.escapeRegExp != 'function') {
	String.escapeRegExp = function(s) {
		return s != null ? String(s).escapeRegExp() : "";
	};
}
if (typeof String.formatSize != "function") {
	var KB = 1024,
		MB = KB * KB,
		GB = MB * KB,
		TB = GB * KB,
		PB = TB * KB;
	
	String.formatSize = function(n, p) {
		p = Math.pow(10, p || 2);
		var sz = "";
		if (n >= PB) {
			sz = Math.round(n * p / PB) / p + ' PB';
		}
		else if (n >= TB) {
			sz = Math.round(n * p / TB) / p + ' TB';
		}
		else if (n >= GB) {
			sz = Math.round(n * p / GB) / p + ' GB';
		}
		else if (n >= MB) {
			sz = Math.round(n * p / MB) / p + ' MB';
		}
		else if (n >= KB) {
			sz = Math.round(n * p / KB) / p + ' KB';
		}
		else if (n != '') {
			sz = n + ' bytes';
		}
		return sz;
	};
}
