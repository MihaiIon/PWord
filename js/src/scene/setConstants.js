define([
	"model/particle"
], function( Particle ){
	return function( opts ) {
		// Particles
		SET_CONST(Particle, "DEFAULT_SIZE", opts.size ? opts.size : 20 );

		SET_CONST(Particle, "MIN_SPEED", opts.minSpeed ? opts.minSpeed : 0.015);
		SET_CONST(Particle, "MAX_SPEED", opts.maxSpeed ? opts.maxSpeed : 0.025);
		SET_CONST(Particle, "SPEED_DELTA", Particle.MAX_SPEED-PWord.MIN_SPEED);

		SET_CONST(Particle, "RETRACTION_GROWTH", opts.rGrowth ? opts.rGrowth : 0.5 );
		SET_CONST(Particle, "RETRACTION_SPEED", opts.rSpeed ? opts.rSpeed : 10 );
		SET_CONST(Particle, "SNAP_TO_ORIGIN_THRESHOLD", opts && opts.snapOrigin ? opts.snapOrigin : 2);

		SET_CONST(Particle, "MIN_GPOINT_RADIUS", opts.minRadius ? opts.minRadius : 40 );
		SET_CONST(Particle, "MAX_GPOINT_RADIUS", opts.maxRadius ? opts.maxRadius : 100 );
		SET_CONST(Particle, "GPOINT_DELTA_RADIUS", Particle.MAX_GPOINT_RADIUS-Particle.MIN_GPOINT_RADIUS );

		SET_CONST(Particle, "COLORS", {
			BLACK : { r: 0, g: 0, b: 0 }
		});

		// Scene
		var _min = 2*Particle.MAX_GPOINT_RADIUS,
			_maxX = this.dimens.width - 6*Particle.MAX_GPOINT_RADIUS,
			_maxY = this.dimens.height - 4*Particle.MAX_GPOINT_RADIUS;

		SET_CONST(Scene, "SAFE_ZONE_X_AXIS", { min: _min, max: _maxX });
		SET_CONST(Scene, "SAFE_ZONE_Y_AXIS", { min: _min, max: _maxY });
	};
} );