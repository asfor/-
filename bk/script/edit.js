$(function(){
	//添加导航栏
	var navigation = new nav();
	navigation.load();

	//提交事件
	$("#submit").click(function(){
		var content = $("#container").html();
		var link = "";
		
		$.ajax({
			type:"POST",
			url:link,
			data:content,
			success:function(){
				$.ajax({
					type:"GET",
					url:"",
					datatype:"json",
					success:function(jsondata){
						var data = JSON.parse(jsondata);
						//更新HTML
					},
					error:function(jqXHR){
						alert(jqXHR.status);
					}
				});
			},
			error:function(jqXHR){
				alert(jqXHR.status);
			}
		});
	});
})