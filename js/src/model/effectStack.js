(function(){
	/**
	 *
	 */
	var EffectStack = function() {
		this.stack = [];
		this.queued = [];
	}

	EffectStack.prototype.length = function() {
	    return this.stack.length;
	};

	EffectStack.prototype.push = function( fx ) {
		this.stack.push( fx );
	};

	EffectStack.prototype.pop = function( fx ) {
		return this.stack.pop( fx );
	};

	EffectStack.prototype.update = function() {
		this.stack = this.queued.slice(0);
		this.queued = [];
	};

	EffectStack.prototype.continue = function( fx ) {
		this.queued.push( fx );
	};

	PWord.fn.EffectStack = EffectStack;
})();