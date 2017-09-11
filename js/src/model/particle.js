define( [
	"pixi",
	"./effectStack",
	"particle/addEffect",
	"particle/consumeEffects",
	"particle/getColor",
	"particle/float",
	"particle/retract",
	"particle/move",
], function( PIXI, EffectStack, addEffect, consumeEffects, getColor, float, retract, move ) {

"use strict";

var Particle = function( x, y, color, size, opacity ) {
	this.origin = new PIXI.Point(x, y);
	this.current = new PIXI.Point(x, y);
	this.size = size ? size : Particle.DEFAULT_SIZE;
	this.color = color ? color : Particle.COLORS.BLACK;
	this.opacity = opacity ? opacity : 1;
	this.speed = Particle.MIN_SPEED 
		+ Math.random()*Particle.SPEED_DELTA;
	
	// Gravity Point
	this.gPoint = null;

	// Controllers.
	this.isFloating = false;
	this.isMoving = false;

	// Contains the current effects applied to this <Particle>.
	this.eStack = new EffectStack();
};

Particle.prototype = {
	constructor: Particle,
	addEffect:addEffect,
	consumeEffects: consumeEffects,
	getColor: getColor,
	float: float,
	retract: retract,
	move: move,
}

return Particle;

} );