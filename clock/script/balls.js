function ballsObj() {
	this.balls = [];	//小球数组
	this.r;				//小球半径
	this.margin;		//左边距
	this.friction;		//碰撞摩擦系数
	this.delay;			//延时系数
}

ballsObj.prototype.init = function() {
	this.r = 8;
	this.margin = 2 * (this.r+1);
	this.friction = 0.6;
	this.delay = 0.03;
}

ballsObj.prototype.addBall =  function(arr_of_num, offset) {
	for(var arr in arr_of_num)
		for(var index in arr_of_num[arr])
			if(arr_of_num[arr][index])
			this.balls.push({
				x: margin_left + offset * (numbers.r+1) + index * this.margin,
				y: margin_top + arr * this.margin,
				g: 1.5 + Math.random(),
				vx: Math.pow(-1, Math.ceil(Math.random() * 2)) * 4,
				vy: -5,
				//这个colors写在balls.js怎么都获取不到, 坑爹
				color: colors[Math.floor(Math.random() * colors.length)]
			});
};

ballsObj.prototype.update = function(time) {
	time *= this.delay;

	for(var index in this.balls) {
		this.balls[index].x += this.balls[index].vx * time;
		this.balls[index].y += this.balls[index].vy * time;
		this.balls[index].vy += this.balls[index].g * time;

		if(this.balls[index].y > can.height - this.r) {
			this.balls[index].y = can.height - this.r;
			this.balls[index].vy = -this.balls[index].vy * this.friction;
		}
		if(this.balls[index].x < -this.r || this.balls[index].x > can.width + this.r)
			this.balls.splice(index, 1);
	}
};

ballsObj.prototype.draw = function(ctx) {
	for(var index in this.balls) {
    	ctx.fillStyle = this.balls[index].color;
    	ctx.beginPath();
		ctx.arc(this.balls[index].x, this.balls[index].y, this.r, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
};