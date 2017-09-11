define( [
	"pixi",
	"var/document",
	"scene/init",
	"scene/append",
	"scene/setConstants",
	"scene/generateFakeParticles",
	"scene/animate"
], function( PIXI, document, init, append, setConstants, genFP, animate ) {

"use strict";

var Scene = function( selector, opts ) {

	// The container that will contain the scene.
	this.container = document.getElementById(selector.substring(1));

	// 
	this.options = opts;

	// Scene's Size
	this.dimens = {};
	this.dimens.width = this.container.offsetWidth;
	this.dimens.height = this.container.offsetHeight;

	// Keeping track of the center is essential to
	// center it's content.
	this.center = new PIXI.Point( this.dimens.width/2, this.dimens.height/2 );

	// The PIXI engine.
	this.app = new PIXI.Application(
		this.dimens.width, 
		this.dimens.height,
		{ backgroundColor: opts.bgColor }
	);

	// Graphics
	this.graphics = new PIXI.Graphics();

	// The current displayed word in the canvas.
	this.word = null;

	// There are 2 kinds of particle. The ones that form a Word and
	// those that are decorative (deco).
	this.particles = {
		main: [],
		fake: []
	};
};

Scene.prototype = {
	constructor: Scene,
	init: init,
	append: append,
	setConstants: setConstants,
	generateFakeParticles: genFP,
	animate: animate,
}

return Scene;

} );
