/*
 * The size of the particle grows and go back to normal.
 */
PWord.prototype.FX.bump = function( value, step ){	
	return {

		data: {
			size: {
				step: step ? step : 0.8,
				targetValue: value ? value : Particle.DEFAULT_SIZE*1.8
			},
			saved: {
				size: null
			},
			isGrowing: true,
			done: false
		},

		func: function( particle, fx ){

			// Save the current size of the particle.
			if (!fx.data.saved.size) fx.data.saved.size = particle.size;

			//
			if(PWord.fn.FX.size_FUNC( particle, fx.data.size )) 
			{
				if (fx.data.isGrowing) 
				{
					fx.data.isGrowing = false;
					fx.data.size.targetValue = fx.data.saved.size;
				}
				
				else fx.data.done = true;
			}

			// 
			if( !fx.data.done ) {
				particle.eStack.continue({ 
					data: fx.data, 
					func: fx.func 
				});
			}
		}
	}
};