/**
 *
 */
PWord.fn.Word = function( str, color ){

	"use strict";
	this.word = str;

	// Simple way to test if a color is valid.
	this.color = color && /^#(?:[a-z0-9]{3}){1,2}$/.test(color) ? color : "#000";
};

/**
 * Provides an array of `Letters` to be drawn in the canvas. Each `Letter` is
 * an object that contains a matrix that indicates where each particles are located
 * to form the `Letter`.
 */
PWord.fn.Word.prototype.buildLetters = function(){
	var letters = this.word.split("");
	for (var i = 0; i < letters.length; i++) {
		letters[i] = new PWord.fn.Letter( letters[i].toLowerCase(), this.color );
	return letters;
};
