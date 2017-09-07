define( [ 'base/opacity_func' ], function( opacity_func ) {
	return function( value, step ) {
		return {

			// Basic information on the effect's goal.
			data: {
				step: step ? step : Math.random()*0.06 + 0.04,
				targetValue: value ? value : Math.random()*0.7 + 0.2
			},

			// The core of the effect.
			func: function( particle, fx ){
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


PWord.prototype.FX.changeOpacity = function( value, step ){	

};
