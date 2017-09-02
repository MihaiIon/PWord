(function(){

	"use strict";

	/**
	 *
	 */
	var Scene = function( selector, opts ){
		
		// The container that will contain the scene.
		this.container = document.getElementById(selector.substring(1));

		// Scene's Size
		this.dimens = {};
		this.dimens.width = opts.width ? opts.width : this.container.offsetWidth;
		this.dimens.height = opts.height ? opts.width : this.container.offsetHeight;

		// Keeping track of the center is essential to
		// center it's content.
		this.center = new PIXI.Point(this.dimens.width/2, this.dimens.height/2);


		// The PIXI engine.
		this.app = new PIXI.Application(
			this.dimens.width, 
			this.dimens.height,
			{ backgroundColor: opts.bgColor }
		);

		// Graphics
		this.graphics = new PIXI.Graphics();

		// The current displayed word in the canvas.
		this.word = null;

		// There are 2 kinds of particle. The ones that form a Word and
		// those that are decorative (deco).
		this.particles = {
			main: [],
			fake: []
		};

		// Finalize the job.
		this.setConstants( opts.particle ? opts.particle : {});
		this.append();
	};

	/**
	 * Appends PIXI's canvas in the DOM.
	 */
	Scene.prototype.append = function() {
		this.container.appendChild( this.app.view );
	};


	/**
	 *
	 */
	Scene.prototype.setConstants = function( opts ) {

		// Particles
		SET_CONST(PWord.fn.Particle, "DEFAULT_SIZE", opts.size ? opts.size : 20 );

		SET_CONST(PWord.fn.Particle, "MIN_SPEED", opts.minSpeed ? opts.minSpeed : 0.015);
		SET_CONST(PWord.fn.Particle, "MAX_SPEED", opts.maxSpeed ? opts.maxSpeed : 0.025);
		SET_CONST(PWord.fn.Particle, "SPEED_DELTA", 
			PWord.fn.Particle.MAX_SPEED-PWord.fn.Particle.MIN_SPEED);

		SET_CONST(PWord.fn.Particle, "RETRACTION_GROWTH", opts.rGrowth ? opts.rGrowth : 0.5 );
		SET_CONST(PWord.fn.Particle, "RETRACTION_SPEED", opts.rSpeed ? opts.rSpeed : 10 );
		SET_CONST(PWord.fn.Particle, "SNAP_TO_ORIGIN_THRESHOLD", opts && opts.snapOrigin ? opts.snapOrigin : 2);

		SET_CONST(PWord.fn.Particle, "MIN_GPOINT_RADIUS", opts.minRadius ? opts.minRadius : 40 );
		SET_CONST(PWord.fn.Particle, "MAX_GPOINT_RADIUS", opts.maxRadius ? opts.maxRadius : 100 );
		SET_CONST(PWord.fn.Particle, "GPOINT_DELTA_RADIUS", 
			PWord.fn.Particle.MAX_GPOINT_RADIUS-PWord.fn.Particle.MIN_GPOINT_RADIUS );

		SET_CONST(PWord.fn.Particle, "COLORS", {
			BLACK : { r: 0, g: 0, b: 0 }
		});

		// Scene
		var _min = 2*PWord.fn.Particle.MAX_GPOINT_RADIUS,
			_maxX = this.dimens.width - 6*PWord.fn.Particle.MAX_GPOINT_RADIUS,
			_maxY = this.dimens.height - 4*PWord.fn.Particle.MAX_GPOINT_RADIUS;

		SET_CONST(Scene, "SAFE_ZONE_X_AXIS", { min: _min, max: _maxX });
		SET_CONST(Scene, "SAFE_ZONE_Y_AXIS", { min: _min, max: _maxY });
	};


	/**
	 *
	 */
	Scene.prototype.generateFakeParticles = function() {
		for (var i = 0; i < Math.floor(Math.random()*10) + 8; i++) {
			this.particles.fake.push(new PWord.fn.Particle(
				Scene.SAFE_ZONE_X_AXIS.max*Math.random() + Scene.SAFE_ZONE_X_AXIS.min,
				Scene.SAFE_ZONE_Y_AXIS.max*Math.random() + Scene.SAFE_ZONE_Y_AXIS.min,
				//this.word.color
				"000000"
			).float());
		}
	};


	/**
	 *
	 */
	Scene.prototype.init = function() {
		
		// 
		this.generateFakeParticles();

		// Animation function
		var _this = this;
		this.app.ticker.add(function( delta ){
			// Aliasas.
			var _g  = _this.graphics,
				_pM = _this.particles.main,
				_pF = _this.particles.fake;

			// Clear the graphics.
			_g.clear();

			// Draw MAIN particles.
		    for (var i = 0; i < _pM.length; i++) 
		    {
		    	// Draw Particle.
				_g.beginFill("0x"+_pM[i].color, 1);
				_g.fillAlpha = _pM[i].opacity;
				_g.drawRect(
					_pM[i].current.x - _pM[i].size/2, 
					_pM[i].current.y - _pM[i].size/2, 
					_pM[i].size, 
					_pM[i].size
				);

				// Move Particle
				_pM[i].move(delta);
				_pM[i].consumeEffects();
			}

			// Draw DECO particles.
		    for (var i = 0; i < _pF.length; i++) 
		    {
		    	// Draw Particle.
				_g.beginFill("0x"+_pF[i].color, 1);
				_g.fillAlpha = _pF[i].opacity;
				_g.drawRect(
					_pF[i].current.x - _pF[i].size/2, 
					_pF[i].current.y - _pF[i].size/2, 
					_pF[i].size, 
					_pF[i].size
				);

				// Move Particle
				_pF[i].move(delta);
				_pF[i].consumeEffects();
			}

			// Print the graphics on the canvas.
			_this.app.stage.addChild(_g);
		});

		return this;
	};

	// 
	PWord.fn.Scene = Scene;

})();