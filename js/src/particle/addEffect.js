define( function(){
	
	/**
	 * Adds an effect to the Effect Stack : <eStack>.
	 */
	return function( fx ){
		this.eStack.push( fx );
		return this;
	};
} );