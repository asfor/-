function nav(){
	this.html = '<!-- 导航栏 --><nav id="nav"><div role="cotents of nav"><!-- 搜索框 --><form id="nav-search"><input id="search-text" type="text" placeholder="搜索问题~"><span id="search-button" title="搜索"><i class="icon icon-search"></i></span></form><!-- 添加文章 --><button id="add">添加笔记~</button></div></nav>';
}

nav.prototype.load = function(){
	//载入html
	this.html += $("body").html();
	$("body").html(this.html);

	//绑定点击事件
	$("#search-button").click(function(){
		var search_data = $$("#search-text").value;
		var url = "";
		if(search_data != ""){
			H_ajax(url,function(jsondata){
				var data = JSON.parse(jsondata);
				//更新HTML
			});
		}
	});

	$("#add").click(function(){
		var url = "";
		H_ajax(url,function(jsondata){
			var data = JSON.parse(jsondata);
			//更新HTML
		});
	});
}