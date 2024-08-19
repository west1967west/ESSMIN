<?php 

	include("../../services/dbConPDO.php");
	
		$sql="SELECT * FROM report ORDER BY id DESC";
		
		
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>

