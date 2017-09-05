define( [
	"pixi",
	"model/effectStack",
	"particle/addEffect",
	"particle/consumeEffects",
	"particle/getColor",
	"particle/float",
	"particle/retract",
	"particle/move",
], function( PIXI, EffectStack ) {

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


Particle.prototype.addEffect = addEffect;
Particle.prototype.consumeEffects = consumeEffects;
Particle.prototype.getColor = getColor;
Particle.prototype.float = float;
Particle.prototype.retract = retract;
Particle.prototype.move = move;

return Particle;

} );