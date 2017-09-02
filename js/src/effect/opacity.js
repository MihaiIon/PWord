/*
 * Changes the opacity of a Particle that is floating.
 *
 * @param particle 	: Affected particle.
 * @param data 		: Transformation data.
 * @param f 		: Function that called this transformation.
 */
PWord.prototype.FX.opacity_FUNC = function( particle, data ) {

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

PWord.prototype.FX.changeOpacity = function( value, step ){	
	return {

		// Basic information on the effect's goal.
		data: {
			step: step ? step : Math.random()*0.06 + 0.04,
			targetValue: value ? value : Math.random()*0.7 + 0.2
		},

		// The core of the effect.
		func: function( particle, fx ){
			if(!PWord.fn.FX.opacity_FUNC( particle, fx.data )) {
				particle.eStack.continue({ 
					data: fx.data, 
					func: fx.func 
				});
			}
		}
	}
};