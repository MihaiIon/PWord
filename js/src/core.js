(function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
})( typeof window !== "undefined" ? window : this, function(window, noGlobal) {

	"use strict";

	var
		version = "@VERSION",

		// Define a local copy of PWord
		PWord = function( selector, wordList, options ) {
			return new PWord.fn.init( selector, wordList, options );
		}


	PWord.fn = PWord.prototype = {

		/*
		 * The current version of PWord being used
		 */
		pword: version,

		/*
		 * Set constructors.
		 */
		constructor: PWord,

		/*
		 * Contains all the resources/elements that will be animated in
		 * the canvas.
		 *
		 *	> wordIndex 	: Index of the current word displayed.
		 *  > currentWord 	: Current displayed word in the canvas.
		 *  > wordList     	: List of words that will be displayed.
		 *  > particles
		 *		> Fake     	: Particles that are only floating in the background.
		 *     	> Real     	: Particles the form the word when the user hovers
		 *                    the canvas.
		 */
		core : {
			wordIndex:0,
		 	currentWord: null,
		 	wordList : [],
		 	particles: {
		  		fake: [],
		  		real: []
		 	}
		},


		//-------------------------------------------------


	    /* 
	 	 * PIXI : Renderer.
	 	 */ 
		renderer: null,

		/*
	 	 * Root container that will hold all the elements to be drawn.
	 	 */
	 	stage: new PIXI.Container(),
	}

	window.PWord = PWord;
});