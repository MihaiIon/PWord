define( [
	'effect/changeSize',
	'effect/changeOpacity',
	'effect/changeColor',
	'effect/bump'
], function( size, opacity, color, bump ){
	return {
		changeSize: size,
		changeOpacity: opacity,
		changeColor: color,
		bump: bump
	};
} );
