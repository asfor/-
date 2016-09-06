//FIFO.js
// 脚本语言: JavaScript

//FIFO类
var FIFO = function(){
	this.work_address = [];	//需要访问的地址数组
	this.memory_size;		//分配到的内存大小
	this.pages = [];		//页面数组
	this.page_size;			//页面大小
	this.pages_num;			//页面数组长度
	this.page_fault_rate;	//缺页率
	this.die_pages = [];	//淘汰页数组
}

//初始化配置
FIFO.prototype.init = function(work_address, memory_size, page_size){
	this.work_address = work_address;
	this.memory_size = memory_size;
	this.page_size = page_size;

	this.pages_num = Math.ceil(memory_size / page_size);

	for(var i = 0; i < this.work_address.length; i++)
		this.work_address[i] = Math.floor(this.work_address[i] / this.page_size);
}

FIFO.prototype.run = function(){
	var mark;			//最先进入的页面
	var page_fault_num = 0;	//缺页数

	for(var i = 0; i < this.work_address.length; i++){
		var is_break = false;	//页面是否已在内存中

		//判断工作页面是否已在内存中
		for(var j = 0; j < this.pages_num; j++){
			if(this.pages[j] == this.work_address[i])
				{is_break = true;}
		}

		//如果工作页面在内存中，就到下一工作页面
		if(is_break)	continue;

		//判断有无空置的内存
		for(var j = 0; j < this.pages_num; j++){
			if(this.pages[j] == undefined){
				this.pages[j] = this.work_address[i];
				page_fault_num++;
				if(mark == undefined)	mark = j;
				is_break = true;
				break;
			}
		}

		//存入空置内存并到下一页面
		if(is_break)	continue;

		//无空置内存下，进行换页
		for(var j = 0; j < this.pages_num; j++){
			if(mark == j){
				this.die_pages.push(this.pages[j]);
				mark = (++mark) % this.pages_num;
				page_fault_num++;
				break;
			}
		}
	}

	this.page_fault_rate = page_fault_num / this.work_address.length;
}

FIFO.prototype.pageFaultRate = function(){return this.page_fault_rate;}
FIFO.prototype.diePages = function(){return this.die_pages;}


// var word = [112,220,102,80,503,133,345,520,240,166]
// var ff = new FIFO();
// ff.init(word, 300, 100);
// ff.run();
// ff.diePages();