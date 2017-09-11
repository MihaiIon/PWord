define( function() {
	return function() {
		this.append();
		this.generateFakeParticles();
		this.animate();
		return this;
	}
} );