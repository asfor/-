$(function(){
	$('#page').click(function(){
		$("#warp").addClass("warp-click");
	});

	$('.close').click(function(){
		$("#warp").removeClass("warp-click");
	});
})