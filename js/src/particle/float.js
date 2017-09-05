define( [ 
	"model/gravityPoint",
	"effects"
], function( GravityPoint, FX ){

	/**
	 * Creates a new gravity point around which the Particle
	 * will float in orbit.
	 *
	 * Added Effects : lower opacity and change size.
	 */ 
	return function() {
		this.gPoint = new GravityPoint( this );
		this.isMoving = true;
		this.isFloating = true;
		this.eStack.push( FX.changeSize() );
		this.eStack.push( FX.changeOpacity() );
		return this;
	};
} );