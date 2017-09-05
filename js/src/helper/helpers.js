/**
 * Sets a constant for a prototype. ES5+.
 */
var SET_CONST = function( proto, prop, val ){
	Object.defineProperty( proto, prop, { value : val });
}


var toHex = function (n) {
	n = parseInt(n,10);
	if (isNaN(n)) return "00";
	n = Math.max(0,Math.min(n,255));
	return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
}