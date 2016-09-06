// LRU.js
// 脚本语言: JavaScript

//LRU对象, 单例模式
var LRU = function(){
	var obj = new Object();

	//私有变量
	var work_address = [];	//需要访问的地址数组
	var memory_size;		//分配到的内存大小
	var pages = [];			//页面数组
	var page_size;			//页面大小
	var pages_num;			//页面数组长度
	var page_fault_rate;	//缺页率
	var die_pages = [];		//淘汰页数组
	var use_times = [];		//使用次数记录数组

	//私有函数

	//将传入页面放到栈顶//
	function moveToTop(workIndex){
		var j;

		//在记录栈中寻找当前页面
		if(arguments[1])	j = 0;
		else
			for(j = 0; j < pages_num; j++)
				if(use_times[j] == workIndex)
					break;

		//之前的元素往后挪一位
		for(; use_times[j] == undefined; j++)
			use_times[j] = use_times[j + 1];

		//将它换到栈顶
		use_times[j - 1] = workIndex;
	}

	//公共函数

	//初始化配置//
	obj.init = function(WorkAddress, MemorySize, PageSize){
		work_address = WorkAddress;
		memory_size = MemorySize;
		page_size = PageSize;

		pages_num = Math.ceil(memory_size / page_size);
		use_times.length = pages_num;

		for(var i = 0; i < work_address.length; i++)
			work_address[i] = Math.floor(work_address[i] / page_size);
	}

	obj.run = function(){
		var page_fault_num = 0;	//缺页数

		for(var i = 0; i < work_address.length; i++){
			var is_break = false;	//页面是否已在内存中

			//判断工作页面是否已在内存中
			for(var j = 0; j < pages_num; j++){
				if(pages[j] == work_address[i])
					{is_break = true;break;}
			}

			//如果工作页面在内存中，就到下一工作页面
			if(is_break) {
				moveToTop(work_address[i]);
				continue;
			}

			//判断有无空置的内存
			for(var j = 0; j < pages_num; j++){
				if(pages[j] == undefined){
					pages[j] = work_address[i];
					page_fault_num++;
					use_times.push(work_address[i]);
					is_break = true;
					break;
				}
			}

			//存入空置内存并到下一页面
			if(is_break)	continue;

			//无空置内存下，进行换页
			for(var j = 0; j < pages_num; j++){
				//查找最久未使用的页面在页面数组中的位置并替换
				if(pages[j] == use_times[0]){
					die_pages.push(pages[j]);
					pages[j] = work_address[i];
					page_fault_num++;
					moveToTop(work_address[i], true);
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
// LRU.init(word, 300, 100);
// LRU.run();
// LRU.diePages();