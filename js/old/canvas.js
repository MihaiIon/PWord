/****************************************************************
*****************************************************************

	Canvas

*****************************************************************
*****************************************************************
****************************************************************/

/*
 *	OnLoad
 *
 ****************************************/

$(document).ready(function(){
	$("#canvas").on("tap",function(){ wordDisplayController();});
	canvas = new Canvas('canvas', 'particles-controller');
	generateWord("zoro", "rgb(0,100,500)");
	particlesLoop(); 
});


/*
 *	Canvas
 *
 ****************************************/

function Canvas(canvasId, controllerId){
	this.e = $('#'+canvasId)[0];
	this.ctx = this.e.getContext("2d");
	this.sInfo = new ScreenInfo();
	this.e.width = this.sInfo.innerWidth;
	this.e.height = this.sInfo.viewHeight;
	this.center = new Center(this.e.height, this.e.width);
	this.controller = $('#'+controllerId);
}

Canvas.prototype.adjustSize = function(){
 	this.sInfo = new ScreenInfo();
 	this.e.width = this.sInfo.innerWidth;
	this.e.height = this.sInfo.viewHeight;
	this.center.x = Math.floor(this.width/2);
 	this.center.y = Math.floor(this.height/2);
};

Canvas.prototype.refreshCanvas = function(){
	this.ctx.clearRect(0, 0, this.e.width, this.e.height);
};

Canvas.prototype.print = function(){
	console.log(
		"object", 
		this.sInfo.viewHeight, 
		this.sInfo.innerWidth, 
		this.sInfo.innerPadding, 
		this.e.width, 
		this.e.height,
		this.center.x,
		this.center.y
	);
};


/*
 *	ScreenInfo
 *
 ****************************************/

function ScreenInfo(){
	this.viewHeight   = this.getViewHeight();
	this.innerWidth   = this.getInnerWidth();
	this.innerPadding = this.getInnerPadding();
}

ScreenInfo.prototype.getViewHeight = function(){
	var _viewHeight = $('.fp-tableCell').css('height');
	return _viewHeight.substring(0, _viewHeight.length-2);
};

ScreenInfo.prototype.getInnerWidth = function(){
	var _innerWidth = $('.inner').css('width');
	return _innerWidth.substring(0, _innerWidth.length-2);
};

ScreenInfo.prototype.getInnerPadding = function(){
	var _innerPadding = $('.inner').css('padding-top');
	return _innerPadding.substring(0, _innerPadding.length-2);
};


/*
 *	Center
 *
 ****************************************/

 function Center(height, width){
 	this.x = Math.floor(width/2);
 	this.y = Math.floor(height/2);
 }



/*
 *	System
 *
 ***********************************************/

// Containers
var LETTERS  = [];
var PARTICLES = [];

// DEFAULT SETTINGS
var PARTICLE_DIMENSION = 5;
var PARTICLE_SPEED = 2;
var PARTICLE_ACCELERATION = 3;

// To be determined
var STARTING_POINT_X, STARTING_POINT_Y, WORD_PIXEL_LENGTH;
var SPACE_BETWEEN_LETTERS = 60;
;
// Used for sinus and cosinus rotation
var COUNTER = 0;


var generateWord = function(word, color){
	
	// Clear PARTICLES
	PARTICLES = [];	

	// Adjust display settings
	WORD_PIXEL_LENGTH = 5*PARTICLE_DIMENSION*word.length
					  + (SPACE_BETWEEN_LETTERS-5*PARTICLE_DIMENSION)*(word.length-1)

	STARTING_POINT_X  = canvas.center.x - Math.floor(WORD_PIXEL_LENGTH/2);
	STARTING_POINT_Y  = canvas.center.y - Math.floor(5*PARTICLE_DIMENSION);

	canvas.controller.css({
		"left":   STARTING_POINT_X+"px",
		"top": 	  STARTING_POINT_Y+"px",
		"width":  WORD_PIXEL_LENGTH+"px",
		"height": 5*PARTICLE_DIMENSION+"px"
	});



	// Generate Letter
	var _letter;

	for (var i = 0; i < word.length; i++) {
		
		_letter = getLetter(word.charAt(i));

		for (var j = 0; j < 25; j++)
			if (_letter[j] == 1)
				PARTICLES.push(
					new Particle(	STARTING_POINT_X + i*SPACE_BETWEEN_LETTERS + (j%5)*PARTICLE_DIMENSION,
									STARTING_POINT_Y + Math.floor(j/5)*PARTICLE_DIMENSION,
									color )
				);
	}

	// Generate Decoration Particles
	for (var  i= 0; i < 25; i++)
		PARTICLES.push(
			new Particle(	STARTING_POINT_X + Math.floor(Math.random()*WORD_PIXEL_LENGTH*1.1 - WORD_PIXEL_LENGTH*0.1),
							STARTING_POINT_Y,
							color,
							true )
		);
}

var particlesLoop = function(){
		COUNTER++;
		canvas.refreshCanvas();
		renderParticles();
		setTimeout(function(){ particlesLoop() }, 20);
};

var renderParticles = function(){
	for (var i = 0; i < PARTICLES.length; i++){

		canvas.ctx.beginPath();
		

		if (PARTICLES[i].isHovered && PARTICLES[i].position.getDeltaX("initial") == 0) {
			canvas.ctx.fillStyle = PARTICLES[i].color.getRGB();
			canvas.ctx.rect( PARTICLES[i].position.initialX, PARTICLES[i].position.initialY, PARTICLE_DIMENSION, PARTICLE_DIMENSION);
		}

		
		else{
			
			if (PARTICLES[i].isFloating || PARTICLES[i].isFake) PARTICLES[i].floatInSpace();
			else if (PARTICLES[i].isHovered) PARTICLES[i].moveTo("initial");
			else {
				//console.log("PARTICLES["+i+"] : " + PARTICLES[i].toString());
				PARTICLES[i].moveTo("floating");
			}

			canvas.ctx.fillStyle = PARTICLES[i].color.getRGBA();
			canvas.ctx.rect(
				PARTICLES[i].position.x, 
				PARTICLES[i].position.y, 
				PARTICLES[i].scaleVariation*PARTICLE_DIMENSION, 
				PARTICLES[i].scaleVariation*PARTICLE_DIMENSION
			);			
		}
		
		canvas.ctx.fill();
		canvas.ctx.closePath();
	}
};



/*
 *	Particles Controller
 *
 ***********************************************/

var wordDisplayController = function(){
	for (var i = 0; i < PARTICLES.length; i++) {
		if (!PARTICLES[i].isFake) {
			if (PARTICLES[i].isFloating) PARTICLES[i].isFloating = false;
			PARTICLES[i].isHovered = !PARTICLES[i].isHovered;
		}
	}
}

var animationController = function(){
	for (var i = 0; i < PARTICLES.length; i++) {
		if (PARTICLES[i].index != 0) {
			if (PARTICLES[i].isFloating) PARTICLES[i].isFloating = false;
			PARTICLES[i].isHovered = !PARTICLES[i].isHovered;
		}
	}
}
