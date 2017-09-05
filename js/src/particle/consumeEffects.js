define( function(){

	/**
	 * Applies each effect and updates the Effect Stack by queuing
	 * the effects that weren't complete.
	 */
	return function() {
		var fx;
		while (this.eStack.length() > 0) {
			fx = this.eStack.pop();
			fx.func( this, fx );
		} 
		this.eStack.update();
		return this;
	};
} );