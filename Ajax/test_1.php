<?php
	header("Conent-Type:application/json;charset=utf-8");
	header("Access-Control-Allow-Origin:*");
	header("Access-control-Allow-Method:POST,GET");

	$number = $_GET['number'];
	$response;

	if(!empty($number) && is_numeric($number)) {
		$what = $number % 2;

		if ($what) {90
			$response = array('success'=>true,
					'msg'=>$number.'是奇数');
			$response = json_encode($response);			
			//$response = '{"success":true,"msg":"'.$number.'是奇数"}';
		} else {
			$response = '{"success":true,"msg":"'.$number.'是偶数"}';
		}
	} else {
		$response = '{"success":false,"msg":"参数非法"}';
	}

	echo $response;
?>