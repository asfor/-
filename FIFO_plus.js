// FIFO.js

//FIFO对象, 单例模式
var FIFO = function(){
	var obj = new Object();

	//私有变量
	var work_address = [];	//需要访问的地址数组
	var memory_size;		//分配到的内存大小
	var pages = [];			//页面数组
	var page_size;			//页面大小
	var pages_num;			//页面数组长度
	var page_fault_rate;	//缺页率
	var die_pages = [];		//淘汰页数组

	//公共函数

	//初始化配置//
	obj.init = function(WorkAddress, MemorySize, PageSize){
		work_address = WorkAddress;
		memory_size = MemorySize;
		page_size = PageSize;

		pages_num = Math.ceil(memory_size / page_size);

		for(var i = 0; i < work_address.length; i++)
			work_address[i] = Math.floor(work_address[i] / page_size);
	}

	obj.run = function(){
		var mark;			//最先进入的页面
		var page_fault_num = 0;	//缺页数

		for(var i = 0; i < work_address.length; i++){
			var is_break = false;	//页面是否已在内存中

			//判断工作页面是否已在内存中
			for(var j = 0; j < pages_num; j++){
				if(pages[j] == work_address[i])
					{is_break = true;}
			}

			//如果工作页面在内存中，就到下一工作页面
			if(is_break)	continue;

			//判断有无空置的内存
			for(var j = 0; j < pages_num; j++){
				if(pages[j] == undefined){
					pages[j] = work_address[i];
					page_fault_num++;
					if(mark == undefined)	mark = j;
					is_break = true;
					break;
				}
			}

			//存入空置内存并到下一页面
			if(is_break)	continue;

			//无空置内存下，进行换页
			for(var j = 0; j < pages_num; j++){
				if(mark == j){
					die_pages.push(pages[j]);
					mark = (++mark) % pages_num;
					page_fault_num++;
					break;
				}
			}
		}

		page_fault_rate = page_fault_num / work_address.length;
	}

	obj.pageFaultRate = function(){return page_fault_rate;}
	obj.diePages = function(){return die_pages;}

	return obj;
}();

// var word = [112,220,102,80,503,133,345,520,240,166]
// FIFO.init(word, 300, 100);
// FIFO.run();
// FIFO.diePages();