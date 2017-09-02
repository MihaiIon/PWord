/*
 * 
 * @param opts: Options.
 */
PWord.fn.init = function( selector, list, opts ){

	"use strict";

	/*
	 * Contains all the resources/elements that will be animated in
	 * the canvas.
	 *
	 *  > wordIndex 	: Index of the current word displayed.
	 *  > currentWord 	: Current displayed word in the canvas.
	 *  > wordList     	: List of words that will be displayed.
	 *  > particles
	 *		> Fake     	: Particles that are only floating in the background.
	 *     	> Real     	: Particles the form the word when the user hovers
	 *                        the canvas.
	 */
	this.core = {
		wordIndex: null,
	 	currentWord: null,
	 	wordList : []
	};

	/*
	 *
	 */
	this.particles = {
  		fake: [],
  		real: []
	};

	// If no words are specified, a default list will be 
	// provided as argument.
	this.setWordList( list ? list : [
		{ word:"Creative" },
		{ word:"Genius", color:"red" },
		{ word:"Ninja" },
		{ word:"OMG" },
		{ word:"Fabulous" }
	]);


	/*
	 * Initialize the PIXI canvas and append's it to the designated 
	 * container ( if the selector is valid ).
	 *
	 */
	var rquickExpr = /^#([\w-]+)$/,	// A simple way to check for HTML ids
		match, elem;

	if ( !selector || !rquickExpr.test(selector)) // HANDLE: $(""), $(null), $(undefined), $(false)
	{ 
		throw new Error("The provided selector -"+selector+"- is malformed. Provide a valid id.");
	}

	this.scene = new PWord.fn.Scene( selector, opts 
		? opts 
		: { 
			bgColor : 0xffffff,
			pixelDimens : 10,
			spaceBetween : 5,	// Space between characters.
			resizable: true,
			minSpreadDistance: 10, 	// Particles minimal floating distance. 
			maxSpreadDistance: 50  	// ----------maximal------------------.
		}
	).init();
};
