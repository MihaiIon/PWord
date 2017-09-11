define( [ "helper" ], function( helper ){
	
	// RGB -> HEX
	return function() {
		return helper.toHex(this.color.r) + helper.toHex(this.color.g) + helper.toHex(this.color.b);
	};
} );