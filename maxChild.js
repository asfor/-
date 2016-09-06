// maxChild.js

function maxChild() {
	this.nums = [];		//整数序列数组
	this.nowMax = [];	//固定开始索引的最大子段和数组
	this.sumMax;		//整个序列的最大子段和
}

maxChild.prototype.init = function(nums) {
	this.nums = nums;
	for(var i in this.nums)
		this.nowMax[i] = 0;
	this.sumMax = 0;
}

maxChild.prototype.countMaxChild = function() {
	
	//找出以this.nums[num]为开始的最大子段和
	for(var num in this.nums) {
		var cache = 0;
		
		for(var index = num; index < this.nums.length; index++) {
			cache += this.nums[index];

			this.nowMax[num] = (cache > this.nowMax[num]) ? cache : this.nowMax[num];
		}
	}

	//找出最大子段和
	for(var i in this.nowMax)
		this.sumMax = (this.nowMax[i] > this.sumMax) ? this.nowMax[i] : this.sumMax;

	return this.sumMax;
}

// var max = new maxChild();
// var arr = [-12, 20, -4, 7, -6, 10];

// max.init(arr);
// max.countMaxChild();