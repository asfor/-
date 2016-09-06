//画布
var can1;
var can2;
//画布长宽
var canWidth;
var canHeight;
//画笔
var context1;
var context2;
//背景地址
var bg = new Image();
//海葵对象
var ane;
//果实对象
var fruit;
//鱼麻麻
var mom;
//鱼宝宝
var baby;
//计时
var now;
var deltaTime;
var lastTime;
//分数
var data;
//鼠标坐标
var mx;
var my;
//果实波纹
var wave;
//kiss光环
var halo;
//漂浮物
var dust;

document.body.onload = reset;

function reset(){
	init();
	gameloop();
}

function init(){
	can1 = document.getElementById("can1");//动态物体
	can2 = document.getElementById("can2");//静态摆动
	context1 = can1.getContext("2d");
	context2 = can2.getContext("2d");

	context1.font = "30px Verdana";
	context1.textAlign = "center";

	can1.addEventListener("mousemove", onMouseMove, false);
	
	bg.src = "./src/background.jpg";
	
	canWidth = can1.width;
	canHeight = can1.height;
	
	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	data = new dataObj();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	dust = new dustObj();
	dust.init();

	lastTime = Date.now();
}

function gameloop(){
	// window.requestAnimFrame(gameloop);
	now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	drawBG();
	ane.draw();
	momEatFruit();
	momKissBaby();
	fruit.team();

	context1.clearRect(0, 0, canWidth, canHeight);

	fruit.draw();
	mom.draw();
	baby.draw();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onMouseMove(event){
	if(!data.gameOver){
		if(event.offSetx || event.layerX){
			mx = event.offSetx == undefined ? event.layerX : event.offSetx;
			my = event.offSety == undefined ? event.layerY : event.offSety;
		}
	}
}