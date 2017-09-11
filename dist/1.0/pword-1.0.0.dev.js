/*
 * Inspiration from:
 * https://github.com/jquery/jquery/blob/master/src/intro.js
 *
 * Thanks jQuery!
 *
 * This is another way to handle dependencies (in this case, a window with a document)
 */
(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "Pword requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

"use strict";

var 
	version = "1.0.0",

	// Define a local copy of Pword
	Pword = function( selector, words, options ) {

		/*
		 * Contains all the resources/elements that will be animated in
		 * the canvas.
		 *
		 *  > wordIndex 	: Index of the current word displayed.
		 *  > currentWord 	: Current displayed word in the canvas.
		 *  > wordList     	: List of words that will be displayed.
		 */
		this.wordIndex = null;
		this.currentWord = null;
		this.wordList = null;

		/* 
		 * If no words are specified, a default list will be 
		 * provided as argument.
		 */
		this.setWordList( words ? words : [
			{ word:"Creative", color:"3fa8ce" },
			{ word:"Genius", color:"3ece97" },
			{ word:"Ninja", color:"cb6de0" },
			{ word:"OMG", color:"ef8839" },
			{ word:"Fabulous", color:"d63359" }
		] );


		/*
		 * Initialize the PIXI canvas and append's it to the designated 
		 * container ( if the selector is valid, else throw error ).
		 *
		 */
		var rquickExpr = /^#([\w-]+)$/,	// A simple way to check for HTML ids
		    match, elem;


		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector || !rquickExpr.test(selector)) 
		{ 
			throw new Error("The provided selector '"+selector+"' is malformed. Provide a valid id.");
		}

		/*
		 * Init PIXI engine
		 */
		var _o   = options ? options : {}, 
		    _op  = _o.particle ? options.particle : {};

		this.initScene( selector, { 

				// Scene options:
				//--------------------------
				scene: 
				{
					bgColor : "0x" + ( _o.bgColor ? _o.bgColor : "ffffff" ),
					resizable: true
				},
				 

				// Particle options:
				//--------------------------
				particle: 
				{
					size: _op.size ? _op.size : 20,
					minSpeed: _op.minSpeed ? _op.minSpeed : 0.015,
					maxSpeed: _op.maxSpeed ? _op.maxSpeed : 0.025,
					rSpeed : _op.rSpeed  ? _op.rSpeed  : 10,
					rGrowth: _op.rGrowth ? _op.rGrowth : 0.5,
					snapOrigin: _op.snapOrigin ? _op.snapOrigin : 2,
					minRadius: _op.minRadius ? _op.minRadius : 40,			// Particles minimal floating distance. 
					maxRadius: _op.maxRadius ? _op.maxRadius : 100,			// ----------maximal------------------.
					spaceBetween : _o.spaceBetween ? _o.spaceBetween : 5	// Space between letters.
				}
		} );
	};


Pword.fn = Pword.prototype = {

	constructor: Pword,
	
	setState: function( state ){
		this.currentState = state;
	},

	// Sets the word that is displayed in the PIXI engine.
	setWord: function( index ){
		this.wordIndex = index;
		this.currentWord = this.wordList[ index ].string;
		//this.scene.draw( this.currentWord );
	},

	setWordList: function( list ){
		this.wordList = [];
 		for (var i = 0; i < list.length; i++) {
 			this.wordList.push( new Word( list[i].word, list[i].color ) );
 		}
 		this.setWord(0);
	},

	setConstants: function( options ) {

		//----------------------------
		// Particle
		//----------------------------

		helper.SET_CONST(Particle, "DEFAULT_SIZE", options.size);
		
		helper.SET_CONST(Particle, "MIN_SPEED", options.minSpeed);
		helper.SET_CONST(Particle, "MAX_SPEED", options.maxSpeed);
		helper.SET_CONST(Particle, "SPEED_DELTA", Particle.MAX_SPEED-Particle.MIN_SPEED);

		helper.SET_CONST(Particle, "RETRACTION_GROWTH", options.rGrowth);
		helper.SET_CONST(Particle, "RETRACTION_SPEED", options.rSpeed);
		helper.SET_CONST(Particle, "SNAP_TO_ORIGIN_THRESHOLD", options.snapOrigin);

		helper.SET_CONST(Particle, "MIN_GPOINT_RADIUS", options.minRadius);
		helper.SET_CONST(Particle, "MAX_GPOINT_RADIUS", options.maxRadius);
		helper.SET_CONST(Particle, "GPOINT_DELTA_RADIUS", Particle.MAX_GPOINT_RADIUS-Particle.MIN_GPOINT_RADIUS );

		helper.SET_CONST(Particle, "COLORS", {
			BLACK : { r: 0, g: 0, b: 0 }
		});


		//----------------------------
		// Scene
		//----------------------------

		helper.SET_CONST(Scene, "Particle", Particle)

		var _min = 2*Particle.MAX_GPOINT_RADIUS,
			_maxX = this.scene.dimens.width - 2*Particle.MAX_GPOINT_RADIUS,
			_maxY = this.scene.dimens.height - 2*Particle.MAX_GPOINT_RADIUS;

		helper.SET_CONST(Scene, "SAFE_ZONE_X_AXIS", { min: _min, max: _maxX });
		helper.SET_CONST(Scene, "SAFE_ZONE_Y_AXIS", { min: _min, max: _maxY });
	},

	initScene: function( selector, options ) {
		this.scene = new Scene( selector, options.scene )
		this.setConstants( options.particle );
		this.scene.init();
	}
};


