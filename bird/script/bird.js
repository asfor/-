var birdObj = function(){
	this.y;
	this.context;
	this.imgs = [];
	this.wing_delta;
	this.img_tab;
	this.wing_speed;
	this.down_speed;
	this.G;
	this.img_num;
}

birdObj.prototype.init = function(ctx){
	this.context = ctx;
	this.img_tab = 0;
	this.wing_delta = 0;
	this.wing_speed = 100;
	this.down_speed = 0;
	this.G = 0.0018;
	this.img_num = 4;

	for(var i = 0; i < this.img_num; i++){
		this.imgs[i] = new Image();
		this.imgs[i].src = "./img/bird" + i +".png";
	}
	this.y = 177.5;	//(background.BG_img.height - this.imgs[0].height) * 0;
}

birdObj.prototype.draw = function(delta){
	this.wing_delta += delta;
	if(this.wing_delta > this.wing_speed){
		this.img_tab = ++this.img_tab % this.img_num;
		this.wing_delta = 0;
	}
	if(this.y < can_height - 30 * 2)	//if(this.y < can_height - this.imgs[0].height * 2)
	this.y += this.down_speed *delta;
	this.down_speed += delta * this.G;

	this.context.drawImage(this.imgs[this.img_tab], (background.BG_img.height - this.imgs[0].height) * 0.5, this.y);
}
