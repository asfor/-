// script.js
window.onload = restart;

function restart() {
	var BIRTH_RATE = 0.1;
	var LIVE_MIN = 2;
	var LIVE_MAX = 4;
	var SIZE = 5;

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
			if(i != w)	cell[0].push(false);
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
				cell[i][j] = (Math.random() < BIRTH_RATE) ? true : false;
				if(cell[i][j])
					ctx.fillRect(j * SIZE, i * SIZE, SIZE, SIZE);
			}
		}

		setInterval(iteration, 500);
	}

	function iteration() {
		for(var i = 0; i < arr_h; i++) {
			for(var j = 0; j < arr_w; j++) {
				var neighbor = 0;

				//邻居个数计算
				if(i != 0) {
					if(!!cell[i-1][j-1])	neighbor++;
					if(!!cell[i-1][j])		neighbor++;
					if(!!cell[i-1][j+1])	neighbor++;
				}

				if(!!cell[i][j-1])		neighbor++;
				if(!!cell[i][j+1])		neighbor++;
				
				if(i != arr_h - 1) {
					if(!!cell[i+1][j-1])	neighbor++;
					if(!!cell[i+1][j])		neighbor++;
					if(!!cell[i+1][j+1])	neighbor++;
				}

				//个体迭代规则
				if(neighbor < LIVE_MIN)
					cell[i][j] = false;
				else if(neighbor > LIVE_MIN && neighbor <= LIVE_MAX)
					cell[i][j] = true;
				else if(neighbor > LIVE_MAX)
					cell[i][j] = false;
			}
		}

		//整体突变
		// if((iterationNum = (++iterationNum)%5) == 0) {
		// 	for(var i = 0; i < 10000; i++) {
		// 		var changeX = Math.floor(Math.random() * arr_w);
		// 		var changeY = Math.floor(Math.random() * arr_h);
		// 		cell[changeY][changeX] = !cell[changeY][changeX];
		// 	}
		// }

		update();
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
				if(cell[i][j])
					ctx.fillRect(j * SIZE, i * SIZE, SIZE, SIZE);
			}
		}
	}
}
