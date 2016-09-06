var fruitObj = function(){
	this.alive = [];
	this.x = [];
	this.y = [];
	this.l = [];
	this.speed = [];
	this.col = [];
	this.vsbFruit = 15;	//页面需要的果实数
	this.trueFruit = 0;	//真实拥有的果实数
	this.blueChance = 0.08;//蓝果实概率
	this.aneID = [];
	this.red = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
	this.red.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";

	for(var i = 0; i < this.num; i++)
	{this.alive[i] = false;}
}

fruitObj.prototype.draw = function(){
	for(var i = 1; i <= this.num; i++){
		if(this.alive[i]){
			var pic;

			if(this.col[i] < this.blueChance)
				{pic = this.blue;}
			else
				{pic = this.red;}

			if(this.l[i] < 13){
				if(deltaTime > 40)
					this.l[i] += 4;
				else
					this.l[i] += (this.speed[i] - 0.01) * deltaTime;
				this.x[i] = ane.headX[this.aneID[i]];
				this.y[i] = canHeight - ane.y[this.aneID[i]];
			}
			else
				{this.y[i] -= this.speed[i] * deltaTime;}
			context2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
		}

		if(this.y[i] < 5)
		{this.dead(i);}
	}
}

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;this.trueFruit--;
}

fruitObj.prototype.birth = function(i){
	this.aneID[i] = Math.floor(ane.num * Math.random());
	this.l[i] = 0;
	this.speed[i] = 0.015 + 0.025 * Math.random(); //[0.01,0.035)
	this.col[i] = Math.random();

	this.alive[i] = true;
}

fruitObj.prototype.team = function(){
	while(this.trueFruit < this.vsbFruit){
		for(var i = 0; i < this.num; i++){
			if(!this.alive[i])
			{this.birth(i);this.trueFruit++;break;}
		}
	}
}