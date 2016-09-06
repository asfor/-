var haloObj = function(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}
haloObj.prototype.num = 5;
haloObj.prototype.init = function(){
	for(var i = 0; i < this.num; i++)
		this.alive[i] = false;
}

haloObj.prototype.draw = function(){
	context1.save();

	context1.lineWidth = 3;
	context1.shadowBlur = 10;
	for(var i = 0; i < this.num; i++){
		if(this.alive[i]){
			this.r[i] += deltaTime * 0.05;
			if(this.r[i] > 100)
				{this.alive[i] = false;break;}
			var alpha = 1 - this.r[i] / 100;

			context1.beginPath();
			context1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			context1.closePath();
			context1.strokeStyle = "rgba(203, 91, 45, " + alpha + ")";
			context1.stroke();
		}
	}

	context1.restore();
}

haloObj.prototype.born = function(x, y){
	for(var i = 0; i < this.num; i++) {
		if(!this.alive[i]){
			this.alive[i] = true;
			this.x[i] = x;
			this.y[i] = y;
			this.r[i] = 10;
			return;
		}
	}
}