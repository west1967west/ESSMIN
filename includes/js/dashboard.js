//JILLS-PAY JAVASCRIPT-----------------------------------------------------------------------------------------------------------------------------------------
//JILLS-PAY JAVASCRIPT-----------------------------------------------------------------------------------------------------------------------------------------
//JILLS-PAY JAVASCRIPT-----------------------------------------------------------------------------------------------------------------------------------------
	
verifyInvestor();
	
$("document").ready(function(){
	
	$("#newInvestmentBtn").click(function(){ $("#dashboardMenu").hide(); $("#newInvestmentMain").show(); checkNewInvestStatus(); });
	$("#myInvestmentBtn").click(function(){ $("#dashboardMenu").hide(); $("#myInvestmentMain").show(); getMyInvestment();});
	$("#myInvestmentProfitBtn").click(function(){ $("#myInvestmentMain").hide(); $("#myProfitMain").show(); myProfitMain();});
	$("#myProfitBtn").click(function(){ $("#dashboardMenu").hide(); $("#myProfitMain").show(); myProfitMain(); });
	$("#myProfileBtn").click(function(){ $("#dashboardMenu").hide(); $("#myProfileMain").show();  });
	$("#myProfitWithdrawalBtn").click(function(){ $("#myProfitMain").hide(); $("#myWithdrawalMain").show(); loadWithdrawal();  });
	$("#myWithdrawalBtn").click(function(){ $("#dashboardMenu").hide(); $("#myWithdrawalMain").show(); loadWithdrawal();  });
	$("#investmentHomeBtn").click(function(){ $("#newInvestmentMain").hide(); $("#dashboardMenu").show(); });
	$("#orderHomeBtn").click(function(){ $("#newInvestmentDetails").hide(); $("#dashboardMenu").show(); });
	$("#myInvestmentHomeBtn").click(function(){ $("#myInvestmentMain").hide(); $("#dashboardMenu").show(); });
	$("#myProfitHomeBtn").click(function(){ $("#myProfitMain").hide(); $("#dashboardMenu").show(); });
	$("#myProfileHomeBtn").click(function(){ $("#myProfileMain").hide(); $("#dashboardMenu").show(); });
	$("#myWithdrawalHomeBtn").click(function(){ $("#myWithdrawalMain").hide(); $("#dashboardMenu").show(); });
	$("#myWithdrawalFormBtn").click(function(){ $("#withdrawalRequestForm").show();  });

	$("#selectPercentageOption").change(function(){
		if($(this).val()=="15%"){$("#selectDuration").show();}
		else{$("#selectDuration").hide();}
	});
	//$("#per15Select").click(function(){ $("#selectDuration").show(); });
	//$("#per30Select").click(function(){ $("#selectDuration").hide(); });
	$("#logoutBtn").click(function(){ logout(); });

//SELECT PLAN FORM SERVER--------------------------------------------------------------------------------------------------------------------------------------	
	$("#selectPlanForm").on("submit",(function(e){
			e.preventDefault();
			
			var plan=$("#selectPlanOption").val();
			var percentage=$("#selectPercentageOption").val();
			var duration=$("#selectDurationOption").val();
			var price=0;
			
			if((plan=="NULL")&&(percentage=="NULL")){swal("Alert!!","Please select a plan and percentage from the dropdown option","error");}
			else if(plan=="NULL"){swal("Alert!!","Please select a plan from the dropdown option","error");}
			else if(percentage=="NULL"){swal("Alert!!","Please select a percentage from the dropdown option","error");}
			else{
				if((percentage=="15%")&&(duration=="NULL")){swal("Alert!!","Please select a duration for your investment from the dropdown option","error");}
				else{
						if(percentage=="30%"){duration=10;}
						if(plan=="BASIC"){price=10000;}
						else if(plan=="BRONZE"){price=20000;}
						else if(plan=="SILVER"){price=40000;}
						else if(plan=="GOLD"){price=60000;}
						else if(plan=="PLATINUM"){price=80000;}
						else {price=100000;}
					
						$("#newInvestmentMain").hide();
						$("#newInvestmentDetails").show();
						
						$("#orderFullname").text(myData.fullname);
						$("#orderEmail").text(myData.email);
						$("#orderPhone").text(myData.phone);
						$("#orderPlan").text(plan);
						$("#orderPercentage").text(percentage);
						$("#orderDuration").text(duration);
						$("#orderPrice").text(price);
						$("#orderStatus").text("Pending");
					}
			
				
			}		 
				
		}));

//WITHDRAWAL REQUEST FORM SERVER-------------------------------------------------------------------------------------------------------------------------------		
		$("#withdrawalRequestForm").on("submit",(function(e){
			e.preventDefault();
			
			$.ajax({
			
			   url: "services/newWithdrawalRequest.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
			   beforeSend : function()
			   {
				$("#sendWithdrawalBtn").text("Sending...");
				$("#sendWithdrawalBtn").addClass("disabled");
				
			   },
			   success: function(data)
				  {
					 
					 if(data==0){swal("Success !!","Your Withdrawal Request Has Been Sent, You Would Receive Your Profit In Your Local Bank Account Within 48 hours, Thank You For Using JILLS-PAY","success");
						$("#withdrawalContainer").html("<div class='alert alert-info '>Your Have Already Placed A Withdrawal Request, Please Stay Calm While Your Request Is Been Approved And Credited Into Your Local Bank Account Or Contact Admin For Futher Enquiry.</div>");
						getMyInvestmentData();
						
					 }
					 if(data!=0){swal("Error !!",data+" Please Contact Admin,","error");}
					 
					
					 $("#sendWithdrawalBtn").html("<i class='fa fa-send'></i> Send");
					 $("#sendWithdrawalBtn").removeClass("disabled");
					 
					 }

				});
			
		}));
//UPDATE ACCOUNT PICTURE---------------------------------------------------------------------------------------------------------------------------------------

$("#updateAccountPicForm").on("submit",(function(e){
			e.preventDefault();
			
			$.ajax({
			
			   url: "services/updateAccountPicture.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
				beforeSend : function()
			   {
				$("#updateProfilePicBtn").addClass("disabled");
				$("#updateProfilePicBtn").text("Updating...");
				
			   },
			   success: function(data)
				  {
					 if(data!=1){
						 
						 $("#profilePic1").attr("src",data.replace("../",""));
						 $("#profilePic2").attr("src",data.replace("../",""));
						 swal("Success !!","Account Picture Updated","success");
						 $("#updateProfilePicBtn").removeClass("disabled");
						 $("#updateProfilePicBtn").text("Update Picture");
						 updateMyInvestorData();
					 
					 }
					 if(data==1){swal("Error !!",data,"error");
						 $("#updateProfilePicBtn").removeClass("disabled");
						 $("#updateProfilePicBtn").text("Update Picture");
					 }
					 
					
				  } 
				
				});
			
		}));

//UPDATE ACCOUNT DATA------------------------------------------------------------------------------------------------------------------------------------------
		
		$("#updateAccountInfoForm").on("submit",(function(e){
			e.preventDefault();
			
			$.ajax({
			
			   url: "services/updateAccountDetails.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
				beforeSend : function()
			   {
				$("#updateDataBtn").addClass("disabled");
				$("#updateDataBtn").text("Updating...");
				
			   },
			   success: function(data)
				  {
					 if(data==0){
					 swal("Success !!","Account Data Updated","success");
					 $("#updateDataBtn").removeClass("disabled");
					 $("#updateDataBtn").text("Update Data");
					 updateMyInvestorData();
					 
					 }
					 if(data!=0){swal("Error !!",data,"error");}
					 
					
				  } 
				
				});
			
		}));
		
		
});

