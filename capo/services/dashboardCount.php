<?php 

	include("../../services/dbCon.php");
	
		$userCount="SELECT count(*) FROM myInvestors";
		$investCount="SELECT count(*) FROM currentInvestors";
		$widCount="SELECT count(*) FROM withdrawalRequest WHERE reqStatus=0";
		$reportCount="SELECT count(*) FROM report";

		$userCount=mysqli_query($connection,$userCount);
		$investCount=mysqli_query($connection,$investCount);
		$widCount=mysqli_query($connection,$widCount);
		$reportCount=mysqli_query($connection,$reportCount);

		$userCount=mysqli_fetch_array($userCount);
		$investCount=mysqli_fetch_array($investCount);
		$widCount=mysqli_fetch_array($widCount);
		$reportCount=mysqli_fetch_array($reportCount);

		$output='{"userCount" : "'.$userCount["count(*)"].'","investCount" : "'.$investCount["count(*)"].'","widCount" : "'.$widCount["count(*)"].'","reportCount" : "'.$reportCount["count(*)"].'"}';
		echo $output;

	mysqli_close($connection);

?>

