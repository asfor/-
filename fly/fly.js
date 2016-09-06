// fly.js
var fly = (function() {
	//private:
	var ROTATE_CYCLE = 4000;	//旋转周期
	var DRAW_TIME = 15;			//绘制速度
	var APPROACH_RATE = 0.05;	//逼近速率

	return {
	//public:
		element: null,		//元素
		mouse_x: null,		//鼠标坐标
		mouse_y: null,
		x: null,			//元素坐标
		y: null,
		angle: null,		//角度
		R: 50,				//旋转角度
		angle_change: null,	//每次绘制变动角度
		init: function() {	//初始换函数
			if(document.getElementById('fly'))	return;
			this.angle = 0;
			this.angle_change = 2 * Math.PI / (ROTATE_CYCLE / DRAW_TIME);
			this.x = this.y = 100;

			this.element = document.createElement('div');
			this.element.id = 'fly';
			this.element.style.height = this.element.style.width = this.element.style.borderRadius = '10px';
			this.element.style.backgroundColor = '#0066cc';
			this.element.style.position = 'absolute';
			this.move(this);

			document.body.appendChild(this.element);
			
			var that = this;
			document.onmousemove = function(e) {
				that.mouse_x = e.offsetX;
				that.mouse_y = e.offsetY;
			};
			console.log(this);

			setInterval(function() {that.rotate();}, DRAW_TIME);
		},
		rotate: function() {	//旋转函数
			var x = Math.sin(this.angle += this.angle_change);
			var y = Math.cos(this.angle);

			// this.x = this.mouse_x + x * this.R;
			// this.y = this.mouse_y + y * this.R;

			var followX = this.mouse_x + x * this.R;
			var followY = this.mouse_y + y * this.R;

			this.x += (followX - this.x) * APPROACH_RATE;
			this.y += (followY - this.y) * APPROACH_RATE;

			this.move(this);
		},
		move: function(that) {	//移动函数
			that.element.style.left = that.x + 'px';
			that.element.style.top = that.y + 'px';
		}
	};
})();
fly.init();