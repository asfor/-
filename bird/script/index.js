var canvas;		//画布
var context;	//画笔
var can_width;	//画布宽度
var can_height;	//画布高度
var background;	//背景
var floor;		//地板
var bird;		//鸟
var pillar;		//柱子
var nowTime;	//现在时间
var lastTime;	//上一次记录时间
var deltaTime;	//间隔时间

document.body.onload = main();

function main() {
	init();
	repeat();
}

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	can_width = canvas.width;
	can_height = canvas.height;

	canvas.addEventListener("click", onclick, false);

	background = new BG();
	background.init(context);

	floor = new floorObj();
	floor.init(context);

	bird = new birdObj();
	bird.init(context);

	pillar = new pillarObj();
	pillar.init(context, can_height);

	lastTime = Date.now();
}

function repeat(){
	window.requestAnimFrame(repeat);

	nowTime = Date.now();
	deltaTime = nowTime - lastTime;
	lastTime = nowTime;

	context.clearRect(0, 0, can_width, can_height);

	background.draw();
	floor.draw(deltaTime);
	bird.draw(deltaTime);
	pillar.draw(deltaTime);
}

function onclick(){
	bird.down_speed = -0.55;
}