/**
 * The renderer will create a canvas that will be inserted into the 
 * DOM, in the element specified by the provided selector (Id).
 */
PWord.fn.appendTo = function( selector ){
	"use strict";

	// -- Update the container's selector. 
	this.DOMElement.selector = selector;

	// -- Initialize the renderer.
	var d = this.DOMElement.getDimens(); 
	this.renderer = new PIXI.WebGLRenderer( d.width, d.height );

	// -- Append the canvas.
	document.getElementById( selector ).appendChild( this.renderer.view );
};