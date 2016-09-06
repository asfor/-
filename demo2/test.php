<?php
	header("Conent-Type:application/json;charset=utf-8");
	header("Access-Control-Allow-Origin:*");
	header("Access-control-Allow-Method:POST,GET");

	//$con = $_GET['con'];
	$response = '{"just":[';

	for($i=0;$i<10;$i++){
		$response = $response.'{"linbei":"测试'.($i+1).'"}';
		if($i<9)
		{$response = $response.",";}
	}

	$response = $response."]}";

	echo $response;
?>