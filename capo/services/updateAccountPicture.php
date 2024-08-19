<?php 

		include("../../services/dbCon.php");
		session_start();
		
		$dir="../../profilePic/";
		$postPicture=postImage($dir,"accountPic");
		
		if(!empty($postPicture)){
			$sql="UPDATE caposandra SET pic='{$postPicture}' WHERE myCaposandra=1";
			$query=mysqli_query($connection, $sql);
			
			if($query){echo $postPicture;} else{echo 1;}
		}
		
		mysqli_close($connection);

	

?>
<?php
	function postImage($dir,$name)
	{ 
		// Getting file name
            $filename = $_FILES[$name]['name'];
         
            // Valid extension
            $valid_ext = array('png','jpeg','jpg','gif');

            // Location
            $location = $dir.$filename;

            // file extension
            $file_extension = pathinfo($location, PATHINFO_EXTENSION);
            $file_extension = strtolower($file_extension);

            // Check extension
            if(in_array($file_extension,$valid_ext)){  

                // Compress Image
                $file=compressImage($_FILES[$name]['tmp_name'],$location,20);
				return $file;

            }else{
                echo "Invalid file type.";
            }
		
	}
	
	 // Compress image
        function compressImage($source, $destination, $quality) {

            $info = getimagesize($source);

            if ($info['mime'] == 'image/jpeg') 
                $image = imagecreatefromjpeg($source);

            elseif ($info['mime'] == 'image/gif') 
                $image = imagecreatefromgif($source);

            elseif ($info['mime'] == 'image/png') 
                $image = imagecreatefrompng($source);

            if(imagejpeg($image, $destination, $quality)){return $destination;}
			else{return "";}

        }
?>

