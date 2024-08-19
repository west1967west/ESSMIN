<?php 

	include("../../services/dbConPDO.php");
	
		$rowCount=$_GET["rowCount"];
		$sql="SELECT a.fullname,a.username,a.email, b.plan,b.percent,b.dur,b.widCount, ";
		$sql.="c.id,c.accName,c.accNo,c.bankName,c.bankBranch,c.reqAmount,c.reqStatus,c.dateAdded,c.invId ";
		$sql.="FROM myInvestors a,currentInvestors b,withdrawalRequest c  ";
		$sql.="WHERE ((c.userId=a.id) AND (c.userId=b.userId)) AND (c.invId=b.id) ORDER BY c.id DESC LIMIT $rowCount,100";
		
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>

