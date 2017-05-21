/*
 * Resizes the canvas to fit the new viewport. The resize is called
 * when the user finished changing the size of it's browser.
 */
PWord.fn.resize = function() {
	var d = this.DOMElement.getDimens();
	this.renderer.view.style.width = d.width + "px";
	this.renderer.view.style.height = d.height + "px";
};