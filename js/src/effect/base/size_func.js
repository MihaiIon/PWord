define( function(){

	/**
	 * Changes the size of a Particle that is floating.
	 *	
	 * @param particle 	: Affected particle.
	 * @param data 		: Transformation data.
	 * @return		: True, if the effect is completed.
	 */
	return function( particle, data ) {

		// Distance to targetValue.
		var _delta = (particle.size - data.targetValue);

		// If the particle still validates the conditions,
		// continue the effect till it's done.
		if ((particle.isFloating || particle.isMoving) && Math.abs(_delta) > 2) 
		{
			particle.size += data.step * (_delta > 0 ? -1 : 1);
			return false;
		} 

		//
		else 
		{
			particle.size = data.targetValue;
			return true;
		}
	};
} );





