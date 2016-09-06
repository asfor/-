var floorObj = function() {
	this.x;
	this.context;
	this.floor_img = new Image();
	this.loop_num;
}

floorObj.prototype.init = function(ctx) {
	this.x = 0;
	this.context = ctx;
	this.floor_img.src = "./img/floor.jpg";
	this.loop_num = 38;
}

floorObj.prototype.draw = function(delta) {
	this.x = (this.x - delta * 0.1) % this.loop_num;
	this.context.drawImage(this.floor_img, this.x, background.BG_img.height);
}