define( [ 
	"helper",
	"./base/opacity_func" 
], function( helper, opacity_func ) {
	return function( args ) {
		return {

			// Basic information on the effect's goal.
			data: {
				step: args && args.step ? args.step : helper.rand( 0.001, 0.005 ),
				targetValue: args && args.value ? args.value : helper.rand( 0.2, 0.9 ),
				isZero: false
			},

			// The core of the effect.
			func: function( particle, fx ) {

				// Set opacity to zero.
				if (!fx.data.isZero) 
				{
					particle.opacity = -fx.data.step;
					fx.data.isZero = true;
				}

				// Start fade in.
				if(!opacity_func( particle, fx.data )) {
					particle.eStack.continue({ 
						data: fx.data, 
						func: fx.func 
					});
				}
			}
		};
	};
} );
