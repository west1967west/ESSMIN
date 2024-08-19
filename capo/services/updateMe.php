<?php 

	include("../../services/dbCon.php");
		
		$sql="SELECT pic,email FROM caposandra WHERE myCaposandra=1";
		$sql=mysqli_query($connection,$sql);
		if(mysqli_num_rows($sql)>0){
			$data=mysqli_fetch_array($sql);
			$data=json_encode($data);
			echo $data;
		}
		else{echo 1;}
		
		

	

?>

