// 假币问题.js

//问题对象
var problem = function(){
	var obj = new Object();

	//私有变量
	var fake_No;		//假币编号
	var fake_weight;	//0代表假币比较轻, 1代表比较重
	var coin_num;		//硬币数量
	var coins = [];		//硬币数组

	//私有函数

	//三三原则函数, array: 需要辨别的硬币数组
	function standardOf33(array){
		//递归结束条件
		if(!arguments[1] && array.length == 1)	return array[0];
		if(arguments[1] && array.length == 1){

		}

		var arr = [];
		var	slice_len = (array.length < 6) ? Math.floor(array.length / 2): Math.floor(array.length / 6);
		var sum_0 = 0;
		var sum_1 = 0;

		//分割数组
		if(array.length < 6) {
			//分成3个数组
			for(var i = 0; i < 3; i++)
				arr[i] = array.slice(i * slice_len, (i + 1) * slice_len);
			if(arguments[2])
				for(; i < 3; i++)
					arr[i] = array.slice(i * slice_len, (i + 1) * slice_len);
		} else if(array.length % 6 == 0) {
			//是否传入两个数组
			if(!arguments[1]){
				//分成3个数组
				for(var i = 0; i < 3; i++)
					arr[i] = array.slice(i * slice_len * 2, (i + 1) * slice_len * 2);
			} else {
				//每边分成3个数组, 共6个
				for(var i = 0; i < 3; i++){
					arr[i] = array.slice(i * slice_len, (i + 1) * slice_len);
					arr[i + 3] = arguments[1].slice(i * slice_len, (i + 1) * slice_len);
				}
			}
		} else {
			if(!arguments[1]){
				//分成3个数组, 最后一个数组为余数数组
				for(var i = 0; i < 2; i++)
					arr[i] = array.slice(i * slice_len * 3, (i + 1) * slice_len * 3);
				arr[i] = array.slice(i * slice_len * 3);
			} else {
				//每边分成2个数组, 共4个, 每边的最后一个数组为余数数组
				for(var i = 0; i < 1; i++){
					arr[i] = array.slice(i * slice_len * 6, (i + 1) * slice_len * 6);
					arr[i + 2] = arguments[1].slice(i * slice_len * 6, (i + 1) * slice_len * 6);
				}
				arr[i] = array.slice(i * slice_len * 6);
				arr[i + 2] = arguments[1].slice(i * slice_len * 6);
			}
		}

		//判定树
		if(array.length % 6 == 0 && arguments[1]){
			//能被6整除 & 有2个数组
			if(!arguments[2]){
				for(var i = 0; i < 3; i++)
					for(var element in arr[i])
						sum_0 += element;

				for(; i < 6; i++)
					for(var element in arr[i])
						sum_1 += element;

				arguments[2] = sum_0 > sum_1 ? true : false;
				sum_0 = 0;
				sum_1 = 0;
			}

			for(var element in arr[0])
				sum_0 += element;
			for(var element in arr[4])
				sum_0 += element;

			for(var element in arr[3])
				sum_1 += element;
			for(var element in arr[1])
				sum_1 += element;

			if(sum_0 > sum_1 == arguments[2])		return standardOf33(arr[0], arr[3], arguments[2]);
			else if(sum_0 > sum_1 == !arguments[2])	return standardOf33(arr[1], arr[4], arguments[2]);
			else									return standardOf33(arr[2], arr[5], arguments[2]);
		} else if(array.length % 6 == 0 && !arguments[1]) {
			//能被6整除 & 有1个数组
			for(var element in arr[0])
				sum_0 += element;

			for(var element in arr[1])
				sum_1 += element;

			if(sum_0 > sum_1)		return standardOf33(arr[0], arr[1], true);
			else if(sum_0 < sum_1)	return standardOf33(arr[0], arr[1], false);
			else					return standardOf33(arr[2]);
		} else if(array.length % 6 != 0 && arguments[1]) {
			//不能被6整除 & 有2个数组
			for(var element in arr[0])
				sum_0 += element;

			for(var element in arr[2])
				sum_1 += element;

			if(!arguments[2])	arguments[2] = sum_0 > sum_1 ? true : false;

			return (sum_1 == sum_0) ? standardOf33(arr[1], arr[3]) : standardOf33(arr[0], arr[2]);
		} else {
			//不能被6整除 & 有1个数组
			for(var element in arr[0])
				sum_0 += element;

			for(var element in arr[1])
				sum_1 += element;

			if(sum_0 > sum_1)		return standardOf33(arr[0], arr[1], true);
			else if(sum_0 < sum_1)	return standardOf33(arr[0], arr[1], false);
			else					return standardOf33(arr[2]);
		}
	}

	//公有函数

	//初始化函数, 参数num为硬币数量//
	obj.init = function(num){
		coin_num = num;

		//先使所有硬币变为真币
		//真币值为0
		for(var i = 0; i < coin_num; i++)
			coins[i] = 0;

		//随机产生一枚假币
		//假币的值为 [-1000, 1000) 的随机整数
		coins[Math.floor(Math.random() * coin_num)] = Math.floor((Math.random() - 0.5) * 1000);
	};

	obj.solve = function(){
		var buf = standardOf33(coins);
		fake_weight = (buf > 0) ? 1 : 0;
		console.log('假币质量:' + buf);
		console.log('假币比真币:' + ((fake_weight) ? '更重' : '更轻'));
	};

	return obj;
}();
