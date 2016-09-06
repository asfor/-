//保存单个组合为7的类
var Group = function(){
	this.x = [];
	this.y = [];
	this.i = 0;
}
Group.prototype.push = function(x, y){
	this.x[this.i] = x;
	this.y[this.i] = y;
	this.i++;
}
Group.prototype.display = function(){
	for(var i=0;i<this.i;i++){
		console.log(this.x[i]+"   "+this.y[i]);
	}
}

var save = new Group();	//实例化Group类
var x;					//满桶数
var y;					//半桶数

//求出所有单个组合为7的分配方式
for(x = 0; x < 4; x++)
{
	for(y = 0; y <= 7; y++)
	{
		if((2*x + y == 7) && (x + y <= 7))
		{save.push(x,y);}
	}
}

//单个分配方式组合
for(var i = 0; i < save.i; i++)
{
	for(var j = 0; j < save.i; j++)
	{
		if((save.x[i] + save.x[j] <= 7) && (save.y[i] + save.y[j] <= 7) && (save.x[i] + save.x[j] + save.y[i] + save.y[j] >= 7))
		{
			console.log("    满桶  半桶  空桶");
			console.log("老大"+save.x[i]+"     "+save.y[i]+"     "+(7-save.x[i]-save.y[i]));
			console.log("老二"+save.x[j]+"     "+save.y[j]+"     "+(7-save.x[j]-save.y[j]));
			console.log("老三"+(7-save.x[i]-save.x[j])+"     "+(7-save.y[i]-save.y[j])+"     "+(save.x[i]+save.x[j]+save.y[i]+save.y[j]-7));
			console.log("-----------------");
		}
	}
}