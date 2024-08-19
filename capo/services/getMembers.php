<?php 

	include("../../services/dbConPDO.php");
	
		$rowCount=$_GET["rowCount"];
		$sql="SELECT * FROM myInvestors ORDER BY id DESC LIMIT $rowCount,100";
		
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>

