function numbersObj() {
	this.num = [];	//数字矩阵缓存
	this.x;			//绘制x轴起点
	this.y;			//绘制y轴起点
	this.r;			//绘制圆球半径
	this.margin;	//边距
}

numbersObj.prototype.init = function() {
	this.r = 8;
	this.margin = 2 * (this.r+1);
}

numbersObj.prototype.draw = function(num, x, y, ctx) {
	this.num = digit[num];

	ctx.save();

    ctx.fillStyle = "rgb(0,102,153)";

	for(var arr in digit[num])
		for(var index in digit[num][arr])
			if(digit[num][arr][index]) {
				ctx.beginPath();
				ctx.arc(x + index * this.margin, y + arr * this.margin, this.r, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
			}

	ctx.restore();
};