define( function(){

	/**
	 * Changes the size of a Particle that is floating.
	 *	
	 * @param particle 	: Affected particle.
	 * @param data 		: Transformation data.
	 * @return 		: True, if the effect is completed.
	 */
	return function( particle, data ) {
			
		var _c = particle.color,
		    _t = data.targetValue;

		if (_c.r != _t.r || _c.g != _t.g || _c.b != _t.b) 
		{
			// 
			var helper = function( delta, value, step, targetValue ) {
				if (Math.abs(delta) < 10) return targetValue;
				else return value + data.step * (delta > 0 ? -1 : 1);
			}

			_c.r = helper( _c.r - _t.r, _c.r, data.step, _t.r );
			_c.g = helper( _c.g - _t.g, _c.g, data.step, _t.g );
			_c.b = helper( _c.b - _t.b, _c.b, data.step, _t.b );
			return false;
		};
	};
} );
