<?php 

	include("../../services/dbConPDO.php");
	
		$rowCount=$_GET["rowCount"];
		$sql="SELECT a.username,b.refId,b.plan,b.percent,b.dur,b.widCount,b.dateAdded FROM myInvestors a, currentInvestors b ";
		$sql.="WHERE a.id=b.userId ORDER BY b.id DESC LIMIT $rowCount,100";
		
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>

