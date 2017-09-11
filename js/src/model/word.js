define( [ "./letter" ], function( Letter ) {
Symbol
	"use strict";

	/**
	 *
	 */
	var Word = function( str, color ){

		this.string = str;

		// Simple way to test if a color is valid.
		this.color = color && /^#(?:[a-z0-9]{3}){1,2}$/.test( color ) ? color : "000000";

		// Array of characters / symbols.
		this.letters = this.buildLetters();
	}

	/**
	 * Provides an array of `Letters` to be drawn in the canvas. Each `Letter` is
	 * an object that contains a matrix that indicates where each particles are located
	 * to form the `Letter`. Ex:
	 *
	 * 0: particle;
	 * -: None
	 *
	 * 0000
	 * 0---
	 * 0---
	 * 0000
	 *
	 * Result : C.
	 *
	 */
	Word.prototype.buildLetters = function(){
		var _ls = this.string.split("");
		for (var i = 0; i < _ls.length; i++)
			_ls[i] = new Letter( _ls[i].toLowerCase(), this.color );
		return _ls;
	};


	return Word;

} );