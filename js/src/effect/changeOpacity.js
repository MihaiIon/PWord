define( [ 
	"helper",
	"./base/opacity_func" 
], function( helper, opacity_func ) {
	return function( value, step ) {
		return {

			// Basic information on the effect's goal.
			data: {
				step: step ? step : helper.rand( 0.04, 0.1 ),
				targetValue: value ? value : helper.rand( 0.2, 0.9 )
			},

			// The core of the effect.
			func: function( particle, fx ) {
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