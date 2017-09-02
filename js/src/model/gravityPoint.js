/**
 * Each <GravityPoint> is associated with a particle (square). 
 * Basically the <particle> moves in orbit around the <GravityPoint>. 
 */
PWord.fn.GravityPoint = function( particle ) {

	// Random radius.
	this.radius = PWord.fn.Particle.MIN_GPOINT_RADIUS 
				+ Math.random()*PWord.fn.Particle.GPOINT_DELTA_RADIUS;

	// Spinning direction.
	this.direction = Math.random() > 0.5 ? 1 : -1;
	
	// Pick a random angle (in rads) to generate the <GravityPoint>'s center. 
	this.angle = Math.random() * 2 * Math.PI;
	
	// The center is calculated from the <particle>'s origin position.
	// That way, the <particle> can immediately orbit around the <GravityPoint>'s center
	// when it starts floating.
	this.origin = new PIXI.Point (
		particle.origin.x + this.radius * Math.cos(2*Math.PI - this.angle),
		particle.origin.y + this.radius * Math.sin(2*Math.PI - this.angle)
	);
};