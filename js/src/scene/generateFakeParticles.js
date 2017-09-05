define( [
	"model/particle"
], function( Particle ){
	return function() {
		for (var i = 0; i < Math.floor(Math.random()*10) + 8; i++) {
			this.particles.fake.push(new Particle(
				Scene.SAFE_ZONE_X_AXIS.max*Math.random() + Scene.SAFE_ZONE_X_AXIS.min,
				Scene.SAFE_ZONE_Y_AXIS.max*Math.random() + Scene.SAFE_ZONE_Y_AXIS.min,
				//this.word.color
				"000000"
			).float());
		}
	}
} );