
$("document").ready(function(){

	$("#signupForm").on("submit",(function(e){
			e.preventDefault();
			
			$.ajax({
			
			   url: "services/signupScript.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
			   beforeSend : function()
			   {
				$("#signupBtn").text("Processing...");
				$("#signupBtn").addClass("disabled");
				
			   },
			   success: function(data)
				  {
					 if(data==2){swal("Alert !!","Either Username,Phone Number Or Email Already Exist. If you already have an account please login or click on forget password in the login area if you cant remember your password.","error");}
					 if(data==1){swal("Alert !!","An error has occured,please try again later or contact admin","error");}
					 if(data==0){$("#signupForm").hide(); $("#successMsg").show();}
					
					 $("#signupBtn").text("Register");
					 $("#signupBtn").removeClass("disabled");
					 
					 }

				});
			
		}));

	$("#loginForm").on("submit",(function(e){
			e.preventDefault();
			
			$.ajax({
			
			   url: "services/loginScript.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
			   beforeSend : function()
			   {
				$("#loginBtn").text("Processing...");
				$("#loginBtn").addClass("disabled");
				
			   },
			   success: function(data)
				  {
					 
					 if(data==1){swal("Alert !!","Incorrect Username Or Password","error");}
					 else{ var myData=JSON.parse(data); localStorage.setItem("myInvestors",JSON.stringify(myData)); window.location.href="dashboard.html";}
					
					 $("#loginBtn").text("Login");
					 $("#loginBtn").removeClass("disabled");
					 
					 }

				});
			
		}));

		$("#reportForm").on("submit",(function(e){
				e.preventDefault();
				$("#btnSend").addClass("disabled");
				
				var contactData=$("#contact").val();
				var messageData=$("#report").val();
				var name=$("#fullname").val();
				$.post("services/report.php",{contact:contactData, message:messageData, fullname:name},
				function(data){
					if(data==0){
						swal("Success!!","Report Sent Successfully. Thank You For Using JILLS-Pay","success");
						$("#btnSend").removeClass("btn-primary");
						$("#btnSend").removeClass("disabled");
						$("#btnSend").addClass("btn-success");
						$("#contact").val('');
						$("#report").val('');
						$("#fullname").val('');
						
						}
					if(data!=0){swal("Error!!","Report Not Sent","error");}
				});	
		
			}));

		var trial=0;
		$("#formOneSubmit").click(function(){
			$("#formOneSubmit").addClass("disabled");
			$("#formOneSubmit").text("Loading....");
			username=$("#username").val();
			no=$("#phone").val();
			email=$("#email").val();
			$.post("services/passwordRecovery.php",{action:"verifyUser",user:username,phone:no,mail:email },
			function(getData){
			var data=JSON.parse(getData);
				if(getData == 1){
				swal("Verification Error !!","Username,Email Or Phone Number Incorrect","error");
				$("#formOneSubmit").removeClass("disabled");
				$("#formOneSubmit").text("Continue");
				}
				else{
					$("#formOne").hide();
					$("#formTwo").show();
					$("#question").text(data.keyQuestion + "?");
					$("#qa").val(data.keyAnswer);
				}
			});
			
		});
		
		
		$("#formTwoSubmit").click(function(){
			$("#formTwoSubmit").addClass("disabled");
			$("#formTwoSubmit").text("Loading....");
	
			
				if(($("#answer").val()) != ($("#qa").val())){
				trial++;
				if(trial<5){
					swal("Verification Error !!","Incorrect Answer","error");
					$("#username").val("");
					$("#phone").val();
					$("#email").val("");
					$("#qa").val("");
					 }
				
				if(trial>4){$("#formTwo").hide();
				$("#trial").show();}
				
				$("#formTwoSubmit").removeClass("disabled");
				$("#formTwoSubmit").text("Continue");
				}
				else{
					$("#formTwo").hide();
					$("#success").show();
				}
			
			
		});
		
		$("#completeProcess").click(function(){
			
			$("#completeProcess").addClass("disabled");
			$("#completeProcess").text("Loading Profile...");
			
			$.post("services/loginScript.php",{redirectUser:username},function(response){
			if(response!=1){ var myData=JSON.parse(response); localStorage.setItem("myInvestors",JSON.stringify(myData)); window.location.href="dashboard.html";
					$("#username").val("");
					$("#phone").val();
					$("#email").val("");
					$("#qa").val("");
		}
			//else{swal(response);}
			});
		});
		
		
		$("#accessKey2").blur(function(){
			if($(this).val() != $("#accessKey").val()){swal("Password Must Match");}
		});

		
		$("#continue").click(function(){
			$("#continue").text("Processing...");
			$("#continue").addClass("disabled");
			$.post("services/loginScript.php",{redirectUser:$("#username").val()},function(data){
					 if(data==1){swal("Error !!","Please Login To Continue Or Contact Admin","error");}
					else{ var myData=JSON.parse(data); localStorage.setItem("myInvestors",JSON.stringify(myData)); window.location.href="dashboard.html";}
					
					$("#continue").text("Continue");
					$("#continue").removeClass("disabled");
			});
		});

});

function checkChar(id){
		var me=$("#"+id);
		if(/[<;'"(){}$]/g.test(me.val())){me.val(me.val().replace(/[<;'"(){}$]/g,'')); swal("[<;(){}$] Are Not Allowed");}
		}