//--------------------------------------------------------------------
// Letter and Word
//--------------------------------------------------------------------

var
	Word = function( str, color ){

		this.string = str;

		// Simple way to test if a color is valid.
		this.color = color && /^#(?:[a-z0-9]{3}){1,2}$/.test( color ) ? color : "000000";

		// Array of characters / symbols.
		this.letters = this.buildLetters();
	},
	
	Letter = function( char ) {
		if (/^[a-z0-9. ]$/.test(char)) {
			this.char = char;
			this.matrix = this.buildMatrix( char );
		} else throw new Error("Unsupported character '"+char+"'.");
	};

Word.prototype.buildLetters = function(){
	var _ls = this.string.split("");
	for (var i = 0; i < _ls.length; i++)
		_ls[i] = new Letter( _ls[i].toLowerCase(), this.color );
	return _ls;
};

Letter.prototype.buildMatrix = function( char ){
	switch(char){
		case ' ': return [ 0, 0, 0, 0, 0, 
				   0, 0, 0, 0, 0,
				   0, 0, 0, 0, 0,
				   0, 0, 0, 0, 0,
				   0, 0, 0, 0, 0  ];

 		case '.': return [ 0, 0, 0, 0, 0, 
				   0, 0, 0, 0, 0,
				   0, 0, 0, 0, 0,
				   0, 1, 1, 0, 0,
				   0, 1, 1, 0, 0  ];
 
 		case 'a': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1,
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1  ];

		case 'b': return [ 1, 1, 1, 1, 0, 
				   1, 0, 0, 1, 0,
				   1, 1, 1, 1, 1,
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1  ];

		case 'c': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 0,
				   1, 0, 0, 0, 0,
				   1, 0, 0, 0, 0,
				   1, 1, 1, 1, 1  ];

		case 'd': return [ 1, 1, 1, 1, 0, 
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 0  ];

		case 'e': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 0,
				   1, 1, 1, 0, 0, 
				   1, 0, 0, 0, 0,
				   1, 1, 1, 1, 1  ];

		case 'f': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 0,
				   1, 1, 1, 0, 0, 
				   1, 0, 0, 0, 0,
				   1, 0, 0, 0, 0  ];

		case 'g': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 0,
				   1, 0, 1, 1, 1, 
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1  ];

		case 'h': return [ 1, 0, 0, 0, 1, 
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1  ];				   

	   	case 'i': return [ 0, 0, 1, 0, 0, 
				   0, 0, 1, 0, 0,
				   0, 0, 1, 0, 0, 
				   0, 0, 1, 0, 0,
				   0, 0, 1, 0, 0  ];

		case 'j': return [ 0, 0, 0, 0, 1, 
				   0, 0, 0, 0, 1,
				   0, 0, 0, 0, 1, 
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1  ];

		case 'k': return [ 1, 0, 0, 1, 0, 
				   1, 0, 0, 1, 0,
				   1, 0, 0, 1, 0, 
				   1, 1, 1, 1, 0,
				   1, 0, 0, 0, 1  ];

		case 'l': return [ 1, 0, 0, 0, 0, 
				   1, 0, 0, 0, 0,
				   1, 0, 0, 0, 0, 
				   1, 0, 0, 0, 0,
				   1, 1, 1, 1, 1  ];

		case 'm': return [ 1, 1, 1, 1, 1, 
				   1, 0, 1, 0, 1,
				   1, 0, 1, 0, 1, 
				   1, 0, 1, 0, 1,
				   1, 0, 1, 0, 1  ];

		case 'n': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1  ];

		case '0':
		case 'o': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1  ];

		case 'p': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1,
				   1, 0, 0, 0, 0,
				   1, 0, 0, 0, 0  ];

		case 'q': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 0, 1, 0, 1,
				   1, 1, 1, 1, 1  ];

	   	case 'r': return [ 1, 1, 1, 1, 0,
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 0, 
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1 ];

		case '5':
		case 's': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 0,
				   1, 1, 1, 1, 1,
				   0, 0, 0, 0, 1,
				   1, 1, 1, 1, 1  ];
	   	
	   	case 't': return [ 1, 1, 1, 1, 1,
				   0, 0, 1, 0, 0,
				   0, 0, 1, 0, 0,
				   0, 0, 1, 0, 0,
				   0, 0, 1, 0, 0  ];

		case 'u': return [ 1, 0, 0, 0, 1, 
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1  ];
	   	
	   	case 'v': return [ 1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   0, 1, 0, 1, 0,
				   0, 1, 0, 1, 0,
				   0, 0, 1, 0, 0 ];

		case 'w': return [ 1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 0, 1, 0, 1,
				   1, 0, 1, 0, 1,
				   1, 1, 1, 1, 1 ];

		case 'x': return [ 1, 1, 0, 1, 1,
				   0, 1, 1, 1, 0,
				   0, 0, 1, 0, 0,
				   0, 1, 1, 1, 0,
				   1, 1, 0, 1, 1 ];

		case 'y': return [ 1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1,
				   0, 0, 1, 0, 0,
				   0, 0, 1, 0, 0 ];

		case '2':
		case 'z': return [ 1, 1, 1, 1, 1,
				   0, 0, 0, 0, 1,
				   1, 1, 1, 1, 1,
				   1, 0, 0, 0, 0,
				   1, 1, 1, 1, 1 ];

		case '1': return [ 0, 1, 1, 0, 0,
				   0, 0, 1, 0, 0,
				   0, 0, 1, 0, 0,
				   0, 0, 1, 0, 0,
				   0, 0, 1, 0, 0 ];

		case '3': return [ 1, 1, 1, 1, 1,
				   0, 0, 0, 0, 1,
				   0, 0, 1, 1, 1,
				   0, 0, 0, 0, 1,
				   1, 1, 1, 1, 1 ];

		case '4': return [ 1, 0, 0, 0, 1,
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1,
				   0, 0, 0, 0, 1,
				   0, 0, 0, 0, 1 ];

		case '6': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 0,
				   1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1  ];

		case '7': return [ 1, 1, 1, 1, 1, 
				   0, 0, 0, 0, 1,
				   0, 0, 0, 0, 1,
				   0, 0, 0, 0, 1,
				   0, 0, 0, 0, 1  ];

		case '8': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1,
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1  ];

		case '9': return [ 1, 1, 1, 1, 1, 
				   1, 0, 0, 0, 1,
				   1, 1, 1, 1, 1,
				   0, 0, 0, 0, 1,
				   1, 1, 1, 1, 1  ];

		default: return [];
 	}
};


