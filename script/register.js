document.addEventListener('DOMContentLoaded', function() {
  
    document.getElementById("btn").addEventListener("click",buttonClickAction); 
    document.getElementById("questionID").addEventListener("input",getResult);
    
    var chipEl2 = document.getElementById('chips');
    var chip2 = M.Chips.init(chipEl2);
    
    var selectBoxes = document.querySelectorAll('select');
    var SBox = M.FormSelect.init(selectBoxes);
  });  
  
       
       
  function buttonClickAction(){
    var toValidate = {
      loginName: "LoginName is required, should have at least 3 numbers/characters",
      password: "Password is required, should have at least 6 numbers/character",
      group_c: "Please choose your group, it is required",
      registerEmail: "Register Email is required, email should contains @ and . symbols"
    };
    
    var idKeys = Object.keys(toValidate);
    
    var allValid = true;
    
    idKeys.forEach(function(id){
      var isValid = checkIfValid(id, toValidate[id]);
      if(!isValid){
        allValid = false;
      }
    });

    if(allValid){
      addRecord();
    }
  }
  
  
  function checkIfValid(elID, message){
    var isValid = document.getElementById(elID).checkValidity();
    if(!isValid){
      //warn the user
      M.toast({html: message});
      return false;
    }
    return true;  
  }
        
        
  function addRecord(){
    var userInfo = {};
          
    userInfo.loginName = document.getElementById("loginName").value;
    userInfo.password = document.getElementById("password").value;
    userInfo.group = document.getElementById("group_c").value;
    userInfo.registerEmail = document.getElementById("registerEmail").value;
    userInfo.confirmByEmail = 0;
    userInfo.approvalStatus = 0;
          
    google.script.run.userClicked(userInfo);
    document.getElementById("loginName").value = "";
    document.getElementById("password").value = "";
    document.getElementById("registerEmail").value = ""; 
    M.updateTextFields();
          
    var myApp = document.getElementById("group_c");
    myApp.selectedIndex = 0;
    M.FormSelect.init(myApp);
    //alert("Registration Success");
    swal("Registration Success", "We will process your case shortly", "success");
  }
  
  
  function getResult(){
    var QuestionID = document.getElementById("questionID").value;
    if(QuestionID.length === 5){
      google.script.run.withSuccessHandler(updateAnswer).getAnswer(QuestionID);           
      //document.getElementById("answer").value = QuestionID;
      M.updateTextFields();
    }
  }
  
  
  function updateAnswer(answer){
    document.getElementById("answer").value = answer;
    M.updateTextFields();
  }