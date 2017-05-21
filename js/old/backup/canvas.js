// Title - Canvas

/*
 * The PIXI__Canvas object containing all the objects, methods, 
 * properties and informations related to the animated canvas. 
 * The canvas is initialized when the web browser has loaded all the
 * content on the website.
 * 
 * This canvas is powered by the PIXI library.
 */
var PIXI__Canvas;


// Title - Onload

$( document ).ready(function(){

 PIXI__Canvas = {
 
  /*
   * jQuery element pointing to the DIV that will contain the 
   * canvas.
   */
  $e : $('#canvas-container--particles'), 
	
	
  /*
   * Contains informations on the size of the actual viewport (width,
   * height, etc). Those informations are used to size the canvas
   * to fit nicely in the user's web browser.
   */
   screenInfo : new ScreenInfo(),	
	
	
  /* 
   * PIXI :
   *
   * You can use either `new PIXI.WebGLRenderer`, `new 
   * PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
   * which will try to choose the best renderer for the environment 
   * you are in.
   */ 
		 renderer : new PIXI.WebGLRenderer(
		  this.screenInfo.width, 
		  this.screenInfo.height
		 ),
		 
		 
  /*
   * The stage is the root container that will hold all the elements 
   * to be drawn.
   */
		 stage : new PIXI.Container(),
		 
		 
  /* 
   * The renderer will create a canvas element that will be inserted 
   * into the DOM.
   */
   append : function() {
    this.$e.append(this.renderer.view);
   },
   
   
  /*
   * Resizes the canvas to fit the new viewport. The resize is called
   * when the user finished changing the size of it's browser.
   */
   resize : function() {
    this.screenInfo = new ScreenInfo();
    this.renderer.view.style.width = this.screenInfo.width + "px";
    this.renderer.view.style.height = this.screenInfo.height + "px";
   },
   
   
   /*
    * Contains all the resources/elements that will be animated
    * in the canvas.
    */
   resources : {
   
   },
   
   
   /*
    *
    */
   load : function(){
    PIXI.loader.load(function (loader, resources) {
     
     
     
     // -- Kick off the animation loop (defined below) 
     this.animate();
    })
   },
   
   
   /*
    *
    */
   animate : function(){
   
   }
	};
});
