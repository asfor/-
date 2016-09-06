// boy.js
var boy = {
	element: $("#boy"),
	container: null,
	top: null,
	walkOffset: 25,
	rotateOffset: 27,
	init: function(container) {		/* 初始化函数，修正男孩位置 */
		this.container = container;

	    var pathY = function() {
	        var data = $('.a_background_middle');
	        return data.position().top + data.height() / 2;
	    }();

	    this.top = pathY - this.element.height() + this.walkOffset;
	    this.element.css('top', this.top);
	},

	walk: function(callback) {		/* 正常行走 */
		this.element.transition(
			{'left': this.container.width()*0.5 + 'px'},
	        1000,
	        'linear',
	        callback
	    );
	},

	stop: function(callback) {		/* 停止动作 */
		this.element.addClass('pauseWalk');
		setTimeout(function(){callback()}, 500);
	},

	comeIn: function(callback) {	/* 进门 */
		this.element.removeClass('pauseWalk');
		this.element.transition(
			{
				/*
				* 这个位置太坑爹了，scale缩放比例后会让左侧奇妙的多出一节距离
				* 我被它搞败了，只好设一个百分比凑合了╮(╯—╰)╭
				*/
	
				'left': '52%',	//$('.shop').position().left + $('.door').position().left  - $('.door').width / 2,
				'top': '35%',
				'-webkit-transform': 'scale(0)',
				'opacity': 0
			},
			2000,
			'linear',
			callback
		);
	},

	getOut: function(callback) {	/* 出门 */
		this.element.removeClass().addClass('flowerSlowWalk');
		this.element.transition(
			{
				'top': this.top + 'px',
				'-webkit-transform': 'scale(1)',
				'opacity': 1
			},
			2000,
			'linear',
			callback
		);
	},

	onBridge: function(reference, callback) {	/* 上桥 */
		this.element.transition(
			{
				'top'  : reference.position().top,
				'left' : reference.position().left - this.element.width() + this.rotateOffset
			},
	        1000,
	        'linear',
	        callback
	    );
	},

	stopOnBridge: function(callback) {	/* 在桥上停下 */
		this.stop(callback);
		this.element.removeClass().addClass('boyOriginal');
	},

	turnRound: function(callback) {		/* 转身 */
    	this.element.addClass('boy-rotate');
		callback();
	}
}