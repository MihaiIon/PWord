/*
 * 
 */
PWord.fn.init = function( selector, list, options ){

	"use strict";
	var rquickExpr = /^#([\w-]+)$/,	// A simple way to check for HTML ids

		init = PWord.fn.init = function( selector, list, options ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector || !rquickExpr.test(selector)) {
				throw new Error("The provided selector -"+selector+"- is malformed. Provide a valid id.");
			}

			// If no words are specified, a default list will be 
			// provided as argument.
			this.setWordList( list ? list : [
	    		{ word:"Creative" },
	    		{ word:"Genius", color:"red" },
	    		{ word:"Ninja" },
	    		{ word:"OMG" },
	    		{ word:"Fabulous" }
	    	] );

			// Return PWord object.
	    	return this;
		};

	// Give the init function the PWord prototype for later instantiation
	init.prototype = PWord.fn;

	return new init(selector, list, options);
};