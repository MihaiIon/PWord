/*
 *
 */
PWord.fn.Word = function( str, color ){
	"use strict";
	// 
	this.input = str;

	// 
	this.chars = str.split("");
	for (var i = 0; i < this.chars.length; i++) {
		this.chars[i] = new PWord.fn.Letter(this.chars[i].toLowerCase());
	}

	// Simple way to test if a color is valid.
	this.color = color && /^#(?:[a-z0-9]{3}){1,2}$/.test(color) ? color : "#000";
};