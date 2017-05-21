/*
 *
 */
PWord.fn.load = function(){
	PIXI.loader.load(function ( loader, resources ) {
		     		
   		
   
   		// -- Kick off the animation loop (defined below) 
   		this.animate();
	});
};