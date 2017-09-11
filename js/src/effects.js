define( [
	"effect/changeSize",
	"effect/changeOpacity",
	"effect/changeColor",
	"effect/bump",
	"effect/fadeIn"
], function( size, opacity, color, bump, fadeIn ){
	return {
		changeSize: size,
		changeOpacity: opacity,
		changeColor: color,
		bump: bump,
		fadeIn: fadeIn
	};
} );
