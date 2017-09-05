define( function() {

	return function( opts ) {

		// 
		this.generateFakeParticles();

		// Finalize the job.
		this.setConstants( opts.particle ? opts.particle : {} );
		this.append();

		// Animation function
		this.animate();

		return this;
	}

} );