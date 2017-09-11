define( function(){
	
	function draw( g, p, d ) {
		for (var i = 0; i < p.length; i++) 
	    {
	    	//
	    	p[i].consumeEffects();
	    	 
	    	// Draw Particle.
			g.beginFill("0x"+p[i].color, 1);
			g.fillAlpha = p[i].opacity;
			g.drawRect(
				p[i].current.x - p[i].size/2, 
				p[i].current.y - p[i].size/2, 
				p[i].size, 
				p[i].size
			);

			// Move Particle
			p[i].move(d);
		}
	}

	return function() {
		var _this = this;
		this.app.ticker.add(function( delta ){
			// Aliasas.
			var _g  = _this.graphics,
				_pM = _this.particles.main,
				_pF = _this.particles.fake;

			// Clear the graphics.
			_g.clear();

			// Draw particles.
		    draw( _g, _pM, delta );
			draw( _g, _pF, delta );
		    
			// Print the graphics on the canvas.
			_this.app.stage.addChild(_g);
		});
	};
} );