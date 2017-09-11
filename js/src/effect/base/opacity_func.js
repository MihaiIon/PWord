define( function(){

	/*
	 * Changes the opacity of a Particle that is floating.
	 *
	 * @param particle 	: Affected particle.
	 * @param data 		: Transformation data.
	 * @return 		: True, if the effect is completed.
	 */
	return function( particle, data ) {	
		
		// Distance to targetValue.
		var _delta = (particle.opacity - data.targetValue);

		// If the particle still validates the conditions,
		// continue the effect till it's done.
		if ((particle.isFloating || particle.isMoving) && Math.abs(_delta) > 0.1) 
		{
			particle.opacity += data.step * (_delta > 0 ? -1 : 1);
			return false;	
		} 

		//
		else 
		{
			particle.opacity = data.targetValue;
			return true;
		}
	};
} );
