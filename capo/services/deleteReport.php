<?php 

	include("../../services/dbCon.php");
	
		$sql="DELETE FROM report WHERE id={$_POST["reportId"]}";
		$sql=mysqli_query($connection,$sql);

		if($sql){echo 0;} else{echo 1;}

	mysqli_close($connection);

?>

