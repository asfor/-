// logo.js
var logo = {
    element: $('.logo'),

    run: function() {   /* logo出现 */
    	var animationEnd = (function() {
            var explorer = navigator.userAgent;
            if (~explorer.indexOf('WebKit')) 
            	return 'webkitAnimationEnd';
           	else
           		return 'animationend';
        })();
        
        this.element.addClass('logolightSpeedIn')
            .on(animationEnd, function() {
                $(this).addClass('logoshake').off();
            });
    }
};