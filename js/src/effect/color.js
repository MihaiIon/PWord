/**
 * Changes the size of a Particle that is floating.
 *	
 * @param particle 	: Affected particle.
 * @param data 		: Transformation data.
 */
PWord.prototype.FX.color_FUNC = function( particle, data ) {

	var _c = particle.color;		 
	if (_c.r != data.targetValue.r || _c.g != data.targetValue.g || _c.b != data.targetValue.b) 
	{
		// 
		var helper = function( delta, value, step, targetValue ) {
			if (Math.abs(delta) < 10) return targetValue;
			else return value + data.step * (delta > 0 ? -1 : 1);
		}

		_c.r = helper( _c.r - data.targetValue.r, _c.r, data.step, data.targetValue.r );
		_c.g = helper( _c.g - data.targetValue.g, _c.g, data.step, data.targetValue.g );
		_c.b = helper( _c.b - data.targetValue.b, _c.b, data.step, data.targetValue.b );
		return false;

	} else return true;
};

/*
 * Changes the color of a Particle.
 */
PWord.prototype.FX.changeColor =  function( value, step ){	
	return {
		data: {
			step: step ? step : Math.floor(Math.random()*8) + 2,
			targetValue: value 
				? value 
				: {
					r: Math.floor(Math.random()*255),
					g: Math.floor(Math.random()*255),
					b: Math.floor(Math.random()*255)
				  }
		},

		func: function( particle, fx ){
			if(!PWord.fn.FX.color_FUNC( particle, fx.data )) {
				particle.eStack.continue({ 
					data: fx.data, 
					func: fx.func 
				});
			}
		}
	}
};