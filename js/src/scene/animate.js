define( [
	"model/particle"
], function( Particle ){
	
	return function() {
		var _this = this;
		this.app.ticker.add(function( delta ){
			// Aliasas.
			var _g  = _this.graphics,
				_pM = _this.particles.main,
				_pF = _this.particles.fake;

			// Clear the graphics.
			_g.clear();

			// Draw MAIN particles.
		    for (var i = 0; i < _pM.length; i++) 
		    {
		    	// Draw Particle.
				_g.beginFill("0x"+_pM[i].color, 1);
				_g.fillAlpha = _pM[i].opacity;
				_g.drawRect(
					_pM[i].current.x - _pM[i].size/2, 
					_pM[i].current.y - _pM[i].size/2, 
					_pM[i].size, 
					_pM[i].size
				);

				// Move Particle
				_pM[i].move(delta);
				_pM[i].consumeEffects();
			}

			// Draw DECO particles.
		    for (var i = 0; i < _pF.length; i++) 
		    {
		    	// Draw Particle.
				_g.beginFill("0x"+_pF[i].color, 1);
				_g.fillAlpha = _pF[i].opacity;
				_g.drawRect(
					_pF[i].current.x - _pF[i].size/2, 
					_pF[i].current.y - _pF[i].size/2, 
					_pF[i].size, 
					_pF[i].size
				);

				// Move Particle
				_pF[i].move(delta);
				_pF[i].consumeEffects();
			}

			// Print the graphics on the canvas.
			_this.app.stage.addChild(_g);
		});
	};
} );