//ADD NEW INVESTMENT-------------------------------------------------------------------------------------------------------------------------------------------
		
function addInvestment(reference){
$.post("services/addInvestment.php",
			{ref:reference,
			plan:$("#orderPlan").text(),
			percent:$("#orderPercentage").text(),
			dur:$("#orderDuration").text()},
			function(data){
			
				if(data==0){ 
				$("#orderLoaderContainer").hide();
				$("#orderInfoContainer").show();
				$("#orderStatus").html('<b class="text-success">PAID</b>');
				swal("Success!!","Transaction Verified Successfully, You Can Click On My Investment In Dashboard For More Details.","success");
				getMyInvestmentData();
				getAllMyInvestmentData();
				checkNewInvestStatus();
				}
				
				if((data==1)||(data!=0)){
				swal("Alert!!","An Unknow Error Has Occured, Please Contact Admin","error");
				$("#orderLoaderContainer").hide();
				$("#orderInfoContainer").show();
				$("#orderStatus").html('<b class="text-danger">NOT VERIFIED</b>');
				}
	});
}

//MY INVESTMENT//------------------------------------------------------------------------------------------------------------------------------------------------					
					
function getMyInvestment(){
					var i=0;
					var text='';
					var tBody='';
					var price=0;
					var data=localStorage.allMyInvestment;
					
					if(data==null || data=="null"){
					$("#myInvestmentTb").html('<div class="alert alert-info">Opps!! You have not made any investment yet</div>');
					
					}
					else{
							data=JSON.parse(data);

							for(i=0;i<data.length;i++){
							text='<tr>';
							text+='<td>'+data[i].refId+'</td>';
							text+='<td>'+data[i].plan+'</td>';
							
							if(data[i].plan=="BASIC"){price=10000;}
							else if(data[i].plan=="BRONZE"){price=20000;}
							else if(data[i].plan=="SILVER"){price=40000;}
							else if(data[i].plan=="GOLD"){price=60000;}
							else if(data[i].plan=="PLATINUM"){price=80000;}
							else {price=100000;}
						
							text+='<td>'+price+'</td>';
							text+='<td>'+data[i].percent+'</td>';
							text+='<td>'+data[i].dur + ' Month ' +'</td>';
							text+='<td>'+data[i].dateAdded+'</td>';
							if(data[i].widCount != data[i].dur){text+='<td><b class="text-success">Active</b></td>';}
							else{text+='<td><b class="text-danger">Terminated</b></td>';}
							text+='</tr>';
							tBody=tBody+text;
							
							}
							var tHead='<tr  class=""><th>Ref Id</th><th>Plan</th><th>Amount</th><th>Profit</th><th>Duration</th><th>Date Invested</th><th>Status</th></tr>';
							
							$("#myInvestmentTb").html(tHead+tBody);
						
						}
				
}

