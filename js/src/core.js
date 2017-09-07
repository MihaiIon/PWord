define( [
	"./var/document",
	"./model/scene",
	"./model/word"
], function( document, Scene, Word ) {

"use strict";

var 
	version = "1.0",

	// Define a local copy of Pword
	Pword = function( selector, words, opt ) {
		return new Pword.fn.init( selector, words, opt );
	};


Pword.fn = Pword.prototype = {

	constructor: Pword,


	//------------------------------------------
	// Properties
	//------------------------------------------

	/*
	 * Contains all the resources/elements that will be animated in
	 * the canvas.
	 *
	 *  > wordIndex 	: Index of the current word displayed.
	 *  > currentWord 	: Current displayed word in the canvas.
	 *  > wordList     	: List of words that will be displayed.
	 */
	wordIndex: null,
	currentWord: null,
	wordList: null,

	/*
	 * PIXI engine ( canvas ).
	 */
	scene: null,


	//------------------------------------------
	// Methods.
	//------------------------------------------
	
	setState: function( state ){
		this.currentState = state;
	},

	// Sets the word that is displayed in the PIXI engine.
	setWord: function( index ){
		this.wordIndex = index;
		this.currentWord = this.wordList[ index ].word;
		this.scene.draw( this.currentWord );
	},

	setWordList: function( list ){
		var l = this.wordList = [];
 		for (var i = 0; i < list.length; i++) {
 			l.push( new Word( list[i].word, list[i].color ) );
 		}
 		this.setWord(0);
	},

	init: function( selector, list, opts ) {

		"use strict";

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
			throw new Error("The provided selector '"+selector+"' is malformed. Provide a valid id.");
		}

		// Init PIXI engine ( Scene )
		this.scene = new Scene( selector, opts 
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
};

} );
