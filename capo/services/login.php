<?php 

	include("../../services/dbCon.php");
		
		$sql="SELECT pic,email FROM caposandra WHERE capoKey='{$_POST["key"]}'";
		$sql=mysqli_query($connection,$sql);
		if(mysqli_num_rows($sql)>0){
			$data=mysqli_fetch_array($sql);
			$data=json_encode($data);
			echo $data;
		}
		else{echo 1;}
		
		

	

?>

