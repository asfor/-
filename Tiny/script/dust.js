var dustObj = function(){
	this.x = [];
	this.y = [];
	this.amp = [];
	this.NO = [];
	this.img = [];
	this.alpha;
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function(){
	for(var i = 0; i < 7; i++){
		this.img[i] = new Image();
		this.img[i].src = "./src/dust" + i + ".png";
	}

	for(var i = 0; i < this.num; i++){
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = Math.random() * 20 + 15;
		this.NO[i] = Math.floor(Math.random() * 7);
	}
	this.alpha = 0;
}

dustObj.prototype.draw = function(){
	this.alpha += deltaTime * 0.0015;
	var l = Math.sin(this.alpha);

	for(var i = 0; i < this.num; i++)
		{context1.drawImage(this.img[this.NO[i]], this.x[i] - this.amp[i] * l, this.y[i]);}
}