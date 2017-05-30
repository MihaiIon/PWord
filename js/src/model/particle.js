/*
 *
 */
PWord.fn.Particle = function(
	x, y, 
	dimen,
	color,
	minSpeed, maxSpeed,
	minFloatDist, maxFloatDist, 
	minRadiusDist, maxRadiusDist) {

	// Default position, dimensions, colors. 
	this.x = x;
	this.y = y;
	this.dimen = dimen;
	this.color = color;
	this.speed = minSpeed + (Math.random()*(maxSpeed-minSpeed));
	this.isFloating = false;
	this.isMo = false;

	// 
	this.gPoint = new PWord.fn.GravityPoint(
		minFloatingDist, maxFloatingDist,
		minRadiusDist, maxRadiusDist
	);
};
