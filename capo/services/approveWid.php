<?php 

include("../../services/dbCon.php");
		
		$invId=$_POST["myInvId"];
		$widId=$_POST["myWidId"];
		$widCount=(int) $_POST["myWidCount"];
		$widCount=$widCount+1;
		
		$sql1="UPDATE currentInvestors SET widCount={$widCount}, reqStatus=0 WHERE id={$invId}";
		$sql2="UPDATE withdrawalRequest SET reqStatus=1  WHERE id={$widId}";
		
		$sql1=mysqli_query($connection,$sql1);
		if($sql1){
			$sql2=mysqli_query($connection,$sql2);
			if($sql2){sendMail();}
			else{echo 1;}
		}
		else{echo 1;}
	
mysqli_close($connection);

 ?>

 <?php

function sendMail(){
 	$to  = $_POST["mail"];
	$subject = 'Withdrawal Request Approval';
	$message = 'Hello '. $_POST["user"]. ', Your Current Withdrawal Request For '.$_POST["amount"].' ('.$_POST["myPlan"].') Has Been Approved And Credited Into Your Local Bank Account. For Futher Enquiry Contact Admin. Thank You For Using Jills Pay Investment.';
	$headers = 'From: jillspaycontact@gmail.com' . "\r\n" .
	    'Reply-To: support@jillspay.com.ng' . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();
		mail($to, $subject, $message, $headers);
		echo 0;
	}
 
 ?>