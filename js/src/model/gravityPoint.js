PWord.fn.GravityPoint = function(
	minFloatingDist, maxFloatingDist, 
	minRadiusDist, maxRadiusDist) {
	
	// 
	var delta = maxFloatingDist-minFloatingDist;
	this.floatX = minFloatingDist + (Math.random()*delta*(Math.random()>0.5 ? 1 : -1));
	this.floatY = minFloatingDist + (Math.random()*delta*(Math.random()>0.5 ? 1 : -1));

	// 
	delta = maxRadiusDist-minRadiusDist;
	this.floatingRadius = minRadiusDist + (Math.random()*delta*(Math.random()>0.5 ? 1 : -1));
};
	