//MY PROFIT COUNT DOWN AND INFORMATION //-------------------------------------------------------------------------------------------------------------------------

function myProfitMain(){
	$("#profitInfoContainer").hide();
	$("#profitLoaderContainer").show();
			
	var data=localStorage.myInvestment;
					
		if(data==null || data=="null"){
				$("#profitLoaderContainer").hide();
				$("#profitInfoContainer").html('<div class="alert alert-info">You have not made any investment yet, please click on NEW INVESTMENT in dashboard, select a plan and make an investment. After that you can come back here to see the progress of your investment. Thank you For Using JILLS-PAY</div>');
				$("#profitInfoContainer").show();
		}
		else{
				
				data=JSON.parse(data);

				if(data[0].widCount==data[0].dur){
					
					$("#profitLoaderContainer").hide();
					$("#profitInfoContainer").html('<div class="alert alert-info">You have not made any investment yet, please click on NEW INVESTMENT in dashboard, select a plan and make an investment. After that you can come back here to see the progress of your investment. Thank you For Using JILLS-PAY</div>');
					$("#profitInfoContainer").show();
				}

				else{

					dt=new Date(Date.parse(data[0].dateAdded.replace('-','/','g')));
					var n=parseInt(data[0].crdCount) +1;
					var n2=parseInt(data[0].dur) - n;
					var newDt=add_months(dt,n);
					var exitDt=add_months(dt,n2).toString();
					var currDate=new Date();
					var timeDiff=newDt.getTime() - currDate.getTime();
					var dayDiff=Math.ceil(timeDiff/(1000 *3600 *24));
					
					if(dayDiff<=0){$("#profitInfoContainer").html('<div class="alert alert-info">You account has been credited for the month, click on withdraw and place a withdrawal request, after your withdrawal has been approved, count down to next investment profit would start, thank you for using JILLS-PAY.</div>');}
					else{
					startProfitCountDown(newDt);
					var text='';
					var price=0;
					var percent=data[0].percent.replace('%','');
					percent=parseInt(percent);
					if(data[0].plan=="BASIC"){price=10000;}
					else if(data[0].plan=="BRONZE"){price=20000;}
					else if(data[0].plan=="SILVER"){price=40000;}
					else if(data[0].plan=="GOLD"){price=60000;}
					else if(data[0].plan=="PLATINUM"){price=80000;}
					else {price=100000;}
					
					percent=(price*percent)/100;
					text='<tr><td>Investment Plan: '+data[0].plan+'</td></tr>';
					text+='<tr><td>Expected Profit: '+percent+' Naira</td></tr>';
					text+='<tr><td>Expected Date: '+newDt+'</td></tr>';
					text+='<tr><td >Credited '+data[0].crdCount+' Of '+data[0].dur+' Investment Profit</td></tr>';
					text+='<tr><td >Withdrawn '+data[0].widCount+' Of '+data[0].dur+'  Investment Profit</td></tr>';
					text+='<tr><td >Date Till Total Investment Terminate: '+exitDt+' </td></tr>';
					$("#profitInfoTb").html(text);
					}
					$("#profitLoaderContainer").hide();
					$("#profitInfoContainer").show();
				}
				
			}
	
	
	
}