//--------------------------------------------------------------------
// Scene
//--------------------------------------------------------------------

var
	Scene = function( selector, opts ) {

		// The container that will contain the scene.
		this.container = document.getElementById( selector.substring(1) );

		// 
		this.options = opts;

		// Scene's Size
		this.dimens = {};
		this.dimens.width = this.container.offsetWidth;
		this.dimens.height = this.container.offsetHeight;

		// Keeping track of the center is essential to
		// center it's content.
		this.center = new PIXI.Point( this.dimens.width/2, this.dimens.height/2 );

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
	};

Scene.prototype = {
	constructor: Scene,
	init: function() {
		this.append();
		this.generateFakeParticles();
		this.animate();
		return this;
	},
	append: function() {
		this.container.appendChild( this.app.view );
	},
	generateFakeParticles: function() {

		// Alias
		var Scene = this.constructor,
		    Particle = Scene.Particle,
		    _size = Particle.DEFAULT_SIZE;

		for (var i = 0; i < helper.rand(8, 20); i++) {
			this.particles.fake.push(
				new Particle(
					helper.rand( Scene.SAFE_ZONE_X_AXIS.min, Scene.SAFE_ZONE_X_AXIS.max ),
					helper.rand( Scene.SAFE_ZONE_Y_AXIS.min, Scene.SAFE_ZONE_Y_AXIS.max ))
						.addEffect( FX.fadeIn({ step: 0.01 }) )
						.addEffect( FX.changeSize({ value: helper.rand( _size/2, _size+_size/2 ) }) )
						.float());
		}
	},
	animate: function() {

		function draw( g, p, d ) {
			for (var i = 0; i < p.length; i++) 
		    {
		    	//
		    	p[i].consumeEffects();
		    	 
		    	// Draw Particle.
				g.beginFill("0x"+p[i].color, 1);
				g.fillAlpha = p[i].opacity;
				g.drawRect(
					p[i].current.x - p[i].size/2, 
					p[i].current.y - p[i].size/2, 
					p[i].size, 
					p[i].size
				);

				// Move Particle
				p[i].move(d);
			}
		};

		var _this = this;
		this.app.ticker.add(function( delta ){
			// Aliasas.
			var _g  = _this.graphics,
				_pM = _this.particles.main,
				_pF = _this.particles.fake;

			// Clear the graphics.
			_g.clear();

			// Draw particles.
		    draw( _g, _pM, delta );
			draw( _g, _pF, delta );

			// Print the graphics on the canvas.
			_this.app.stage.addChild(_g);
		});
	}
};

