var BG = function(){
	this.context;
	this.BG_img = new Image();
}

BG.prototype.init = function(ctx){
	this.context = ctx;
	this.BG_img.src = "./img/bg.jpg";
}

BG.prototype.draw = function(){
	this.context.drawImage(this.BG_img, 0, 0);
}