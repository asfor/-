$(function(){
	window.score = 1;
	window.max_block = 50;

	function getFinallyBlock(arr){    //获取最后一块黑块
		if(arr){
			var i = 0;
			for(i;i<arr.length;i++){
				if(arr[i].className.substr(-1) == 4)
				{return arr[i];}
			};
		} else {
			return null;
		}
	}

	function shiftDown(blocks){        //黑块下滑
		if(blocks){
			var i = 0;
			// 方块移动
			for(i;i<blocks.length;i++){
				var div_height = blocks[i].className.substr(-1);
				if(div_height == 0){
					blocks[i].style.backgroundColor = '#000';
					blocks[i].style.zIndex = '1';
				} else if(div_height == 4){
					blocks[i].style.backgroundColor = '#fff';
					blocks[i].style.zIndex = '-1';
				} else if(div_height == 5){
					var random = parseInt(4*Math.random());
					blocks[i].className = blocks[i].className.substr(0,16) + random + blocks[i].className.substr(17,13) + 0;
				}

				if(div_height != 5){
					blocks[i].className = blocks[i].className.substr(0,blocks[i].className.length-1) + (div_height-0+1);
				}
			}
		}
	}

	function restBlocks(blocks){     //剩余块数更新
		document.getElementById('rest-p').innerHTML = "剩余块数：<strong>"+blocks+"</strong>";
	}

	function timer(score){     //计时器更新
		if(score){
			score /= 100;
			document.getElementById('score-p').innerHTML = "成绩：<strong>"+score+" s</strong>";
		}
	}

	function gameOver(num){     //游戏结束
		if(num <= 0){
			alert("你的成绩：" + (window.score-1)/100 + "s !!  :)");
		} else {
			alert("很遗憾，你未完成 :(");
		}
		window.location.reload();
	}

	// 控制器部分
	$("body").keydown(function(event){
		//s:83 d:68 j:74 k:75
		var keycode = event.keyCode; //获取按键ASCII码
		var blocks = document.getElementsByClassName('block');
		var finally_block = getFinallyBlock(blocks);
		var finally_left = finally_block.className.substr(16,1);
		if((finally_left == 0 && keycode == 83 || finally_left == 1 && keycode == 68 || finally_left == 2 && keycode == 74 || finally_left == 3 && keycode == 75) && (window.max_block--) > 0){
			shiftDown(blocks);
			restBlocks(window.max_block);
			if(window.score == 1)
			{setInterval(function(){timer(window.score++);},10);}
		} else {
			gameOver(window.max_block);
		}
	});
})