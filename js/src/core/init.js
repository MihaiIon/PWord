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
	 */
	this.core = {
		wordIndex: null,
	 	currentWord: null,
	 	wordList : []
	};

	/* 
	 * If no words are specified, a default list will be 
	 * provided as argument.
	 */
	this.setWordList( list ? list : [
		{ word:"Creative", color:"3fa8ce" },
		{ word:"Genius", color:"3ece97" },
		{ word:"Ninja", color:"cb6de0" },
		{ word:"OMG", color:"ef8839" },
		{ word:"Fabulous", color:"d63359" }
	]);


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
		throw new Error("The provided selector -"+selector+"- is malformed. Provide a valid id.");
	}

	// Init PIXI engine ( Scene )
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

	return this;
};
