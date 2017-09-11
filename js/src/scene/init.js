define( function() {
	return function() {

		// Setup
		this.setConstants();
		this.append();

		// Animation function
		this.generateFakeParticles();
		this.animate();
		return this;
	}

} );