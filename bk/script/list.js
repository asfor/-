$(function(){
	//添加导航栏
	var navigation = new nav();
	navigation.load();

	//分类点击事件
	$(".main-body-classification, .aside-classification-img, .aside-classification-title").click(function(){
		var no = $(this).attr("data");
		var url = "";
		H_ajax(url,function(jsondata){
			var data = JSON.parse(jsondata);
			//更新HTML
		});
	});

	//页码点击事件
	$(".main-footer-warp > li").click(function(){
		var page = $(this).innerHTML;
		var page_active = $(".main-footer-warp > .active")[0].innerHTML;

		if(page == "&lt;&lt;"){
			page = 1;
		} else if(page == "&lt;"){
			page = page_active - 1;
		} else if(page == "&gt;"){
			page = page_active + 1;
		} else if(page == "&gt;&gt;"){
			page = "max"; 
		}

		var url = "";
		H_ajax(url,function(jsondata){
			var data = JSON.parse(jsondata);
			//更新HTML
		});
	});

	//前后端切换
	$(".aside-switch > img").click(function(){
		//界面切换
		var color = $(this).attr("class");
		if(color == "r"){
			$(this).attr("src","img/me.jpg");
			$(this).attr("class","b");
			$("body").attr("class","red");
		} else {
			$(this).attr("src","img/yubi.jpg");
			$(this).attr("class","r");
			$("body").attr("class","blue");
		}

		//内容更新
		var url = "";
		H_ajax(url,function(jsondata){
			var data = JSON.parse(jsondata);
			//更新HTML
		});
	});
})