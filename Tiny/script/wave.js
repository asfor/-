var waveObj = function(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
	this.vsbWave = 0;	//页面需要的波纹数
	this.trueWave = 0;	//真实拥有的波纹数
}

waveObj.prototype.num = 10;
waveObj.prototype.init = function(){
	for(var i = 0; i < this.num; i++)
		this.alive[i] = false;
}

waveObj.prototype.draw = function(){
	context1.save();
	
	context1.lineWidth = 2;
	context1.shadowBlur = 10;
	for(var i = 0; i < this.num; i++){
		if(this.alive[i]){
			this.r[i] += deltaTime * 0.05;
			if(this.r[i] > 50)
				{this.alive[i] = false;break;}
			var alpha = 1 - this.r[i] / 50;

			context1.beginPath();
			context1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			context1.closePath();
			context1.strokeStyle = "rgba(255, 255, 255, " + alpha + ")";
			context1.stroke();
		}
	}

	context1.restore();
}

waveObj.prototype.born = function(x, y){
	for(var i = 0; i < this.num; i++){
		if(!this.alive[i]){
			this.alive[i] = true;
			this.x[i] = x;
			this.y[i] = y;
			this.r[i] = 10;
			return;
		}
	}
}