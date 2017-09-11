define( [ 
	"helper",
	"./base/size_func" 
], function( helper, size_func ){

	/**
	 * Change size to the specified <value> and <step>. 
	 */
	return function( args ) {
		return {
			data: {
				step: args && args.step ? args.step : helper.rand( 0.2, 0.6 ),
				targetValue: args && args.value ? args.value : helper.rand( 10, 20 )
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
