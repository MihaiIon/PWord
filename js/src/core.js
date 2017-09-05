define( [
	"./var/document",
	"./model/scene"
], function( document, Scene ) {

"use strict";

var 
	version = "1.0",

	// Define a local copy of Pword
	Pword = function( selector, words, opt ) {
		return new Pword.fn.init( selector, words, opt );
	};


Pword.fn = Pword.prototype = {

	constructor: Pword,

	// constructors 
	scene: new Scene(),


};


window.Pword = Pword;

});