define( [
	"./var/document",
	"./model/scene",
	"./model/Particle",
	"./model/word",
	"./helper"
], function( document, Scene, Particle, Word, helper ) {

"use strict";

var 
	version = "1.0",

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
			_maxX = this.scene.dimens.width - 6*Particle.MAX_GPOINT_RADIUS,
			_maxY = this.scene.dimens.height - 4*Particle.MAX_GPOINT_RADIUS;

		helper.SET_CONST(Scene, "SAFE_ZONE_X_AXIS", { min: _min, max: _maxX });
		helper.SET_CONST(Scene, "SAFE_ZONE_Y_AXIS", { min: _min, max: _maxY });
	},

	initScene: function( selector, options ) {
		this.scene = new Scene( selector, options.scene )
		this.setConstants( options.particle );
		this.scene.init();
	}
};

return Pword;

} );
