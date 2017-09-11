define( [ 
	"model/gravityPoint",
	"effects",
	"helper"
], function( GravityPoint, FX, helper ){

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
		var _size = this.constructor.DEFAULT_SIZE;
		this.eStack.push( FX.changeSize( helper.rand( _size/2, _size+_size/2 ) ) );
		this.eStack.push( FX.changeOpacity() );
		return this;
	};
} );