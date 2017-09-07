define( function(){
	return function() {
		
	};
} );define( [ 
	"model/particle",
	"effects" 
], function( Particle, FX ) {
	
	/*
	 * The size of the particle grows and go back to normal.
	 */
	return function( value, step ){	
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

			func: function( particle, effect ){

				var _data = effect.data;

				// Save the current size of the particle.
				if (!_data.saved.size) _data.saved.size = particle.size;

				//
				if(FX.size_FUNC( particle, _data.size )) 
				{
					if (_data.isGrowing) 
					{
						_data.isGrowing = false;
						_data.size.targetValue = _data.saved.size;
					}
					
					else _data.done = true;
				}

				// 
				if( !_data.done ) {
					particle.eStack.continue({ 
						data: _data, 
						func: effect.func 
					});
				}
			}
		}
	};

} );