//--------------------------------------------------------------------
// Particle
//--------------------------------------------------------------------

var 
	Particle = function( x, y, color, size, opacity ) {
		this.origin = new PIXI.Point(x, y);
		this.current = new PIXI.Point(x, y);
		this.size = size ? size : Particle.DEFAULT_SIZE;
		this.color = color ? color : Particle.COLORS.BLACK;
		this.opacity = opacity ? opacity : 1;
		this.speed = helper.rand( Particle.MIN_SPEED, Particle.SPEED_DELTA + Particle.MIN_SPEED );
		
		// Gravity Point
		this.gPoint = null;

		// Controllers.
		this.isFloating = false;
		this.isMoving = false;

		// Contains the current effects applied to this <Particle>.
		this.eStack = new EffectStack();
	},

	EffectStack = function() {
		this.stack = [];
		this.queued = [];
	},

	GravityPoint = function( particle ) {
	
		// Random radius.
		this.radius = helper.rand(
			particle.constructor.MIN_GPOINT_RADIUS,
			particle.constructor.GPOINT_DELTA_RADIUS
		);

		// Spinning direction.
		this.direction = Math.random() > 0.5 ? 1 : -1;
		
		// Pick a random angle (in rads) to generate the <GravityPoint>'s center. 
		this.angle = Math.random() * 2 * Math.PI;
		
		// The center is calculated from the <particle>'s origin position.
		// That way, the <particle> can immediately orbit around the <GravityPoint>'s center
		// when it starts floating.
		this.origin = new PIXI.Point (
			particle.origin.x + this.radius * Math.cos(2*Math.PI - this.angle),
			particle.origin.y + this.radius * Math.sin(2*Math.PI - this.angle)
		);
	};

Particle.prototype = {
	constructor: Particle,
	addEffect:function( fx ) {
		this.eStack.push( fx );
		return this;
	},
	consumeEffects: function() {
		var fx;
		while (this.eStack.length() > 0) {
			fx = this.eStack.pop();
			fx.func( this, fx );
		} 
		this.eStack.update();
		return this;
	},
	getColor: function() {
		return helper.toHex(this.color.r) + helper.toHex(this.color.g) + helper.toHex(this.color.b);
	},
	float: function() {
		this.gPoint = new GravityPoint( this );
		this.isMoving = true;
		this.isFloating = true;
		return this;
	},
	retract: function() {
		this.isFloating = false;
		this.eStack.push(FX.changeSize(Particle.DEFAULT_SIZE, 2));
		this.eStack.push(FX.changeOpacity(1, 0.4));
		return this;
	},
	move: function( delta ) {

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
	}
};

EffectStack.prototype = {
	length: function() {
    	return this.stack.length;
	},
	push: function( fx ) {
		this.stack.push( fx );
	},
	pop: function( fx ) {
		return this.stack.pop( fx );
	},
	update: function() {
		this.stack = this.queued;
		this.queued = [];
	},
	continue: function( fx ) {
		this.queued.push( fx );
	}
};


//--------------------------------------------------------------------
// Effects
//--------------------------------------------------------------------