//CREDITING ACCOUNT AND WITHDRAWAL REQUEST//---------------------------------------------------------------------------------------------------------------------

function loadWithdrawal(){
	
	var data=localStorage.myInvestment;

	if(data==null || data=="null"){	$("#withdrawalContainer").html('<div class="alert alert-info ">Opps!!, You have not made any investment yet, please click on NEW INVESTMENT in dashboard, select a plan and make an investment. After your investment profit have been credited, then you can come back here to make a withdrawal request. Thank you For Using JILLS-PAY</div>');}


	else{

		data=JSON.parse(data);

		if(data[0].widCount == data[0].dur){
		$("#withdrawalContainer").html('<div class="alert alert-info ">Opps!!, You have not made any investment yet, please click on NEW INVESTMENT in dashboard, select a plan and make an investment. After your investment profit have been credited, then you can come back here to make a withdrawal request. Thank you For Using JILLS-PAY</div>');
		}
		else{

		if(data[0].reqStatus==0){
			currDate=new Date();
			
			var n=parseInt(data[0].crdCount) +1;
			var expDate=new Date(Date.parse(data[
			0].dateAdded.replace('-','/','g')));
				expDate=add_months(expDate,n);
			var timeDiff=expDate.getTime() - currDate.getTime();
			var dayDiff=Math.ceil(timeDiff/(1000 *3600 *24));
			
			
			if(dayDiff<=0){
				
				var price=0;
				var percent=data[0].percent.replace('%','');
				percent=parseInt(percent);
				if(data[0].plan=="BASIC"){price=10000;}
				else if(data[0].plan=="BRONZE"){price=20000;}
				else if(data[0].plan=="SILVER"){price=40000;}
				else if(data[0].plan=="GOLD"){price=60000;}
				else if(data[0].plan=="PLATINUM"){price=80000;}
				else {price=100000;}
				
				percent=(price*percent)/100;
				$("#myWithdrawalBalance").text(percent+ " N");
				$("#reqAmount").val(percent);
				$("#crd").val(data[0].crdCount);
				$("#req").val(data[0].id);
			}
			else{ $("#withdrawalContainer").html("<div class='alert alert-info '>Your Account Has Not Been Credited Yet, Click On Profit In Dashboard To See The Progress Of Your Investment.</div>"); }
		}
		else{ $("#withdrawalContainer").html("<div class='alert alert-info '>Your Have Already Placed A Withdrawal Request, Please Stay Calm While Your Request Is Been Approved And Credited Into Your Local Bank Account Or Contact Admin For Futher Enquiry. You Would Receive An Email From Us Once The Transaction Is Complete. Thank You For Using JILLS-PAY.</div>"); }
			
		}
	}
			$("#withdrawalLoaderContainer").hide();
			$("#withdrawalContainer").show();
		
}


//SUPPORT FUNCTIONS -------------------------------------------------------------------------------------------------------------------------------------------

function verifyInvestor(){
	myData=localStorage.getItem("myInvestors");
	
	if (myData == null || myData == "null"){window.location.href='login.html';}
	else{
		$("#pageLoading").hide();
		$("#dashboard").show();
		myData=JSON.parse(myData);
		$("#profilePic1").attr("src",myData.pic.replace("../",""));
		$("#profilePic2").attr("src",myData.pic.replace("../",""));
		
		$("#dashboardName").text(myData.fullname);
		$("#fullnameInput").val(myData.fullname);
		$("#phoneInput").val(myData.phone);
		$("#passwordInput").val(myData.password);
		$("#emailInput").val(myData.email);
		$("#usernameInput").val(myData.username);
		getMyInvestmentData();
		getAllMyInvestment();
	}
}


function updateMyInvestorData(){
	$.getJSON("services/getUserData.php",function(data){
	localStorage.setItem("myInvestors",JSON.stringify(data));
	$("#dashboardName").text(data.fullname);
	});
	myData=JSON.parse(localStorage.getItem("myInvestors")) ;
	
}
function getMyInvestmentData(){
	$.getJSON("services/getMyInvestment.php",function(data){
	if(data != ""){ localStorage.setItem("myInvestment",JSON.stringify(data));} });
}

