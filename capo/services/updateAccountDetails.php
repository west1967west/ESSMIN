<?php 

	
		include("../../services/dbCon.php");
		
		$email=$_POST["email"];
		$currKey=$_POST["accesskey1"];
		$newKey=$_POST["accesskey2"];
		
		$sql="SELECT * FROM caposandra WHERE capoKey='{$currKey}'";
		$query=mysqli_query($connection, $sql);
		if(mysqli_num_rows($query)>0){
			$sql="UPDATE caposandra SET capoKey='{$newKey}', email='{$email}' WHERE myCaposandra=1";
			$query=mysqli_query($connection, $sql);
			if($query){echo 0;} else{echo 1;}
		}
		else{echo 1;}

		mysqli_close($connection);

	

?>

