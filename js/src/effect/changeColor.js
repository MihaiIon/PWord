define( [ 
	"helper",
	"./base/color_func" 
],  function( helper, size_func ){

	/*
	 * Changes the color of a Particle.
	 */
	return function( value, step ) {
		return {
			data: {
				step: step ? step : helper.rand(2, 10, true),
				targetValue: value 
					? value 
					: {
						r: helper.rand(0, 255, true),
						g: helper.rand(0, 255, true),
						b: helper.rand(0, 255, true)
				  	}
			},

			func: function( particle, fx ){
				if(!color_func( particle, fx.data )) {
					particle.eStack.continue({ 
						data: fx.data, 
						func: fx.func 
					});
				}
			}
		};
	};
} );
