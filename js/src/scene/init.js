define( function() {
	return function() {

		// Setup
		this.append();

		// Animation function
		this.generateFakeParticles();
		this.animate();
		return this;
	}

} );