function getAllMyInvestment(){
	$.getJSON("services/getAllMyInvestment.php",function(data){
	if(data != ""){localStorage.setItem("allMyInvestment",JSON.stringify(data));} });

}

function checkNewInvestStatus(){
	var myInvestment=localStorage.myInvestment;
	
	if (myInvestment != null && myInvestment !="null"){
		myInvestment=JSON.parse(myInvestment);
		if(myInvestment[0].widCount==myInvestment[0].dur){}
		else{
		$("#newInvestmentContainer").html("<div class='alert alert-info'>Opps!!, You have already invested in <b>"+myInvestment[0].plan+" PLAN</b>, You cant add a new investment till your current investment has terminated. You can check profit in your dashboard to see the progress of your investment. Thank you for using JILLS-PAY.</div>");
		}
	}
}


function checkChar(id){
		var me=$("#"+id);
		if(/[<;'"(){}$]/g.test(me.val())){me.val(me.val().replace(/[<;'"(){}$]/g,'')); swal("[<;(){}$] Are Not Allowed");}
}

function add_months(td,n){
	return new Date(td.setMonth(td.getMonth()+n));
}

function logout(){
			$.post("services/logoutScript.php",function(data){if(data==0){
				
				localStorage.removeItem("myInvestors"); 
				localStorage.removeItem("myInvestment"); 
				localStorage.removeItem("allMyInvestment"); 
				window.location.href="index.html";
				
				}});	
}

//PROFIT COUNT DOWN -------------------------------------------------------------------------------------------------------------------------------------------
function startProfitCountDown(myDate){
	// set the date we're counting down to
	var target_date = new Date(myDate).getTime();
	 
	// variables for time units
	var days, hours, minutes, seconds;
	 
	// get tag element
	var countdown = document.getElementById('countdown');
	 
	// update the tag with id "countdown" every 1 second
	setInterval(function () {
	 
		// find the amount of "seconds" between now and target
		var current_date = new Date().getTime();
		var seconds_left = (target_date - current_date) / 1000;
	 
		// do some time calculations
		days = parseInt(seconds_left / 86400);
		seconds_left = seconds_left % 86400;
		 
		hours = parseInt(seconds_left / 3600);
		seconds_left = seconds_left % 3600;
		 
		minutes = parseInt(seconds_left / 60);
		seconds = parseInt(seconds_left % 60);
		 
		// format countdown string + set tag value
		countdown.innerHTML='<div class="timer-wrapper"><div class="time">'+days+'</div><span class="text">days</span></div><div class="timer-wrapper"><div class="time">' + hours + '</div><span class="text">hrs</span></div><div class="timer-wrapper"><div class="time">'+ minutes + '</div><span class="text">mins</span></div><div class="timer-wrapper"><div class="time">' + seconds + '</div><span class="text">sec</span></div>';
									   
		//countdown.innerHTML = '<span class="days">' + days +  ' <label>Days</label></span> <span class="hours">' + hours + ' <label>Hours</label></span> <span class="minutes">'
		//+ minutes + ' <label>Minutes</label></span> <span class="seconds">' + seconds + ' <label>Seconds</label></span>';  
	 
	}, 1000);

	
	
}


//PAY STACK FUNCTION ------------------------------------------------------------------------------------------------------------------------------------------

function payWithPaystack() {
	
	var price=$("#orderPrice").text() +'00';
	price=parseInt(price);
	if(!myData.email.includes(".com")){swal("Alert !!","Please Make Sure Your Email Address Is Correct, If Not Update It In Your Profile And Refresh The Page","error");}
    var handler = PaystackPop.setup({ 
        key: 'pk_test_d28ec734f1cd940c2d911cddf62d3dd6d3783a37', 
        email: myData.email, 
        amount: price, 
        metadata: {
            custom_fields: [
                {
                    display_name: "Mobile Number",
                    variable_name: "mobile_number",
                    value: myData.phone 
                }
            ]
        },
        callback: function (response) {
            $("#orderInfoContainer").hide();
			$("#orderLoaderContainer").show();

			
            $.post("services/paystackVerification.php", {reference:response.reference}, function(status){
                if(status == "success"){addInvestment(response.reference);}
                else{
				swal("Alert!!",status,"info");  
				$("#orderLoaderContainer").hide();
				$("#orderInfoContainer").show();
				$("#orderStatus").html('<b class="text-danger">NOT VERIFIED</b>');
				}
            });
			
        },
        onClose: function () {
           $("#orderStatus").text("Transaction Cancelled");
        }
    });
    handler.openIframe(); 
}