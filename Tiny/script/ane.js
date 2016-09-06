var aneObj = function(){
	this.x = [];	//根部横向坐标
	this.y = [];	//海葵高度
	this.headX = [];//头部横行坐标
	this.alpha = 0;	//相位
	this.amp = [];	//振幅
}

aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
	for(var i = 0;i < this.num;i++){
		this.x[i] = 16*i + Math.random()*20;
		this.y[i] = 200 + Math.random()*80;
		this.headX[i] = this.x[i];
		this.amp[i] = 30 + Math.random()*50;
	}
}

aneObj.prototype.draw = function(){
	context2.save();
	context2.globalAlpha = 0.6;
	context2.strokeStyle = "#3b164e";
	context2.lineWidth = "20";
	context2.lineCap = "round";

	for(var i = 0;i < this.num; i++){
		this.alpha += deltaTime * 0.00003;
		var l = Math.sin(this.alpha); //频率
		this.headX[i] = this.x[i] - l * this.amp[i];

		context2.beginPath();
		context2.moveTo(this.x[i],canHeight);
		context2.quadraticCurveTo(this.x[i], canHeight - this.y[i] * 0.5, this.headX[i], canHeight - this.y[i]);
		// context2.lineTo(this.x[i],canHeight - this.y[i]);
		context2.stroke();
	}
	context2.restore();
}