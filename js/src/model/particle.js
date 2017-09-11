define( [
	"pixi",
	"helper",
	"./effectStack",
	"particle/addEffect",
	"particle/consumeEffects",
	"particle/getColor",
	"particle/float",
	"particle/retract",
	"particle/move"
], function( PIXI, helper, EffectStack, addEffect, consumeEffects, getColor, float, retract, move ) {

"use strict";

var Particle = function( x, y, color, size, opacity ) {
	this.origin = new PIXI.Point(x, y);
	this.current = new PIXI.Point(x, y);
	this.size = size ? size : Particle.DEFAULT_SIZE;
	this.color = color ? color : Particle.COLORS.BLACK;
	this.opacity = opacity ? opacity : 1;
	this.speed = helper.rand( Particle.MIN_SPEED, Particle.SPEED_DELTA + Particle.MIN_SPEED );
	
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
	move: move
}

return Particle;

} );