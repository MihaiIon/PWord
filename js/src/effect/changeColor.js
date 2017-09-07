define( [ 
	'./helper',
	'base/color_func' 
],  function( helper, size_func ){

	/*
	 * Changes the color of a Particle.
	 */
	return function( value, step ) {
		return {
			data: {
				step: step ? step : helper.rand(8) + 2,
				targetValue: value 
					? value 
					: {
						r: helper.rand(255),
						g: helper.rand(255),
						b: helper.rand(255)
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
