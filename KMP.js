// KMP.js

function KMP(targetStr, useStr) {
	var next = [0, 1], i, j;
 	
 	//计算next数组
	for(i = 2; i < useStr.length; i++) {
		if(useStr[i-1] == useStr[next[i-1] - 1])	next[i] = next[i-1] + 1;
		else {
			var cache = next[next[i-1] - 1];

			while(cache) {
				if(useStr[i-1] == useStr[cache - 1]) {
					next[i] = next[cache] + 1;break;
				} else {
					cache = next[cache - 1];
				}
			}

			if(cache == 0)	next[i] = 1;
		}
	}

	//字符串匹配
	i = j = 0;
	while (j < targetStr.length && i < useStr.length) {
	  	if (targetStr[j] === useStr[i])
	    	{i++;j++;}
	  	else {
	    	j = next[j-1];
	    	if(j == 0)
    		{j++;i++;}
	  	}
	}

	//匹配结果返回
	if (j >= targetStr.length)	return (i - targetStr.length + 1);
	else						return 0;
}

// var target = "abc";
// var use = "abaabcac";

// KMP(target, use);