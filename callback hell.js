/**
*  v1.0
*  可以实现顺序链式调用,
*  函数参数必须在外部调用时传递,
*  无法将上次函数运行的结果传递到下次调用，
*  使用了ES6
*/
var promise = function() {
	return {
		then: function(callback = function(){throw new Error('No action!');}, ...arr) {
			//callback后面是默认参数,  ...arr是不定参数
			callback.apply(this, arr);
			return this;
		},
		done: function() {return;}
	};
};

function b() {console.log('b');}
function c(a) {console.log(`c ${a}`);} // `c ${a}` === 'c '.a
function d(a, b) {console.log(`d ${a} ${b}`);}
function e(a, b, c) {console.log(`e ${a} ${b} ${c}`);}

promise().then(b)
		 .then(c, 'wo')
		 .then(d, 'de', 'tian')
		 .then(e, 'hao', 'xiang', 'ku')
		 .done();


/**
 * v2.0
 * 可以实现顺序链式调用,
 * 可以将上次函数运行的结果传递到下次调用，
 * 只能链式运行无参数或单个参数的函数
 */
var promise = function() {
	return {
		parameter: undefined,
		then: function(callback) {
			if(Object.prototype.toString.call(callback) !== '[object Function]')
				throw new Error('argument is not function');
			if(this.parameter) {
				this.parameter = callback.call(this, this.parameter);
			} else
				this.parameter = callback();

			return this;
		},
		done: function(f) {
			if(f) f();
		}
	};
};

function b() {console.log('b');return 1;}
function c(a) {console.log(`c ${a}`);return 2;}
function d(b) {console.log(`d ${b}`);return 3;}
function e(c) {console.log(`e ${c}`);}

promise().then(b)
		 .then(c)
		 .then(d)
		 .then(e)
		 .done();

/**
*  v3.0
*  可以实现顺序链式调用,
*/
