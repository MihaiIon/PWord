(function(){

	/**
	 * 
	 */
	var Particle = function( x, y, color, size, opacity ) {
		this.origin = new PIXI.Point(x, y);
		this.current = new PIXI.Point(x, y);
		this.size = size ? size : PWord.fn.Particle.DEFAULT_SIZE;
		this.color = color ? color : PWord.fn.Particle.COLORS.BLACK;
		this.opacity = opacity ? opacity : 1;
		this.speed = PWord.fn.Particle.MIN_SPEED 
			+ Math.random()*PWord.fn.Particle.SPEED_DELTA;
		
		// Gravity Point
		this.gPoint = null;

		// Controllers.
		this.isFloating = false;
		this.isMoving = false;

		// Contains the current effects applied to this <Particle>.
		this.eStack = new PWord.fn.EffectStack();
	};

	// Create alias
	Particle.fn = Particle.prototype;


	//--------------------------------------------------------------------------------


	/**
	 * Adds an effect to the Effect Stack : <eStack>.
	 */
	Particle.fn.addEffect = function( fx ){
		this.eStack.push( fx );
		return this;
	};


	/**
	 * Applies each effect and updates the Effect Stack by queuing
	 * the effects that weren't complete.
	 */
	Particle.fn.consumeEffects = function() {
		var fx;
		while (this.eStack.length() > 0) {
			fx = this.eStack.pop();
			fx.func( this, fx );
		} 
		this.eStack.update();
		return this;
	};


	//--------------------------------------------------------------------------------


	/**
	 * RGB -> HEX
	 */
	Particle.fn.getColor = function() {
		return toHex(this.color.r)+toHex(this.color.g)+toHex(this.color.b);
	};


	/**
	 * Creates a new gravity point around which the Particle
	 * will float in orbit.
	 *
	 * Added Effects : lower opacity and change size.
	 */ 
	Particle.fn.float = function() {
		this.gPoint = new PWord.fn.GravityPoint( this );
		this.isMoving = true;
		this.isFloating = true;
		this.eStack.push(PWord.fn.FX.changeSize());
		this.eStack.push(PWord.fn.FX.changeOpacity());
		return this;
	};


	/**
	 * Creates a new gravity point around which the Particle
	 * will float in orbit.
	 *
	 * Added Effects : restore opacity and restore size.
	 */ 
	Particle.fn.retract = function() {
		this.isFloating = false;
		this.eStack.push(PARTICLE_FX.changeSize(Particle.DEFAULT_SIZE, 2));
		this.eStack.push(PARTICLE_FX.changeOpacity(1, 0.4));
		return this;
	};


	/**
	 *
	 */ 
	Particle.fn.move = function( delta ) {
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
				if (this.current.x < this.origin.x + Pword.fn.Particle.SNAP_TO_ORIGIN_THRESHOLD && 
					this.current.x > this.origin.x - Pword.fn.Particle.SNAP_TO_ORIGIN_THRESHOLD)
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
					this.current.x += Pword.fn.Particle.RETRACTION_SPEED 
						* (1 + Pword.fn.Particle.RETRACTION_GROWTH*Math.log10(Math.abs(_delta) / Math.pow(Pword.fn.Particle.RETRACTION_SPEED, 2)))
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
					this.current.y += Pword.fn.Particle.RETRACTION_SPEED 
						* (1 + Pword.fn.Particle.RETRACTION_GROWTH*Math.log10(Math.abs(_delta) / Math.pow(Pword.fn.Particle.RETRACTION_SPEED, 2)))
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


	// Attach to PWord.
	PWord.fn.Particle = Particle;

})()