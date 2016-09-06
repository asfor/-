//神经细胞类,输入数量inputs,权值数组weight
function xibao(inputs,weight)
{this.inputs = inputs;this.weight = weight;}
xibao.prototype.activate = function(){
	var len = this.inputs.length - 1;
	var semaphore = 0;

	//信号量计算
	for(;len>0;len--)
	{semaphore += this.inputs[len] * this.weight[len];}
	
	//阀值
	if(semaphore > 1){
		return 1;
	} else {
		return 0;
	}
}

//神经细胞层类,细胞个数xibaos,输入数组inputs(二维数组),权值数组weight(二维数组)
function shenjin(xibaos,inputs,weight){
	this.xibaos = [];
	var index = 0;

	//创建该层的神经细胞
	for(;index<xibaos;index++)
	{this.xibaos.push(new xibao(inputs[index],weight[index]));}
}
shenjin.prototype.output = function(){
	var index = 0;
	//输出数组
	var outputs = [];

	//将每个细胞的输出压入数组
	for(;index<this.xibaos.length;index++)
	{outputs.push(this.xibaos[index].activate);}

	return outputs;
}

//神经网络类,隐藏中间层数plies,细胞个数xibaos,输入数组inputs(三维数组),权值数组weight(三维数组)
function web(plies,xibaos,inputs,weight){
	this.plies = [];
	var index = 1;

	//创建输入层
	
}