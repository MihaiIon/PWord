/*
 * Provides information on the DOM element that contains the canvas. 
 *
 * Those informations are used to size the canvas
 * to fit nicely in the user's web browser.
 */	
PWord.fn.DOMElement = {

    /*
     * Selector pointing to the DOM element that will contain the 
     * canvas.
     */
    selector: null,

    /*
     *  Returns the size of the container.
     */
    getDimens: function(){
		var e = document.getElementById(this.selector); 
		return {
			width: e.offsetWidth,
			height: e.offsetHeight
		};
	}
};