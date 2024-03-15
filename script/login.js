var sampleLoginName = ["123"];
var samplePassword = ["123Abc"];

var LoginButton = document.getElementById("LogInButton");
var LoginButton_New = document.getElementById("LogInButton_New");
//const container = document.getElementById("container");

var Input_loginName = document.getElementById("Input_loginName");
var Input_password = document.getElementById("Input_password");

var LoginInfo = [];
var LoginNameTemp = [];
var PasswordTemp = [];
var GroupTemp = [];
var LoginName1 = "";
var Group1 = "";

var correctLoginNamePasswordTemp = [];

//LoginButton.addEventListener("click", () => {
//  var processLoginNameIndex = sampleLoginName.indexOf(Input_loginName.value);
//  var processPasswordIndex = samplePassword.indexOf(Input_password.value);
//  if( (processLoginNameIndex > - 1 && processPasswordIndex > -1) && processLoginNameIndex === processPasswordIndex){
//    swal("Great", "Login success", "success");
//    window.open("<?= ScriptApp.getService().getUrl(); ?>?v=profile","_top")
//  }else{
//    //alert("Invalid loginName/Password");
//    swal("Oopss...Invalid loginName/Password...", "Try Again!", "error");
//  }
//});


Input_loginName.addEventListener("input", () => {
  //Logger.Log("process LoginName: " + Input_loginName.value);
  if(Input_loginName.value.length > 2){    
    google.script.run.withSuccessHandler(dataFromSpreadsheet).matchData_B(Input_loginName.value);
//    var recordLog = {
//      LoginName: LoginInfo.loginName, 
//      group: LoginInfo.group
//    };
    
//    google.script.run.addRecordLog(recordLog);
  }
});


LoginButton_New.addEventListener("click", () => {
  // google.script.run.withSuccessHandler(dataFromSpreadsheet).matchData_B(Input_loginName.value);
  
  if(Input_loginName.value.length==0 || Input_password.value.length==0){
    swal("Missing loginName/Password", "Please enter LoginName and Password!", "error");
    
  }else{   
    //Logger.Log(Input_loginName.value+Input_password.value + "," + correctLoginNamePasswordTemp);
    
    if(Input_loginName.value+Input_password.value == correctLoginNamePasswordTemp){ 
    //if(Input_loginName.value == LoginNameTemp && Input_password.value = PasswordTemp){ 
      swal({title: "Login Success", text: "", icon: "success", timer: 3000, buttons: false});    
    //localStorage.setItem("loginName",Input_loginName.value);
      window.open("<?= ScriptApp.getService().getUrl(); ?>?v=profile","_top")
    }else{
    //alert("Invalid loginName/Password");
      swal({title: "Oopss...Invalid loginName/Password...", text:"Try Again! combine:" + correctLoginNamePasswordTemp, icon:"error", timer: 3000});
    }
  }
});


function dataFromSpreadsheet(LoginAccData){
  try {    
    //var correctLoginNamePasswordTemp = data;
    for (var i=0; i < LoginAccData.length; i++){
      correctLoginNamePasswordTemp.push(LoginAccData[i].loginName + LoginAccData[i].password);
      LoginNameTemp.push(LoginAccData[i].loginName);
      PasswordTemp.push(LoginAccData[i].password);
      GroupTemp.push(LoginAccData[i].group);
      LoginName1 = LoginAccData[i].loginName;
      Group1 = LoginAccData[i].group;
      // localStorage.setItem('loginName', LoginAccData[i].loginName);
      // localStorage.setItem('Group', LoginAccData[i].group);
    }
  }
  catch(err) {
    document.getElementById("ex_label_login").innerHTML = err.message;
  }
}


function passValues(){
  google.script.run.passValues_code(LoginNameTemp[0], GroupTemp[0]);
}


function underDev(){
  alert("Sorry... This is under developement");
}