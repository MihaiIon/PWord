define( [ 
	"helper",
	"./base/color_func" 
],  function( helper, size_func ){

	/*
	 * Changes the color of a Particle.
	 */
	return function( args ) {
		return {
			data: {
				step: args && args.step ? args.step : helper.rand(2, 10, true),
				targetValue: args && args.value 
					? args.value 
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
