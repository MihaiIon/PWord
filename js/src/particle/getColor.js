define( [ "helper/toHex" ], function( toHex ){
	
	// RGB -> HEX
	return function() {
		return toHex(this.color.r) + toHex(this.color.g) + toHex(this.color.b);
	};
} );