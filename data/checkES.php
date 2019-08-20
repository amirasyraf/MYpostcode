<?php
	/* 
		Check if ES node is up and running
	*/

	echo file_get_contents('http://localhost:9200');