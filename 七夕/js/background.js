// background.js
var background = {
	element: $("#background"),
	conWidth: null,    //容器宽度
	conHeight: null,   //容器高度

	snowflakeURl: [    //花瓣图url数组
        './images/snowflake/snowflake1.png',
        './images/snowflake/snowflake2.png',
        './images/snowflake/snowflake3.png',
        './images/snowflake/snowflake4.png',
        './images/snowflake/snowflake5.png',
        './images/snowflake/snowflake6.png'
    ],

	init: function(container) {    //初始化函数，调整布局等等
		var width = this.conWidth = container.width();
		var height = this.conHeight = container.height();
    	var scenes = this.element.find(">li");

		this.element.css({
	        width  : (scenes.length * width) + 'px',
	        height : height + 'px'
	    });

	    $.each(scenes, function(index) {
	        var scene = scenes.eq(index);
	        scene.css({
	            width: width+'px',
	            height: height+'px'
	        });
	    });
	},
	
	scrollTo: function(x, speed, callback, secondUse) {    //背景滑动
	    if(secondUse) {
		    $("#boy").transition(
		    	{'left': '18%'}, //>>30%
		    	3000,
		    	'linear'
		    );
		    x *= 2;
		}

	    $("#background").transition(
	        {left: -x + 'px'},
	        3000,
	        'linear',
	        callback
    	);
	},

	openDoor: function(callback) {     //开门
		$(".door-left").css('left', '-50%');
		$(".door-right").css('left', '100%');
		setTimeout(function(){callback()}, 300);
	},

	snowflake: function() {    //飘花瓣函数
        // 雪花容器
        var flakeContainer = $('#snowflake');
        var that = this;

        // 随机六张图
        function getImagesName() {
            return that.snowflakeURl[Math.floor(Math.random() * 6)];
        }
        // 创建一个雪花元素
        function createSnowBox() {
            var url = getImagesName();
            return $('<div class="snowbox" />').css({
                'width': 41,
                'height': 41,
                'position': 'absolute',
                'backgroundSize': 'cover',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(' + url + ')'
            }).addClass('snowRoll');
        }
        // 开始飘花
        setInterval(function() {
            // 运动的轨迹
            var startPositionLeft = Math.random() * that.conWidth - 100,
                startOpacity    = 1,
                endPositionTop  = that.conHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = that.conHeight * 10 + Math.random() * 5000;

            // 随机透明度，不小于0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;

            // 创建一个雪花
            var flake = createSnowBox();

            // 设计起点位置
            flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });

            // 加入到容器
            flakeContainer.append(flake);

            // 开始执行动画
            flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //结束后删除
            });
        }, 200);
    }
};