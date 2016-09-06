var pillarObj = function(){
	this.context;
	this.can_height;
	this.pillar_num;	//同时出现柱子个数
	this.pillar_range;	//柱子的上下范围
	this.x;
	this.y = [];
	this.distance_x;	//水平柱子间距
	this.distance_y;	//垂直柱子间距的一半
	this.img = new Image();
	this.img_height;
	this.img_width;
}

pillarObj.prototype.init = function(ctx, can_height){
	this.context = ctx;
	this.can_height = can_height;
	this.pillar_num = 3;
	this.pillar_range = 0.6;
	this.x = 400;
	
	this.y[0] = this.can_height / 2;
	for(var i = 1; i < this.pillar_num; i++)
		this.reset_Y(i);

	this.distance_x = 180;
	this.distance_y = 70;
	this.img.src = "./img/obstacle.jpg";
}

pillarObj.prototype.draw = function(delta) {
	if(!this.img_width) {
		this.img_height = this.img.height;
		this.img_width = this.img.width;
		// console.log(this.img_width+"   "+this.img_height);
	}

	this.x -= delta * 0.1;

	for(var i = 0; i < this.pillar_num * 2; i++) {
		var num = Math.floor((i / 2));
		var img_x = this.x + num * this.img_width + num * this.distance_x;
		var img_y = (i % 2 == 0) ? (this.y[num] - (this.distance_y + this.img_height)) : (this.y[num] + this.distance_y);
		this.context.drawImage(this.img, img_x, img_y);
		// console.log(i +"  "+ ((i % 2 == 0) ? (this.y[num] - (this.distance_y + this.img_height)) : (this.y[num] + this.distance_y)));
	}
}

pillarObj.prototype.reset_Y = function(num) {
	this.y[num] = Math.floor(Math.random() * this.can_height * this.pillar_range) + (0.5 - this.pillar_range / 2) * this.can_height;
	// console.log(num + "   " + this.y[num]);
}