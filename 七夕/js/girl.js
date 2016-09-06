// girl.js
var girl = {
    element: $('#girl'),
    
    init: function(container) { /* 初始化函数，修正女孩位置 */
    	var bridgeY = function() {
	        var data = $('.c_background_middle');
	        return data.position().top;
	    }();

        this.element.css({
            left: container.width() / 2,
            top: bridgeY - this.element.height()
        });
    },

    turnRound: function() { /* 转身 */
    	this.element.addClass('girl-rotate');
    }
};
