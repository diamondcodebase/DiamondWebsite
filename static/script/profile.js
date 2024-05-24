function goToQuiz(){
    window.open("<?= ScriptApp.getService().getUrl(); ?>?v=quiz","_top");
  }

  document.addEventListener('DOMContentLoaded', function() {
    init();
  });
    
    
  function init() {  
  //var LoginName = localStorage.getItem('loginName');
  //  var LoginName;
    google.script.run.withSuccessHandler(dataFromUserProperties).getValues_code();

  //alert(r);
  };
  
  
  function dataFromUserProperties(inputData){
    var LoginName = inputData.loginName;
    var Group = inputData.group;
    var LoginNameShow = document.getElementById("LoginNameShow");
    LoginNameShow.innerText = "Welcome " + LoginName + " (" + Group + ")";
 
    M.updateTextFields();
  }