define( [ 
	"helper",
	"./base/size_func" 
], function( helper, size_func ){

	/**
	 * Change size to the specified <value> and <step>. 
	 */
	return function( value, step ) {
		return {
			data: {
				step: step ? step : helper.rand( 0.2, 0.6 ),
				targetValue: value ? value : helper.rand( 10, 20 )
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
