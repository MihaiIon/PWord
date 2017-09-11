define([
	"model/particle",
	"helper"
], function( Particle, helper ){
	return function() {

		// Alias
		var _o = this.options.particle;console.log(this.options)

		// Particles
		helper.SET_CONST(Particle, "DEFAULT_SIZE", _o.size);

		helper.SET_CONST(Particle, "MIN_SPEED", _o.minSpeed);
		helper.SET_CONST(Particle, "MAX_SPEED", _o.maxSpeed);
		helper.SET_CONST(Particle, "SPEED_DELTA", Particle.MAX_SPEED-Particle.MIN_SPEED);

		helper.SET_CONST(Particle, "RETRACTION_GROWTH", _o.rGrowth);
		helper.SET_CONST(Particle, "RETRACTION_SPEED", _o.rSpeed);
		helper.SET_CONST(Particle, "SNAP_TO_ORIGIN_THRESHOLD", _o.snapOrigin);

		helper.SET_CONST(Particle, "MIN_GPOINT_RADIUS", _o.minRadius);
		helper.SET_CONST(Particle, "MAX_GPOINT_RADIUS", _o.maxRadius);
		helper.SET_CONST(Particle, "GPOINT_DELTA_RADIUS", Particle.MAX_GPOINT_RADIUS-Particle.MIN_GPOINT_RADIUS );

		helper.SET_CONST(Particle, "COLORS", {
			BLACK : { r: 0, g: 0, b: 0 }
		});

		// Scene
		var _min = 2*Particle.MAX_GPOINT_RADIUS,
			_maxX = this.dimens.width - 6*Particle.MAX_GPOINT_RADIUS,
			_maxY = this.dimens.height - 4*Particle.MAX_GPOINT_RADIUS;

		helper.SET_CONST(this.constructor, "SAFE_ZONE_X_AXIS", { min: _min, max: _maxX });
		helper.SET_CONST(this.constructor, "SAFE_ZONE_Y_AXIS", { min: _min, max: _maxY });
	};
} );