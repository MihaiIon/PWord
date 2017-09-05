define( [ "effects" ], function( FX ){

	/**
	 * Creates a new gravity point around which the Particle
	 * will float in orbit.
	 *
	 * Added Effects : restore opacity and restore size.
	 */ 
	return function() {
		this.isFloating = false;
		this.eStack.push(FX.changeSize(Particle.DEFAULT_SIZE, 2));
		this.eStack.push(FX.changeOpacity(1, 0.4));
		return this;
	};
} );