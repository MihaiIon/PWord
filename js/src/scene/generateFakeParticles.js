define( [
	"model/particle",
	"helper"
], function( Particle, helper ){
	return function() {
		for (var i = 0; i < helper.rand(8, 20); i++) {
			this.particles.fake.push(new Particle(
				helper.rand( this.constructor.SAFE_ZONE_X_AXIS.min, this.constructor.SAFE_ZONE_X_AXIS.max ),
				helper.rand( this.constructor.SAFE_ZONE_Y_AXIS.min, this.constructor.SAFE_ZONE_Y_AXIS.max ),
				//this.word.color
				"000000"
			).float());
		}
	};
} );