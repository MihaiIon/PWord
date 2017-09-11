define( [ 
	"helper",
	"./base/opacity_func" 
], function( helper, opacity_func ) {
	return function( args ) {
			
		return {

			// Basic information on the effect's goal.
			data: {
				step: args && args.step ? args.step : helper.rand( 0.04, 0.1 ),
				targetValue: args && ( args.value || args.value == 0 ) 
					? args.value 
					: helper.rand( 0.2, 0.9 )
			},

			// The core of the effect.
			func: function( particle, fx ) {
				if(!opacity_func( particle, fx.data )) {
					particle.eStack.continue({ 
						data: fx.data, 
						func: fx.func 
					});
				}

				// If the particle fades away
				if ( particle.opacity == 0 ) {
					particle.consumed = true;
				}
			}
		};
	};
} );
