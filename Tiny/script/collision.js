function momEatFruit(){
	if(!data.gameOver){
		var l;
		for(var i = 0; i < fruit.num; i++){
			if(fruit.alive[i]){
				l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
				if(l < 900){
					fruit.dead(i);
					data.fruitNum++;
					if(mom.bodyNum <7)
					{mom.bodyNum++;}
					if(fruit.col[i] < fruit.blueChance)
					{data.double = 2;}
					wave.born(fruit.x[i], fruit.y[i]);
				}
			}
		}
	}
}

function momKissBaby(){
	if(data.fruitNum && !data.gameOver){
		var l;
		l = calLength2(baby.x, baby.y, mom.x, mom.y);
		if(l < 900){
			baby.bodyNum = 0;
			data.reset();
			mom.bodyNum = 0;
			halo.born(baby.x, baby.y);
		}
	}
}