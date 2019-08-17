<?php
	/* 
		1) Receive query in form of GET request from client
		2) Process query
		3) Send query to Elasticsearch
		4) Process response
		5) Send response to client
	*/

	$query = $_POST['query'];

	$body = json_encode(array(
		"from" => 0, "size" => 5,
		'query' => array(
			'multi_match' => array(
				'query' => $query,
				'fields' => array(
					'postcode',
					'area',
					'town'
				)
			)
		)
	));

	$ch = curl_init();

	$ch = curl_init('http://localhost:9200/postcode/_search/');
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
	curl_setopt($ch, CURLOPT_POSTFIELDS, $body);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
	    'Content-Type: application/json',                                                                                
	    'Content-Length: ' . strlen($body))                                                                       
	);          

	$response = curl_exec($ch);

	curl_close($ch);

	echo $response;
	// echo $body;