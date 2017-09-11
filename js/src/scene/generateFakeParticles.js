define( [
	"model/particle",
	"helper"
], function( Particle, helper ){
	return function() {

		// Alias
		var Scene = this.constructor,
		    Particle = Scene.Particle;

		for (var i = 0; i < helper.rand(8, 20); i++) {
			this.particles.fake.push(new Particle(
				helper.rand( Scene.SAFE_ZONE_X_AXIS.min, Scene.SAFE_ZONE_X_AXIS.max ),
				helper.rand( Scene.SAFE_ZONE_Y_AXIS.min, Scene.SAFE_ZONE_Y_AXIS.max ),
				//this.word.color
				"000000"
			).float());
		}
	};
} );