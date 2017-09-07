define( [
	'helper/toHex',
	'helper/random',
	'helper/setConst'
], function( toHex, rand, SET_CONST ){
	return {
		toHex: toHex,
		rand: rand,
		SET_CONST: SET_CONST
	};
} );
