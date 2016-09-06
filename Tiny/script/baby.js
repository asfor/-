var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	
	this.eye = [];
	this.eyeNum;
	this.eyeDelta;
	this.eyeKeep;
	
	this.body = [];
	this.bodyNum;
	this.bodyDelta;

	this.tail = [];
	this.tailNum;
	this.tailDelta;
}

babyObj.prototype.init = function(){
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
	for(var i = 0; i <= 1; i++){
		this.eye[i] = new Image();
		this.eye[i].src = "./src/babyEye" + i + ".png";
	}

	for(var i = 0; i <= 19; i++){
		this.body[i] = new Image();
		this.body[i].src = "./src/babyFade" + i + ".png";
	}

	for(var i = 0; i <= 7; i++){
		this.tail[i] = new Image();
		this.tail[i].src = "./src/babyTail" + i + ".png";
	}

	this.eyeNum = 0;
	this.eyeDelta = 0;
	this.eyeKeep = this.keepTime(0);

	this.bodyNum = 0;
	this.bodyDelta = 0;

	this.tailNum = 0;
	this.tailDelta = 0;
}

babyObj.prototype.keepTime = function(i){
	if(!i)	return Math.random() * 1500 + 2000;
	else	return 200;
}

babyObj.prototype.draw = function(){
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);
	var deltaX = mom.x - this.x;
	var deltaY = mom.y - this.y;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-PI,PI
	this.angle = lerpAngle(beta, this.angle, 0.6);

	this.eyeDelta += deltaTime;
	if (this.eyeDelta > this.eyeKeep){
		this.eyeNum = (this.eyeNum + 1) % 2;
		this.eyeDelta = 0;
		this.eyeKeep = this.keepTime(this.eyeNum);
	}

	this.bodyDelta += deltaTime;
	if (this.bodyDelta > 200){
		if(this.bodyNum < 19)
			{this.bodyNum += 1;}
		else
			{this.bodyNum = 19;data.gameOver = true;}
		this.bodyDelta = 0;
	}

	this.tailDelta += deltaTime;
	if (this.tailDelta > 50){
		this.tailNum = (this.tailNum + 1) % 8;
		this.tailDelta = 0;
	}

	context1.save();

	context1.translate(this.x, this.y);
	context1.rotate(this.angle);
	context1.drawImage(this.tail[this.tailNum], -this.tail[this.tailNum].width * 0.5 + 23, -this.tail[this.tailNum].height * 0.5);
	context1.drawImage(this.body[this.bodyNum], -this.body[this.bodyNum].width * 0.5, -this.body[this.bodyNum].height * 0.5);
	context1.drawImage(this.eye[this.eyeNum], -this.eye[this.eyeNum].width * 0.5, -this.eye[this.eyeNum].height * 0.5);
	// console.log(this.eyeNum+"   "+this.eyeKeep);
	context1.restore();
}