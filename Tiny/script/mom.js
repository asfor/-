var momObj = function(){
	this.x;
	this.y;
	this.angle;

	this.eye = [];
	this.eyeNum;
	this.eyeDelta;
	this.eyeKeep;

	this.bodyRed = [];
	this.bodyBlue = [];
	this.bodyNum;

	this.tail = [];
	this.tailNum;
	this.tailDelta;
}

momObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	
	for(var i = 0; i <= 1; i++){
		this.eye[i] = new Image();
		this.eye[i].src = "./src/bigEye" + i + ".png";
	}

	for(var i = 0; i <= 7; i++){
		this.bodyRed[i] = new Image();
		this.bodyBlue[i] = new Image();
		
		this.bodyRed[i].src = "./src/bigSwim" + i + ".png";
		this.bodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
	}

	for(var i = 0; i <= 7; i++){
		this.tail[i] = new Image();
		this.tail[i].src = "./src/bigTail" + i + ".png";
	}

	this.eyeNum = 0;
	this.eyeDelta = 0;
	this.eyeKeep = this.keepTime(0);

	this.bodyNum = 0;
	// this.bodyDelta = 0;

	this.tailNum = 0;
	this.tailDelta = 0;
}

momObj.prototype.keepTime = function(i){
	if(!i)	return Math.random() * 1500 + 2000;
	else	return 200;
}

momObj.prototype.draw = function(){
	this.x = lerpDistance(mx, this.x, 0.99);
	this.y = lerpDistance(my, this.y, 0.99);
	var deltaX = mx - this.x;
	var deltaY = my - this.y;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-PI,PI
	this.angle = lerpAngle(beta, this.angle, 0.6);

	this.eyeDelta += deltaTime;
	if (this.eyeDelta > this.eyeKeep){
		this.eyeNum = (this.eyeNum + 1) % 2;
		this.eyeDelta = 0;
		this.eyeKeep = this.keepTime(this.eyeNum);
	}

	this.tailDelta += deltaTime;
	if (this.tailDelta > 50){
		this.tailNum = (this.tailNum + 1) % 8;
		this.tailDelta = 0;
	}

	context1.save();

	context1.translate(this.x, this.y);
	context1.rotate(this.angle);
	context1.drawImage(this.tail[this.tailNum], -this.tail[this.tailNum].width * 0.5 + 30, -this.tail[this.tailNum].height * 0.5);
	if(data.double == 1)
		{context1.drawImage(this.bodyRed[this.bodyNum], -this.bodyRed[this.bodyNum].width * 0.5, -this.bodyRed[this.bodyNum].height * 0.5);}
	else
		{context1.drawImage(this.bodyBlue[this.bodyNum], -this.bodyBlue[this.bodyNum].width * 0.5, -this.bodyBlue[this.bodyNum].height * 0.5);}
	context1.drawImage(this.eye[this.eyeNum], -this.eye[this.eyeNum].width * 0.5, -this.eye[this.eyeNum].height * 0.5);

	context1.restore();
}