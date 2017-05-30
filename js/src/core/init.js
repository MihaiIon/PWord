/*
 * 
 */
PWord.fn.init = function( selector, list, options ){

	"use strict";
	var rquickExpr = /^#([\w-]+)$/,	// A simple way to check for HTML ids
	var match, elem;

	// HANDLE: $(""), $(null), $(undefined), $(false)
	if ( !selector || !rquickExpr.test(selector)) {
		throw new Error("The provided selector -"+selector+"- is malformed. Provide a valid id.");
	}

	// If the selector is a valid ID-selector, initialise PIXI in that container
	// -- Throws an Error if the `container` is not a `canvas`. 
	this.setContainer( selector );

	// If no words are specified, a default list will be 
	// provided as argument.
	this.setWordList( list ? list : [
		{ word:"Creative" },
		{ word:"Genius", color:"red" },
		{ word:"Ninja" },
		{ word:"OMG" },
		{ word:"Fabulous" }
	] );

	// If no options or (partial options) are specified `setOptions` will set
	// default values for unset properties.
	// TO-DO.
	this.setOptions( options ? options : {
		pixelDimens : 10,
		spaceBetween : 5,	// Space between characters.
		resizable: true,
		minSpreadDistance: 10, 	// Particles minimal floating distance. 
		maxSpreadDistance: 50  	// ----------maximal------------------.
	});
};
