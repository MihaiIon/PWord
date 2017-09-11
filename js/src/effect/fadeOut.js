define( [ "./changeOpacity" ], function( changeOpacity ) {
	return function( step ) {
		return changeOpacity({ value: 0, step: step ? step : 0.01 });
	};
} );
