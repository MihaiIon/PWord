define( [ 
	'./helper',
	'./model/particle',
	'base/size_func' 
], function( helper, Particle, size_func ){

	/**
	 * Change size to the specified <value> and <step>. 
	 */
	return function( value, step ) {
		return {
			data: {
				step: step ? step : Math.random()*0.4 + 0.2,
				targetValue: value 
					? value 
					: (
						Math.random()*Particle.DEFAULT_SIZE 
						+ Particle.DEFAULT_SIZE/2
					)
			},

			func: function( particle, fx ){
				if(!size_func( particle, fx.data )) {
					particle.eStack.continue({ 
						data: fx.data, 
						func: fx.func 
					});
				}
			}
		};
	};
} );
