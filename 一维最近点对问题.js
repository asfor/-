// 一维最近点对问题.js

// main函数
window.onload = function(){
	min_distance_of_point_to_point.init();
	min_distance_of_point_to_point.calculate();
}

//一维最近点对对象, 单例模式
var min_distance_of_point_to_point = function(){
	var obj = new Object();

	//私有变量
	var point_num = 10;	//点的数量
	var points = [];	//点的数组
	var max = 200;		//区间大小
	var i;

	//公共函数

	//初始化数组坐标并排序//
	obj.init = function(){
		for(i = 0; i < point_num; i++)
			points[i] = Math.floor(Math.random() * max - max / 2);	//(-max / 2, max / 2]
		points.sort(rule);	//以0为分割线, 且向上取整

		function rule(a, b){return a - b;}
	};

	//计算并输出最近点对的坐标和距离//
	obj.calculate = function(){
		var point_0;
		var point_1;
		var max_distance;

		//分割线之前的点计算
		for(i = 0; points[i + 1] < 0; i++)
			change(i);

		//被分割的两个点计算
		change(i++);

		//分割线之后的点计算
		for(; i + 1 < point_num; i++)
			change(i);

		console.log('最近点对坐标:' + points[point_0] + '  ' + points[point_1]);
		console.log('最近点对距离:' + (points[point_1] - points[point_0]));

		function change(i){
			if(max_distance > points[i + 1] - points[i] || max_distance == undefined){
				point_0 = i;
				point_1 = i + 1;
				max_distance = points[i + 1] - points[i];
			}
		}
	};

	return obj;
}();