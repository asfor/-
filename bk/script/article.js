$(function(){
	//添加导航栏
	var navigation = new nav();
	navigation.load();

	//分类点击事件
	$(".aside-classification img, .aside-classification span").click(function(){
		var no = $(".aside-classification").attr("data");
		var url = "";
		H_ajax(url,function(jsondata){
			var data = JSON.parse(jsondata);
			//更新HTML
		});
	});

	//编辑点击事件
	$(".main-footer-edit").click(function(){
		var url = "";
		H_ajax(url,function(jsondata){
			var data = JSON.parse(jsondata);
			//更新HTML
		});
	});
})