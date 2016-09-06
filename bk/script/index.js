function skip(bor){
	setTimeout(function(){
		// window.location.href = url;

		$.ajax({
			type:"GET",
			url:"",
			datatype:"json",
			success:function(jsondata){
				var data = JSON.parse(jsondata);
				//更新html
			},
			error:function(jqXHR){
				alert('发生错误:'+jqXHR.status);
			}
		});
	},500);
}

$(function(){
	var blue = $$("blue");
	var red = $$("red");

	//蓝色悬浮事件
	$("#blue").hover(function(){
		blue.className += " b-long";
		red.className += " r-short";
	},function(){
		blue.className = blue.className.substr(0,blue.className.length-7);
		red.className = red.className.substr(0,red.className.length-8);
	});

	//红色悬浮事件
	$("#red").hover(function(){
		red.className += " r-long";
		blue.className += " b-short";
	},function(){
		red.className = red.className.substr(0,red.className.length-7);
		blue.className = blue.className.substr(0,blue.className.length-8);
	});

	//蓝色点击事件
	$("#blue img,#blue p").click(function(){
		blue.className += " b-click";
		blue.getElementsByTagName("img")[0].className += " invisible";
		blue.getElementsByTagName("p")[0].className = "invisible";

		red.className += " r-none";
		$("#blue").unbind();
		
		skip(0);
	});

	//红色点击事件
	$("#red img,#red p").click(function(){
		red.className += " r-click";
		red.getElementsByTagName("img")[0].className += " invisible";
		red.getElementsByTagName("p")[0].className = "invisible";

		blue.className += " b-none";
		$("#red").unbind();

		skip(1);
	});
})