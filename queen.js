// queen.js

var arr = [], queens = [{x: 0, y: 0}];
//初始化棋盘
init();
// while(queens.length !== 8) {
	// 禁用不可用区域
	seal();

	// 填入下一个皇后
// 	if(!addQueen())
// 		unseal();
// }
// for(queen in queens)
// 	console.log(queens[queen].y+"   "+queens[queen].x);
	// console.log(arr);

function init() {
	for(var i = 0; i < 8; i++) {
		arr.push([]);
		for(var j = 0; j < 8; j++)
			arr[i][j] = {
				isSeal: false,
				x: j,
				y: i,
			};
	}
}

function seal() {
	for(queen in queens) {
		var y = ((queens[queen].y > queens[queen].x) ? queens[queen].y - queens[queen].x : 0);
		var x = ((queens[queen].y < queens[queen].x) ? queens[queen].x - queens[queen].y : 0);
		for(var offset = 0; true; offset++) {
			var end = 0;
			if(arr[queens[queen].y][offset]) {arr[queens[queen].y][offset].isSeal = true;} else {end++;}
			if(arr[offset]) {if(arr[offset][queens[queen].x])	arr[offset][queens[queen].x].isSeal = true;} else {end++;}
			if(arr[queens[queen].x - offset]) {if(arr[queens[queen].x - offset][queens[queen].y + offset]) arr[queens[queen].x - offset][queens[queen].y + offset].isSeal = true;} else {end++;}
			if(arr[y + offset])	{if(arr[y + offset][x + offset]) arr[y + offset][x + offset].isSeal = true;} else {end++;}

			if(end === 4) break;
		}
	}
}

function unseal() {
	var delQueen = queens.pop();
	for(var offset = 0, end = 0; end !== 4; offset++) {
		//y = c 和 x = c (c >= 0) 列解锁
		if(arr[delQueen.y][offset])	{arr[delQueen.y][offset].isSeal = false; end++;}
		if(arr[offset][delQueen.x])	{arr[offset][delQueen.x].isSeal = false; end++;}

		//x + y = c 列解锁
		if(arr[delQueen.x - offset][delQueen.y + offset])	{arr[delQueen.x - offset][delQueen.y + offset].isSeal = false; end++;}

		//x - y = c 列解锁
		var y = ((delQueen.y > delQueen.x) ? delQueen.y - delQueen.x : 0) + offset;
		var x = ((delQueen.y < delQueen.x) ? delQueen.x - delQueen.y : 0) + offset;
		if(arr[y + offset][x + offset])	{arr[y + offset][x + offset].isSeal = false; end++;}
	}
}

function addQueen() {
	for(var row = queens[queens.length-1] ? queens[queens.length-1].y : 0; row < 8; row++)
		for(var ele = queens[queens.length-1] ? queens[queens.length-1].x + 1 : 0; ele < 8; ele++)
			if(!arr[row][ele].isSeal)
				{queens.push({x: ele, y: row}); return true;}
	return false;
}