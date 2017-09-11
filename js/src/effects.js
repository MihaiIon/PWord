define( [
	"effect/changeSize",
	"effect/changeOpacity",
	"effect/changeColor",
	"effect/bump",
	"effect/fadeIn",
	"effect/fadeOut"
], function( size, opacity, color, bump, fadeIn, fadeOut ) {
	return {
		changeSize: size,
		changeOpacity: opacity,
		changeColor: color,
		bump: bump,
		fadeIn: fadeIn,
		fadeOut: fadeOut
	};
} );
