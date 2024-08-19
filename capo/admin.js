$(document).ready(function(){
   
    checkMe();
    var activeView="dashboardView";
    rowCount=0;
    dashboardCount();
    getMembers(rowCount);
    getInvestment(rowCount);
    getWithdrawal(rowCount);
    getReport();
    

    $("#dashboardViewBtn").click(function(){$("#"+activeView).hide(); $("#dashboardView").show(); activeView="dashboardView";  });
    $("#membersViewBtn").click(function(){$("#"+activeView).hide(); $("#membersView").show(); activeView="membersView"; });
    $("#investmentViewBtn").click(function(){$("#"+activeView).hide(); $("#investmentView").show(); activeView="investmentView"; });
    $("#withdrawalViewBtn").click(function(){$("#"+activeView).hide(); $("#withdrawalView").show(); activeView="withdrawalView"; });
    $("#reportViewBtn").click(function(){$("#"+activeView).hide(); $("#reportView").show(); activeView="reportView"; });
    $("#profileViewBtn").click(function(){$("#"+activeView).hide(); $("#profileView").show(); activeView="profileView"; });

    $("#membersViewBtn2").click(function(){$("#"+activeView).hide(); $("#membersView").show(); activeView="membersView"; });
    $("#investmentViewBtn2").click(function(){$("#"+activeView).hide(); $("#investmentView").show(); activeView="investmentView"; });
    $("#withdrawalViewBtn2").click(function(){$("#"+activeView).hide(); $("#withdrawalView").show(); activeView="withdrawalView"; });
    $("#reportViewBtn2").click(function(){$("#"+activeView).hide(); $("#reportView").show(); activeView="reportView"; });
    $("#profileViewBtn2").click(function(){$("#"+activeView).hide(); $("#profileView").show(); activeView="profileView"; });

   $('[data-toggle="offcanvas"]').click(function(){
       $("#navigation").toggleClass("hidden-xs");
   });

   $("#invFilter").change(function(){ invFilter($(this).val()); });
   $("#widFilter").change(function(){ widFilter($(this).val()); });

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
                        $("#profilePic3").attr("src",data.replace("../",""));
                        $("#profilePic4").attr("src",data.replace("../",""));
                        
                        swal("Success !!","Account Picture Updated","success");
                        $("#updateProfilePicBtn").removeClass("disabled");
                        $("#updateProfilePicBtn").text("Update Picture");
                        
                        updateMe();
                     
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
                     $("#emailInput").val($("#emailInput").val());
                     updateMe();
                     
                     }
                     if(data!=0){swal("Error !!","Incorrect Password, Try Again Or Contact Developer","error");}
                     
                     $("#updateDataBtn").removeClass("disabled");
                     $("#updateDataBtn").text("Update Data");

                  } 
                
                });
            
        }));
        
        
});




function getMembers(rowCount){

                $.getJSON("services/getMembers.php?rowCount="+rowCount,function(data){
                    var i=0;
                    var text='';
                    var tBody='';
                    var price=0;
                    //var data=localStorage.allMyInvestment;
                    
                    if(data=="" || (data==null || data=="null")){
                        
                    $("#membersData").before('<div class="alert alert-info">Opps!! There Are No Registered Members Yet Or No More Members To Display</div>');
                    
                    }
                    else{
                            if(data.length<100){$("#nextUserBtn").hide(); $("#refreshUserBtn").show();}
                            else{$("#nextUserBtn").show(); $("#refreshUserBtn").hide();}

                            for(i=0;i<data.length;i++){
                            text='<tr>';
                            text+='<td>'+data[i].fullname+'</td>';
                            text+='<td>'+data[i].username+'</td>';
                            text+='<td>'+data[i].email+'</td>';
                            text+='<td>'+data[i].phone+'</td>';
                            text+='<td>'+data[i].password +'</td>';
                            text+='</tr>';
                            tBody=tBody+text;
                            
                            }
                            var tHead='<thead><tr class="bg-success"><th>Name</th><th>Username</th><th>Email</th><th>Phone</th><th>Password</th></tr></thead>';
                            tBody="<tbody>"+tBody+"</tbody>";
                            $("#membersData").html(tHead+tBody);
                        
                        }

                        $("#nextUserBtn").removeClass("disabled"); $("#nextUserBtn").text("Next");
                        $("#refreshUserBtn").removeClass("disabled"); $("#refreshUserBtn").text("Refresh");
                });                   
                
}

