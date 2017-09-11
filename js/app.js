// Config
requirejs.config({
    baseUrl: "js/src",
    paths: {
    	pixi: "../lib/pixi",
    }
});

// Load module
requirejs( [ "core" ], function( Pword ) {
	window.test = new Pword( "#pword-container" );
} );