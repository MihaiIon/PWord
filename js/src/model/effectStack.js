define( function() {

/**
 *
 */
var EffectStack = function() {
	this.stack = [];
	this.queued = [];
}

EffectStack.prototype = {
	length: function() {
    	return this.stack.length;
	},
	push: function( fx ) {
		this.stack.push( fx );
	},
	pop: function( fx ) {
		return this.stack.pop( fx );
	},
	update: function() {
		this.stack = this.queued;
		this.queued = [];
	},
	continue: function( fx ) {
		this.queued.push( fx );
	}
};

return EffectStack;

} );