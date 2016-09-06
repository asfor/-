// script.js
window.onload = restart;

function restart() {
	var BIRTH_RATE = 0.2;		//初始化生存概率
	var LIVE_MIN = 2;			//存活需要最少邻居数
	var LIVE_MAX = 4;			//存活需要最大邻居数
	var SIZE = 5;				//网格像素
	var SATIETY = 40;			//饥饿阀值
	var HUNGER_DEAD_TIME = 3;	//饿死阀值次数

	var can = document.getElementById('can');
	var ctx = can.getContext('2d');

	var w = can.width = 1200;
	var h = can.height = 600;

	var arr_w = w / SIZE;
	var arr_h = h / SIZE;

	var cell = [[]];

	var iterationNum = 0;

	init();

	function init() {
		ctx.strokeStyle = '#000';
		ctx.fillStyle = '#000';

		ctx.beginPath();

		for(var i = 0; i <= w; i += SIZE) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i, h);
			if(i != w)	cell[0].push({
				alive: false,
				energy: 100,
				hunger: 0
			});
		}

		for(var i = 0; i <= h; i += SIZE) {
			ctx.moveTo(0, i);
			ctx.lineTo(w, i);
			if(i < h - SIZE)	cell.push(cell[0].slice(0));
		}

		ctx.closePath();
		ctx.stroke();

		for(var i = 0; i < arr_h; i++) {
			for(var j = 0; j < arr_w; j++) {
				cell[i][j].alive = (Math.random() < BIRTH_RATE) ? true : false;
				if(cell[i][j].alive)
					ctx.fillRect(j * SIZE, i * SIZE, SIZE, SIZE);
			}
		}

		console.log(cell);
		setInterval(iteration, 500);
	}

	function iteration() {
		// for(var i = 0; i < arr_h; i++) {
		// 	for(var j = 0; j < arr_w; j++) {
		// 		var neighbor = 0;
		// 		var food = 0;

		// 		//邻居个数计算
		// 		if(i != 0) {
		// 			if(!!cell[i-1][j-1] && cell[i-1][j-1].alive)	neighbor++;	else if(!!cell[i-1][j-1] && cell[i-1][j-1].energy != 0)	{cell[i-1][j-1].energy -= 10;food += 10;}
		// 			if(!!cell[i-1][j] && cell[i-1][j].alive)		neighbor++;	else if(!!cell[i-1][j] && cell[i-1][j].energy != 0)		{cell[i-1][j].energy -= 10;food += 10;}
		// 			if(!!cell[i-1][j+1] && cell[i-1][j+1].alive)	neighbor++;	else if(!!cell[i-1][j+1] && cell[i-1][j+1].energy != 0)	{cell[i-1][j+1].energy -= 10;food += 10;}
		// 		}

		// 		if(!!cell[i][j-1] && cell[i][j-1].alive)			neighbor++;	else if(!!cell[i][j-1] && cell[i][j-1].energy != 0)		{cell[i][j-1].energy -= 10;food += 10;}
		// 		if(!!cell[i][j+1] && cell[i][j+1].alive)			neighbor++;	else if(!!cell[i][j+1] && cell[i][j+1].energy != 0)		{cell[i][j+1].energy -= 10;food += 10;}

		// 		if(i != arr_h - 1) {
		// 			if(!!cell[i+1][j-1] && cell[i+1][j-1].alive)	neighbor++;	else if(!!cell[i+1][j-1] && cell[i+1][j-1].energy != 0)	{cell[i+1][j-1].energy -= 10;food += 10;}
		// 			if(!!cell[i+1][j] && cell[i+1][j].alive)		neighbor++;	else if(!!cell[i+1][j] && cell[i+1][j].energy != 0)		{cell[i+1][j].energy -= 10;food += 10;}
		// 			if(!!cell[i+1][j+1] && cell[i+1][j+1].alive)	neighbor++;	else if(!!cell[i+1][j+1] && cell[i+1][j+1].energy != 0)	{cell[i+1][j+1].energy -= 10;food += 10;}
		// 		}

		// 		//个体迭代规则
		// 		if(neighbor < LIVE_MIN)
		// 			dead(i, j);
		// 		else if(neighbor > LIVE_MIN && neighbor <= LIVE_MAX)
		// 			cell[i][j].alive = true;
		// 		else if(neighbor > LIVE_MAX)
		// 			dead(i, j);

		// 		// cell[i][j].energy += food;
		// 		// if(food < SATIETY)	cell[i][j].hunger++;
		// 		// if(cell[i][j].hunger == HUNGER_DEAD_TIME)
		// 		// 	dead(i, j);
		// 	}
		// }

		//整体突变
		// if((iterationNum = (++iterationNum)%5) == 0) {
		// 	for(var i = 0; i < 10000; i++) {
		// 		var changeX = Math.floor(Math.random() * arr_w);
		// 		var changeY = Math.floor(Math.random() * arr_h);
		// 		cell[changeY][changeX].alive = !cell[changeY][changeX].alive;
		// 	}
		// }

		update();
	}

	function dead(i, j){
		cell[i][j].alive = false;
		cell[i][j].hunger = 0;
	}

	function update() {
		ctx.clearRect(0, 0, w, h);
		ctx.beginPath();

		for(var i = 0; i <= w || i <= h; i += SIZE) {
			if(i <= w) {
				ctx.moveTo(i, 0);
				ctx.lineTo(i, h);
			}
		
			if(i <= h) {
				ctx.moveTo(0, i);
				ctx.lineTo(w, i);
			}
		}

		ctx.closePath();
		ctx.stroke();

		for(var i = 0; i < arr_h; i++) {
			for(var j = 0; j < arr_w; j++) {
				if(cell[i][j].alive)
					ctx.fillRect(j * SIZE, i * SIZE, SIZE, SIZE);
			}
		}
	}
}
