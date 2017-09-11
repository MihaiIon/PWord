define( function(){
	return function( proto, prop, val ) {
		Object.defineProperty( proto, prop, { value : val });
	};
} );
