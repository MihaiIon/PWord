(function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "PWord requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
})( typeof window !== "undefined" ? window : this, function(window, noGlobal) {

	"use strict";

	var
		version = "@VERSION",

		// Define a local copy of PWord
		PWord = function( selector, wordList, options ) {
			PWord.fn.init( selector, wordList, options );
		}


	PWord.fn = PWord.prototype = {

		/*
		 * The current version of PWord being used
		 */
		pword: version,

		/*
		 * Set constructors.
		 */
		constructor: PWord
	}

	window.PWord = PWord;
});
