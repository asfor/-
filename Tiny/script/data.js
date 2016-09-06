var dataObj = function(){
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.alpha = 0.2;
	this.fruitScore = 100;
	this.gameOver = false;
}
dataObj.prototype.reset = function(){
	this.score += this.fruitNum * this.double * this.fruitScore;
	this.fruitNum = 0;
	this.double = 1;
}
dataObj.prototype.draw = function(){
	var w = can1.width;
	var h = can1.height;

	context1.save();

	context1.shadowBlur = 10;
	context1.shadowColor = "white";
	context1.fillStyle = "white";
	context1.fillText("Score:" + this.score, w * 0.5, h - 30);

	if(this.gameOver){
		this.alpha += 0.0005 * deltaTime;
		if (this.alpha > 1)	  this.alpha = 1;
		context1.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
		context1.font = "50px Verdana";
		context1.fillText("Game Over", w * 0.5, h * 0.5);
	}

	context1.restore();
}