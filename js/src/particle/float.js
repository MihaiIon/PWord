define( [ 
	"model/gravityPoint",
	"effects",
	"helper"
], function( GravityPoint, FX, helper ){

	/**
	 * Creates a new gravity point around which the Particle
	 * will float in orbit.
	 */ 
	return function() {
		this.gPoint = new GravityPoint( this );
		this.isMoving = true;
		this.isFloating = true;
		return this;
	};
} );