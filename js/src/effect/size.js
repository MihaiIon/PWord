(function(){

	/**
	 * Changes the size of a Particle that is floating.
	 *	
	 * @param particle 	: Affected particle.
	 * @param data 		: Transformation data.
	 * @param f 		: Function that called this transformation.
	 * @return			: True, if the effect is completed.
	 */
	var FX = {};
	FX.size_FUNC = function( particle, data ) {

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

	FX.changeSize = function( value, step ){	
		return {
			data: {
				step: step ? step : Math.random()*0.4 + 0.2,
				targetValue: value ? value : (Math.random()*PWord.fn.Particle.DEFAULT_SIZE + PWord.fn.Particle.DEFAULT_SIZE/2),
			},

			func: function( particle, fx ){
				if(!PWord.fn.FX.size_FUNC( particle, fx.data )) {
					particle.eStack.continue({ 
						data: fx.data, 
						func: fx.func 
					});
				}
			}
		}
	};

	PWord.prototype.FX = FX;

})();