var container = $("#warp");

function start() {
    function init() {
        background.init(container);
        boy.init(container);
        girl.init(container);
    }

    init();
    
    //传说中的回调地狱……

    //男孩走路
    boy.walk(function() {
        //背景滑动
        background.scrollTo(container.width(), 3000, function(){
            //男孩停下
            boy.stop(function(){
                //开门
                background.openDoor(function(){
                    //男孩进门
                    boy.comeIn(function(){
                        //男孩出门
                        boy.getOut(function(){
                            //背景滑动
                            background.scrollTo(container.width(), 3000, function(){
                                //上桥
                                boy.onBridge(girl.element, function(){
                                    //停在桥上
                                    boy.stopOnBridge(function(){
                                        //深情对视1000ms后两人转身
                                        setTimeout(function(){
                                            girl.turnRound();
                                            boy.turnRound(function(){
                                                //LOGO出现
                                                logo.run();
                                                //撒花
                                                background.snowflake();
                                            });
                                        },1000);
                                    });
                                });
                            }, true);
                        });
                    });
                });
            });
        });
    });

}

start();