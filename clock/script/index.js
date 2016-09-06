var can;		//画布
var ctx;		//画笔
var numbers;	//数字绘画对象
var balls;		//小球绘画对象
var hours;		//时
var minutes;	//分
var seconds;	//秒
var margin_top;	//顶部距离
var margin_left;//左边距离
var now;		//现在时间
var deltaTime;	//间隔时间
var lastTime;	//上次时间
var sumTime;	//累加时间
var colors;		//颜色数组

window.onload = reset;

function reset() {
	init();		//初始化
	start();	//开始绘制
}

function init() {
	can = document.getElementById('can');
	can.width = 1024;
    can.height = 550;
	ctx = can.getContext('2d');

	numbers = new numbersObj();
	numbers.init();

	balls = new ballsObj();
	balls.init();

	colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

	hours = 12;
	minutes = 34;
	seconds = 56;

	margin_top = 60;
	margin_left = 30;

	sumTime = 0;
	lastTime = Date.now();
}

function start() {
	window.requestAnimFrame(start);
	now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	update();

	ctx.clearRect(0, 0, can.width, can.height);

	numbers.draw(Math.floor(hours/10), 	margin_left, margin_top, ctx);
	numbers.draw(hours % 10,			margin_left + 15 * (numbers.r+1), margin_top, ctx);
	numbers.draw(10,		 			margin_left + 30 * (numbers.r+1), margin_top, ctx);
	numbers.draw(Math.floor(minutes/10),margin_left + 39 * (numbers.r+1), margin_top, ctx);
	numbers.draw(minutes % 10, 			margin_left + 54 * (numbers.r+1), margin_top, ctx);
	numbers.draw(10, 		 			margin_left + 69 * (numbers.r+1), margin_top, ctx);
	numbers.draw(Math.floor(seconds/10),margin_left + 78 * (numbers.r+1), margin_top, ctx);
	numbers.draw(seconds % 10, 			margin_left + 93 * (numbers.r+1), margin_top, ctx);

	balls.draw(ctx);
}

function update() {
	if((sumTime += deltaTime) >= 1000) {
		sumTime = 0;
		balls.addBall(digit[seconds%10], 93);
		if(seconds % 10 === 0)	balls.addBall(digit[Math.floor(seconds/10)], 78);
		
		if((seconds -= 1) < 0) {
			seconds = 59;
			balls.addBall(digit[minutes%10], 54);
			if(minutes % 10 === 0)	balls.addBall(digit[Math.floor(minutes/10)], 39);
		
			if((minutes -= 1) < 0) {
				minutes = 59;
				balls.addBall(digit[minutes%10], 15);
				if(minutes % 10 === 0)	balls.addBall(digit[Math.floor(minutes/10)], 0);

				hours--;
			}
		}
	}

	balls.update(deltaTime);
}
