// con.js
function fun(x, y) {
	return x*y;
}

// x + x
// x^2
// x * 100 - x^2
// x + 2*(x^2) + 3*(x^3) + ... + n(x^n)

function fun(fun) {
	return fun(x);
}

function fun(fun) {
	return function(){fun();};
}

// 柯里化
function currying(fun, ...arr) {
	return function(...newArr) {
		arr = arr.concat(newArr);
		return fun.apply(this, arr);
	}
}

function fanzhuanshu(root) {
	if(!Array.isArray(root))
		return root;
	if(root[0])
		fanzhuanshu(root[0]);
	if(root[1])
		fanzhuanshu(root[1]);

	[root[0], root[1]] = [root[1], root[0]];
}

function fanzhuanshu_fun(root) {

}

function get_name() {
	return this.name;
}
function get_price() {
	return this.price;
}
function get_info() {
	return this.info;
}

function define(name) {
	var fun = `return this.${name};`
	this.prototype[name] = new Function(fun);
}

// call
// apply
// bind

// 1.不调用递归写循环
// 2.改写尾递归
// 3.写出map
// 4.写出reduce

// 不可变数据
// 函数是第一公民
// 尾递归

// 映射和聚合
// 递归
// 柯里化
// 高阶函数

// 惰性求值
// 确定性

// 锁、测试、高效
var arr = [];
function lin(val, arr) {
	if(val >= 10) {
		arr.push(10);
		return lin(val - 10, arr);
	} if(val >= 5) {
		arr.push(5);
		return lin(val - 5, arr);
	} if(val >= 1) {
		arr.push(1);
		return lin(val - 1, arr);
	} else
		return;
}

function lin(all, moneyList) {
	function val(all, moneyList, iter) {
		if(moneyList.length > iter) {
			if(all >= moneyList[iter])
				return moneyList[iter];
			else
				return val(all, moneyList, iter+1);
		} else {
			return;
		}
	}

	var the = val(all, moneyList, 0);
	if(the === undefined)
		return [];
	else {
		// var fin = lin(all - the, moneyList).push(the);
		// return fin;
		return [the].concat(lin(all - the, moneyList));
	}
}