function getInvestment(rowCount){

                $.getJSON("services/getInvestment.php?rowCount="+rowCount,function(data){
                    var i=0;
                    var text='';
                    var tBody='';
                    var price=0;
                    //var data=localStorage.allMyInvestment;
                    
                    if(data=="" || (data==null || data=="null")){
                        
                    $("#investmentData").before('<div class="alert alert-info">Opps!! There Are No Registered Members Yet</div>');
                    
                    }
                    else{
                            localStorage.investmentInfo=JSON.stringify(data);

                            if(data.length<100){$("#nextInvBtn").hide(); $("#refreshInvBtn").show();}
                            else{$("#nextInvBtn").show(); $("#refreshInvBtn").hide();}

                            for(i=0;i<data.length;i++){
                            text='<tr>';
                            text+='<td>'+data[i].username+'</td>';
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
                            var tHead='<tr class="bg-success"><th>Username</th><th>Ref Id</th><th>Plan</th><th>Amount</th><th>Profit</th><th>Duration</th><th>Date Invested</th><th>Status</th></tr>';
                            $("#investmentData").html(tHead+tBody);
                        
                        }

                        $("#nextInvBtn").removeClass("disabled"); $("#nextInvBtn").text("Next");
                        $("#refreshInvBtn").removeClass("disabled"); $("#refreshInvBtn").text("Refresh");
                });                   
                
}

function getWithdrawal(rowCount){

                $.getJSON("services/getWithdrawal.php?rowCount="+rowCount,function(data){
                    var i=0;
                    var text='';
                    var tBody='';
                    var price=0;
                    //var data=localStorage.allMyInvestment;
                    
                    if(data=="" || (data==null || data=="null")){
                        
                    $("#withdrawalData").before('<div class="alert alert-info">Opps!! There Are No Registered Members Yet</div>');
                    
                    }
                    else{
                            localStorage.withdrawalInfo=JSON.stringify(data);

                            if(data.length<100){$("#nextWidBtn").hide(); $("#refreshWidBtn").show();}
                            else{$("#nextWidBtn").show(); $("#refreshWidBtn").hide();}

                            for(i=0;i<data.length;i++){
                            text='<tr>';
                            text+='<td>'+data[i].username+'</td>';
                            text+='<td>'+data[i].plan+'</td>';
                            text+='<td>'+data[i].reqAmount+'</td>';
                            if(data[i].reqStatus==0){text+='<td><b class="text-danger">Pending</b></td>';}
                            else{text+='<td><b class="text-success">Approved</b></td>';}
                            text+='<td><button class="btn btn-info btn-block" onclick="withdrawalInfo('+i+')"><i class="fa fa-search-plus "></i> Details</button></td>';
                            text+='</tr>';
                            tBody=tBody+text;
                            
                            }
                            var tHead='<tr class="bg-success"><th>Username</th><th>Plan</th><th>Amount</th><th>Status</th><th>Details</th></tr>';
                            $("#withdrawalData").html(tHead+tBody);
                        
                        }

                        $("#nextWidBtn").removeClass("disabled"); $("#nextWidBtn").text("Next");
                        $("#refreshWidBtn").removeClass("disabled"); $("#refreshWidBtn").text("Refresh");
                });                   
                
}

function getReport(){

                $.getJSON("services/getReport.php",function(data){
                    var i=0;
                    var text='';
                    var tBody='';
                    var price=0;
                    //var data=localStorage.allMyInvestment;
                    
                    if(data=="" || (data==null || data=="null")){
                        
                    $("#reportData").before('<div class="alert alert-info">Opps!! There Are No Registered Members Yet</div>');
                    
                    }
                    else{
                            
                            for(i=0;i<data.length;i++){
                            text='<tr id="reportRow'+i+'">';
                            text+='<td>'+data[i].fullname+'</td>';
                            text+='<td>'+data[i].contact+'</td>';
                            text+='<td>'+data[i].message+'</td>';
                            text+='<td>'+data[i].datePosted+'</td>';
                             text+='<td><button id="reportBtn'+i+'" class="btn btn-danger btn-block" onclick="deleteReport('+data[i].id+','+i+')"><i class="fa fa-trash"></i> Delete</button></td>';
                            text+='</tr>';
                            tBody=tBody+text;
                            
                            }
                            var tHead='<tr class="bg-success"><th>Name</th><th>Contact</th><th>Message</th><th>Date Posted</th><th>Delete</th></tr>';
                            $("#reportData").html(tHead+tBody);
                        
                        }
                });                   
                
}


function withdrawalInfo(index){
    var info='';
    var data=localStorage.withdrawalInfo;
    data=JSON.parse(data);

    info='<tr><th class="bg-success"><b>User Information</b></th></tr>';
    info+='<tr><td>Name: '+data[index].fullname+' </td></tr>';
    info+='<tr><td>Username: '+data[index].username+'  </td></tr>';
    info+='<tr><td>Email:  '+data[index].email+'  </td></tr>';
    info+='<tr><th class="bg-success"><b>Investment Information</b></th></tr>';
    info+='<tr><td>Investment Plan:  '+data[index].plan+'  </td></tr>';
    info+='<tr><td>Investment Persentage:  '+data[index].percent+'  </td></tr>';
    info+='<tr><td>Investment Duration:  '+data[index].dur+' Month </td></tr>';
    
    if(data[index].widCount==data[index].dur){ info+='<tr><td>Investment Status: <span class="text-danger"><b>Terminated</b></span> </td></tr>';}
    else{ info+='<tr><td>Investment Status: <span class="text-success"><b>Active</b></span> </td></tr>';}
   
    info+='<tr><th class="bg-success"><b>Account Information</b></th></tr>';
    info+='<tr><td>Account Name:  '+data[index].accName+'  </td></tr>';
    info+='<tr><td>Account Number:  '+data[index].accNo+'  </td></tr>';
    info+='<tr><td>Bank Name:  '+data[index].bankName+'  </td></tr>';
    info+='<tr><td>Bank Branch:  '+data[index].bankBranch+'  </td></tr>';
    info+='<tr><td>Request Amount:  '+data[index].reqAmount+'  </td></tr>';

    if(data[index].reqStatus==0){ info+='<tr><td>Request Status: <span class="text-danger"><b>Pending<b></span> </td></tr>';}
    else{ info+='<tr><td>Request Status: <span class="text-success"><b>Approved</b></span> </td></tr>';}

    info+='<tr><td>Date Requested:  '+data[index].dateAdded+'  </td></tr>';
    info+='<tr><td><button id="approveBtn'+index+'" onclick="approveWid('+index+')" class="btn btn-success btn-lg">Approve Request</button> <button onclick="print()" class="btn btn-info btn-lg">Print Details</button> <a href="#top" onclick="hideShow(\'withdrawalInfoView\',\'withdrawalView\')" class="btn btn-primary btn-lg">Back To List</a></td></tr>';

    $("#withdrawalView").hide();
    $("#withdrawalInfoView").show();
    $("#withdrawalInfo").html(info);
}



function invFilter(status){

                    var i=0;
                    var text='';
                    var active='';
                    var terminated='';
                    var price=0;
                    var data=localStorage.investmentInfo;
                    
                    if(data=="" || (data==null || data=="null")){
                        
                    $("#investmentData").before('<div class="alert alert-info">Opps!! There Are No Registered Members Yet</div>');
                    
                    }
                    else{
                            data=JSON.parse(data);

                            if(data.length<100){$("#nextInvBtn").hide(); $("#refreshInvBtn").show();}
                            else{$("#nextInvBtn").show(); $("#refreshInvBtn").hide();}

                            for(i=0;i<data.length;i++){
                                if(data[i].widCount != data[i].dur){
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
                                    text+='<td><b class="text-success">Active</b></td>';
                                    
                                    text+='</tr>';
                                    active=active+text;
                                }

                                else{
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
                                    text+='<td><b class="text-danger">Terminated</b></td>';
                                    
                                    text+='</tr>';
                                    terminated=terminated+text;
                                }
                            }

                            var tHead='<tr class="bg-success"><th>Ref Id</th><th>Plan</th><th>Amount</th><th>Profit</th><th>Duration</th><th>Date Invested</th><th>Status</th></tr>';
                            if(status=="*"){$("#investmentData").html(tHead+active+terminated);}
                            if(status=="0"){$("#investmentData").html(tHead+active);}
                            if(status=="1"){$("#investmentData").html(tHead+terminated);}
                        
                        }
}

function widFilter(status){
                    var i=0;
                    var text='';
                    var pending='';
                    var approved='';
                    var price=0;
                    var data=localStorage.withdrawalInfo;
                    
                    if(data=="" || (data==null || data=="null")){
                        
                    $("#withdrawalData").before('<div class="alert alert-info">Opps!! There Are No Registered Members Yet</div>');
                    
                    }
                    else{
                            data=JSON.parse(data);

                            if(data.length<100){$("#nextWidBtn").hide(); $("#refreshWidBtn").show();}
                            else{$("#nextWidBtn").show(); $("#refreshWidBtn").hide();}

                            for(i=0;i<data.length;i++){
                                if(data[i].reqStatus==0){
                                    text='<tr>';
                                    text+='<td>'+data[i].username+'</td>';
                                    text+='<td>'+data[i].plan+'</td>';
                                    text+='<td>'+data[i].reqAmount+'</td>';
                                    text+='<td><b class="text-danger">Pending</b></td>';
                                    text+='<td><button class="btn btn-info btn-block" onclick="withdrawalInfo('+i+')"><i class="fa fa-search-plus "></i> Details</button></td>';
                                    text+='</tr>';
                                    pending=pending+text;
                                }
                                else{
                                    text='<tr>';
                                    text+='<td>'+data[i].username+'</td>';
                                    text+='<td>'+data[i].plan+'</td>';
                                    text+='<td>'+data[i].reqAmount+'</td>';
                                    text+='<td><b class="text-success">Approved</b></td>';
                                    text+='<td><button class="btn btn-info btn-block" onclick="withdrawalInfo('+i+')">Details</button></td>';
                                    text+='</tr>';
                                    approved=approved+text;
                                }
                            }
                            var tHead='<tr class="bg-success"><th>Username</th><th>Plan</th><th>Amount</th><th>Status</th><th>Details</th></tr>';
                            
                            if(status=="*"){$("#withdrawalData").html(tHead+pending+approved);}
                            if(status=="0"){$("#withdrawalData").html(tHead+pending);}
                            if(status=="1"){$("#withdrawalData").html(tHead+approved);}
                        
                        }
}

//SUPPORT FUNCTION------------------------------------------------------------------------------------------------------------------------>


function approveWid(index){
    $("#approveBtn"+index).addClass("disabled");
    $("#approveBtn"+index).text("Processing...");
    var data=localStorage.withdrawalInfo;
    data=JSON.parse(data);
    var widCount=data[index].widCount;
    var invId=data[index].invId;
    var widId=data[index].id;
    var username=data[index].username;
    var email=data[index].email;
    var reqAmount=data[index].reqAmount;
    var plan=data[index].plan;
    $.post("services/approveWid.php",{
        myWidCount:widCount,myInvId:invId,myWidId:widId,user:username,
        mail:email,amount:reqAmount,myPlan:plan
    },
        function(response){
        if(response==0){swal("SUCCESS!!","Withdrawal Request Approved","success");}
        else{swal("ERROR!!",response+"An Unepected Error Has Occured, Please Try Again Later Or Refresh The Page","error");}
        $("#approveBtn"+index).removeClass("disabled");
        $("#approveBtn"+index).text("Approve Request");
    });

}

function checkMe(){
    var myData=localStorage.capoData;
    if(myData=="" || (myData==null || myData=="null")){window.location.href="index.html";}
    else{
        myData=JSON.parse(myData);
        
       $("#profilePic1").attr("src",myData.pic.replace("../",""));
       $("#profilePic2").attr("src",myData.pic.replace("../",""));
       $("#profilePic3").attr("src",myData.pic.replace("../",""));
       $("#profilePic4").attr("src",myData.pic.replace("../",""));
       $("#emailInput").val(myData.email);
    }
}



function updateMe(){
    $.getJSON("services/updateMe.php",function(response){
    
    localStorage.setItem("capoData",JSON.stringify(response));
                 
    });

}

function hideShow(hideId,showId){
    $("#"+hideId).hide(); $("#"+showId).show();
}

function deleteReport(id,row){
    $("#reportBtn"+row).addClass("disabled");
     $("#reportBtn"+row).text("Deleting..");
    $.post("services/deleteReport.php",{reportId:id},function(data){
        if(data==0){swal("Success!!","Report Deleted","Success"); $("#reportRow"+row).hide();}
            else{swal("Error!!","An Unepected Error Has Occured, Please Try Again Or Refresh The Page","error");}
            $("#reportBtn"+row).removeClass("disabled");
            $("#reportBtn"+row).text("Delete");
    });
}

function dashboardCount(){
    $.get("services/dashboardCount.php",function(data){
        data=JSON.parse(data);
        
        $("#userCount").text(data.userCount);
        $("#investCount").text(data.investCount);
        $("#widCount").text(data.widCount);
        $("#reportCount").text(data.reportCount);
        $("#reportCount2").text(data.reportCount);
    });
}

function nextList(table){
    rowCount=rowCount+100;
    if(table=="user"){getMembers(rowCount);  $("#nextUserBtn").addClass("disabled"); $("#nextUserBtn").text("Loading...."); }
    if(table=="inv"){getInvestment(rowCount); $("#nextInvBtn").addClass("disabled"); $("#nextInvBtn").text("Loading...."); }
    if(table=="wid"){getWithdrawal(rowCount); $("#nextWidBtn").addClass("disabled"); $("#nextWidBtn").text("Loading...."); } 
}

function refreshList(table){
    rowCount=0;
    if(table=="user"){getMembers(rowCount);  $("#refreshUserBtn").addClass("disabled"); $("#refreshUserBtn").text("Refreshing...."); }
    if(table=="inv"){getInvestment(rowCount); $("#refreshInvBtn").addClass("disabled"); $("#refreshInvBtn").text("Refreshing...."); }
    if(table=="wid"){getWithdrawal(rowCount); $("#refreshWidBtn").addClass("disabled"); $("#refreshWidBtn").text("Refreshing...."); }   
}

function checkChar(id){
        var me=$("#"+id);
        if(/[<;'"(){}$]/g.test(me.val())){me.val(me.val().replace(/[<;'"(){}$]/g,'')); swal("[<;(){}$] Are Not Allowed");}
}

function logout(){
    localStorage.removeItem("capoData");
    window.location.href="index.html";
}

