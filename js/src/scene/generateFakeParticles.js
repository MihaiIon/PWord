define( [
	"model/particle",
	"effects",
	"helper"
], function( Particle, FX, helper ){
	return function() {

		// Alias
		var Scene = this.constructor,
		    Particle = Scene.Particle,
		    _size = Particle.DEFAULT_SIZE;

		for (var i = 0; i < helper.rand(8, 20); i++) {
			this.particles.fake.push(
				new Particle(
					helper.rand( Scene.SAFE_ZONE_X_AXIS.min, Scene.SAFE_ZONE_X_AXIS.max ),
					helper.rand( Scene.SAFE_ZONE_Y_AXIS.min, Scene.SAFE_ZONE_Y_AXIS.max ))
						.addEffect( FX.fadeIn({ step: 0.01 }) )
						.addEffect( FX.changeSize({ value: helper.rand( _size/2, _size+_size/2 ) }) )
						.float());
		}
	};
} );