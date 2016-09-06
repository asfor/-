//银行家算法
//脚本语言JavaScript

var construction = function(){
	this.available = [];	//可用资源向量
	this.max = [];			//最大需求矩阵
	this.allocation = [];	//分配矩阵
	this.need = [];			//需求矩阵
}

/*****************************************************
函数名：	init(available, max, allocation, need)
功能：		初始化各个矩阵。将各个矩阵数组在外部按照格
			式创建好，然后将各个矩阵以参数的形式传入
输入参数：	available 	可用资源向量
			max 		最大需求矩阵
			allocation	分配矩阵
			need 		需求矩阵
*****************************************************/
construction.prototype.init = function(available, max, allocation, need){
	this.available = available;
	this.max = max;
	this.allocation = allocation;
	this.need = need;

	this.process_length = this.max.length;
	this.resource_length = this.available.length;
}

/*****************************************************
函数名：	banker(process_id, request)
功能：		使用银行家算法判断进程请求的是否安全。
输入参数：	process_id 	请求进程的编号
			request 	资源请求数组
*****************************************************/
construction.prototype.banker = function(process_id, request){
	var ava = this.available;
	var all = this.allocation;
	var nee = this.need;

	for(var i = 0; i < this.resource_length; i++){
		if(request[i] > this.need[process_id][i])	{console.log("error:所需资源超过最大值");return;}
		if(request[i] > this.available[i])			{console.log("error:资源不足");return;}

		ava[i] -= request[i];
		all[process_id][i] += request[i];
		nee[process_id][i] -= request[i];
	}

	if(this.safety(ava, nee)){
		this.available = ava;
		this.allocation = all;
		this.need = nee;

		return console.log("请求安全!");
	}

	return console.log("请求不安全!");
}

/*****************************************************
函数名：	safety(work, need)
功能：		使用安全性算法判断分配后的系统是否安全。
输入参数：	work 	分配后的可用资源向量
			need 	分配后的需求矩阵
*****************************************************/
construction.prototype.safety = function(work, need){
	var finish = [];
	var isEnd = false;

	for(var i = 0; i < this.process_length; i++)	finish.push(false);

	while(!isEnd){
		isEnd = true;
		var isSafe = true;

		for(var i = 0; i < this.process_length; i++){
			if(!finish[i] && resourcesAreAdequate(i,this)){
				for(var j = 0; j < this.resource_length; j++)
					work[j] += this.allocation[i][j];
				
				finish[i] = true;
				isEnd = false;
			}
		}
	}
	for(var i = 0; i < this.process_length; i++){console.log(finish[i]);}

	for(var i = 0; i < this.process_length; i++){
		if(!finish[i])	isSafe = false;
	}

	return isSafe;

	/*****************************************************
	函数名：	resourcesAreAdequate(process_id, obj)
	功能：		判断当前可分配资源是否能满足进程序列
				为process_id的进程。safety函数内定义，
				仅safety函数内可用。
	输入参数：	process_id	进程序列号
				obj 		算法对象
	*****************************************************/
	function resourcesAreAdequate(process_id, obj){
		var isAdequate = true;
		for(var i = 0; i < obj.resource_length; i++){
			if(work[i] < obj.need[process_id][i]){
				isAdequate = false;
				break;
			}
		}
		return isAdequate;
	}
}



// 测试用数据

//第一组：请求安全
// var max = [[7,5,3],[3,2,2],[9,0,2],[2,2,2],[4,3,3]];
// var all = [[0,1,0],[2,0,0],[3,0,2],[2,1,1],[0,0,2]];
// var nee = [[7,4,3],[1,2,2],[6,0,0],[0,1,1],[4,3,1]];
// var ava = [3,3,2];
// var req = [1,0,2];

//第二组：请求不安全
// var max = [[7,5,3],[3,2,2],[9,0,2],[2,2,2],[4,3,3]];
// var all = [[0,1,0],[3,0,2],[3,0,2],[2,1,1],[0,0,2]];
// var nee = [[7,4,3],[0,2,0],[6,0,0],[0,1,1],[4,3,1]];
// var ava = [2,3,0];
// var req = [0,2,0];

// var con = new construction();
// con.init(ava,max,all,nee);
// con.banker(0,req);