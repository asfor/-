$(function(){
	$('#zongzi').click(function(){
		var zz_cls='.line-';
		var t_cls='.text-';

		$('#zongzi').css({
			'-webkit-animation':'0',
			'cursor':'default'
		});
		setTimeout(function(){zongzi_move(1);},350);

		function zongzi_move(i){
			var line = zz_cls + i;
			var up =120 + (i*56);
			//alert(i);
			$(line).css({
				'top':up+'px',
				'opacity':0
			});

			line = zz_cls + (i+1);
			$(line).css('opacity',1);

			if(i==2)
			{setTimeout(function(){text_move(1);},500);}

			if(i<3){
				setTimeout(function(){zongzi_move(i+1);},350);
			} else {
				setTimeout(function(){open_zongzi();},350);
			}
		}

		function text_move(i){
			var text = t_cls + i;

			$(text).css({
				'left':'185px',
				'opacity':1
			});

			if(i<3) 
			{setTimeout(function(){text_move(i+1);},500);}
		}

		function open_zongzi(){
			$('.line-4').css('-webkit-transition','all 1s ease-out');
			$('.zongzi').css('opacity',0);
			$('.line-4').css('opacity',0);
			$('.rou').css({
				'opacity':1,
				'-webkit-transform':'scale(1)'
			});
			$('.left-leaf').css({
				'opacity':1,
				'-webkit-transform':'rotate(0deg)'
			});
			$('.right-leaf').css({
				'opacity':1,
				'-webkit-transform':'rotate(0deg)'
			});
			setTimeout(function(){
				$('.left-leaf').css({
					'opacity':0,
					'-webkit-transform':'rotate(-15deg)'
				});
				$('.right-leaf').css({
					'opacity':0,
					'-webkit-transform':'rotate(15deg)'
				});
				$('.bottom-leaf').css('opacity',1);
				$('.text-1').css('-webkit-animation','t_duang infinite 3s linear');
				setTimeout(function(){
					$('#zongzi .text').css('opacity',1);
				},1000);
			},800);
		}
	});
})