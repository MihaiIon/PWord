define( function(){
	return function( delta ) {

		// Alias 
		var Particle = this.constructor;

		if (this.isMoving && !this.fxLock) 
		{
			// Move in orbit around the gravity point.
			if (this.isFloating) 
			{
				this.current.x = this.gPoint.origin.x + this.gPoint.radius * Math.cos(Math.PI - this.gPoint.angle);
				this.current.y = this.gPoint.origin.y + this.gPoint.radius * Math.sin(Math.PI - this.gPoint.angle);
				this.gPoint.angle += this.speed * this.gPoint.direction * delta;
			} 

			else 
			{
				// Snap particle to X origin if close enough.
				if (this.current.x < this.origin.x + Particle.SNAP_TO_ORIGIN_THRESHOLD && 
					this.current.x > this.origin.x - Particle.SNAP_TO_ORIGIN_THRESHOLD)
					this.current.x = this.origin.x;

				/*
				 * Move particle on X axis.
				 * <_delta> : Distance from <current.x> to <origin.x>.
				 * <RETRACTION_SPEED> : Speed at which the particle goes back to <origin>.
				 * <delta> : Rate at which the canvas is rendered [0..1].
				 * <math function> 	: Basically, the function accelerates the <RETRACTION_SPEED> when
				 *					  the particle is far and slows it when it is close to the <origin>.
				 */
				else if (this.current.x != this.origin.x){
					var _delta = this.current.x - this.origin.x;
					this.current.x += Particle.RETRACTION_SPEED 
						* (1 + Particle.RETRACTION_GROWTH*Math.log10(Math.abs(_delta) / Math.pow(Particle.RETRACTION_SPEED, 2)))
						* (_delta > 0 ? -1 : (_delta < 0 ? 1 : 0))
						* delta;
				}

				// Snap particle to Y origin if close enough.
				if (this.current.y < this.origin.y + Particle.SNAP_TO_ORIGIN_THRESHOLD && 
					this.current.y > this.origin.y - Particle.SNAP_TO_ORIGIN_THRESHOLD)
					this.current.y = this.origin.y;

				// Same as above, but for the Y axix
				else if (this.current.y != this.origin.y) {
					var _delta = this.current.y - this.origin.y;
					this.current.y += Particle.RETRACTION_SPEED 
						* (1 + Particle.RETRACTION_GROWTH*Math.log10(Math.abs(_delta) / Math.pow(Particle.RETRACTION_SPEED, 2)))
						* (_delta > 0 ? -1 : (_delta < 0 ? 1 : 0))
						* delta;
				}

				// Stop Moving
				if (this.current.equals(this.origin))
					this.isMoving = false;
			}
		}
		return this;
	};
} );