var 
	FX = {
		base: {
			size_func: function( particle, data ) {

				// Distance to targetValue.
				var _delta = (particle.size - data.targetValue);

				// If the particle still validates the conditions,
				// continue the effect till it's done.
				if ((particle.isFloating || particle.isMoving) && Math.abs(_delta) > 2) 
				{
					particle.size += data.step * (_delta > 0 ? -1 : 1);
					return false;
				} 

				//
				else 
				{
					particle.size = data.targetValue;
					return true;
				}
			},
			opacity_func: function( particle, data ) {	
				
				// Distance to targetValue.
				var _delta = (particle.opacity - data.targetValue);

				// If the particle still validates the conditions,
				// continue the effect till it's done.
				if ((particle.isFloating || particle.isMoving) && Math.abs(_delta) > 0.1) 
				{
					particle.opacity += data.step * (_delta > 0 ? -1 : 1);
					return false;	
				} 

				//
				else 
				{
					particle.opacity = data.targetValue;
					return true;
				}
			},
			color_func: function( particle, data ) {
					
				var _c = particle.color,
				    _t = data.targetValue;

				if (_c.r != _t.r || _c.g != _t.g || _c.b != _t.b) 
				{
					// 
					var helper = function( delta, value, step, targetValue ) {
						if (Math.abs(delta) < 10) return targetValue;
						else return value + data.step * (delta > 0 ? -1 : 1);
					}

					_c.r = helper( _c.r - _t.r, _c.r, data.step, _t.r );
					_c.g = helper( _c.g - _t.g, _c.g, data.step, _t.g );
					_c.b = helper( _c.b - _t.b, _c.b, data.step, _t.b );
					return false;
				};
			} 
		},
		changeSize: function( args ) {
			return {
				data: {
					step: args && args.step ? args.step : helper.rand( 0.2, 0.6 ),
					targetValue: args && args.value ? args.value : helper.rand( 10, 20 )
				},

				func: function( particle, fx ){
					if(!FX.base.size_func( particle, fx.data )) {
						particle.eStack.continue({ 
							data: fx.data, 
							func: fx.func 
						});
					}
				}
			};
		},
		changeOpacity: function( args ) {
				
			return {

				// Basic information on the effect's goal.
				data: {
					step: args && args.step ? args.step : helper.rand( 0.04, 0.1 ),
					targetValue: args && ( args.value || args.value == 0 ) 
						? args.value 
						: helper.rand( 0.2, 0.9 )
				},

				// The core of the effect.
				func: function( particle, fx ) {
					if(!FX.base.opacity_func( particle, fx.data )) {
						particle.eStack.continue({ 
							data: fx.data, 
							func: fx.func 
						});
					}

					// If the particle fades away
					if ( particle.opacity == 0 ) {
						particle.consumed = true;
					}
				}
			};
		},
		changeColor: function( args ) {
			return {
				data: {
					step: args && args.step ? args.step : helper.rand(2, 10, true),
					targetValue: args && args.value 
						? args.value 
						: {
							r: helper.rand(0, 255, true),
							g: helper.rand(0, 255, true),
							b: helper.rand(0, 255, true)
					  	}
				},

				func: function( particle, fx ){
					if(!FX.base.color_func( particle, fx.data )) {
						particle.eStack.continue({ 
							data: fx.data, 
							func: fx.func 
						});
					}
				}
			};
		},
		fadeIn: function( args ) {
			return {

				// Basic information on the effect's goal.
				data: {
					step: args && args.step ? args.step : helper.rand( 0.001, 0.005 ),
					targetValue: args && args.value ? args.value : helper.rand( 0.2, 0.9 ),
					isZero: false
				},

				// The core of the effect.
				func: function( particle, fx ) {

					// Set opacity to zero.
					if (!fx.data.isZero) 
					{
						particle.opacity = -fx.data.step;
						fx.data.isZero = true;
					}

					// Start fade in.
					if(!FX.base.opacity_func( particle, fx.data )) {
						particle.eStack.continue({ 
							data: fx.data, 
							func: fx.func 
						});
					}
				}
			};
		},
		fadeOut: function( step ) {
			return changeOpacity({ value: 0, step: step ? step : 0.01 });
		}
	};


//--------------------------------------------------------------------
// Helper
//--------------------------------------------------------------------

var
	helper = {
		toHex: function( n ) {	
			n = parseInt(n,10);
			if (isNaN(n)) return "00";
			n = Math.max(0,Math.min(n,255));
			return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
		},
		SET_CONST: function( proto, prop, val ) {
			Object.defineProperty( proto, prop, { value : val });
		},
		rand: function( start, end, isFloor ) {
			var _r = Math.random() * ( !end ? start : ( end - start ) )
			return ( isFloor ? Math.floor( _r ) : _r ) 
				+ ( !end ? 0 : start );
		}
	};


window.Pword = Pword;

}));