define( function(){
	return function( prop, val ) {
		Object.defineProperty( proto, prop, { value : val });
	};
} );
