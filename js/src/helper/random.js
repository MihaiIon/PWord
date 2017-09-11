define( function() {
	return function( start, end, isFloor ) {
		var _r = Math.random() * ( !end ? start : ( end - start ) )
		return ( isFloor ? Math.floor( _r ) : _r ) 
			+ ( !end ? 0 : start );
	};
} );