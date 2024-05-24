var startButton = document.getElementById("startButton");

var TrueButton = document.getElementById("TrueButton");
var FalseButton = document.getElementById("FalseButton");
var nextButton = document.getElementById("nextButton");
var FinishButton = document.getElementById("Btn_LeaveChallenge");

var questionId = document.getElementById("question_id");
var questionText = document.getElementById("question_text");
var questionType = document.getElementById("question_type");

var yourAnswerTitle = document.getElementById("your_answer_title");
var yourAnswer = document.getElementById("your_answer");

var correctAnswer = document.getElementById("correct_answer");
var correctAnswerText = document.getElementById("correct_answer_text");
var correctAnswerVerse = document.getElementById("correct_answer_verse");

var correctAnswerTextRow = document.getElementById("correct_answer_text_row");
var question_AnswerFeedback = document.getElementById("question_AnswerFeedback");
//var answerButtonsElement = document.getElementById("answer-buttons-grid");

var Chosen_Answer;
var RoundNo = 0;
var TotalRoundNo = 5;
var TotalQuestionBankNo = 100;
var MaxSec = 0;
var timeleft = 0;
var yourScore = 0;
  
var Input_ID = 0;
var Question_IDs = [];

var LoginName_G;
var Group_G;

var pictures = [];


document.addEventListener('DOMContentLoaded', function() {
   startButton.addEventListener("click", startGame);
   nextButton.addEventListener("click", startNewRound);
   TrueButton.addEventListener("click", ChooseTrue);
   FalseButton.addEventListener("click", ChooseFalse);
   
   //FinishButton.addEventListener("click", () => { 
   //  window.open("https://sites.google.com/view/sobibleox/Home", "_top");
   //});
     
   // Initialize
   var img1Url = "1-1JGZ2xN04Q4kIeRaNEzVAtt8QiM9d2f";
   var img2Url = "1ZM7U1SkCFsPQ2h41xWJOb6YUXeZ14e0s";
   
   google.script.run.withSuccessHandler(dataFromUserProperties).getValues_code();
   google.script.run.withSuccessHandler(loadTotalQNo).getTotalQuestionNo_code();
   google.script.run.withSuccessHandler(loadTimeCountSeconds).getTimeCountSeconds_code();
   google.script.run.withSuccessHandler( function(bytes){ showImage1(bytes) }).loadImageBytes(img1Url);
   google.script.run.withSuccessHandler( function(bytes){ showImage2(bytes) }).loadImageBytes(img2Url);
   
   logger.log("init");
   yourScore = 0;
  
});


function showImage1(bytes){
  document.getElementById("TrueButton").src = "data:image/png;base64," + bytes; 
}

function showImage2(bytes){
  document.getElementById("FalseButton").src = "data:image/png;base64," + bytes; 
}

function dataFromUserProperties(inputData){
//  var LoginName = inputData.loginName;
//  var Group = inputData.group;
//  var playerName = document.getElementById("playerDetailName");
//  var playerGroup = document.getElementById("playerDetailGroup");
  try {
    document.getElementById("playerName").innerText = inputData.loginName; 
    document.getElementById("playerGroup").innerText = inputData.group;
    LoginName_G = inputData.loginName;
    Group_G = inputData.group;
    M.updateTextFields();
    }
    catch(err){
      document.getElementById("ex_label").innerHTML = err.message;
    }
}

function loadTotalQNo(inputData){
  try {
    TotalQuestionBankNo = inputData;
    document.getElementById("loadQNo").innerHTML = TotalQuestionBankNo;
  }
  catch(err){
    document.getElementById("ex_label").innerHTML = err.message;
  }
}

function loadTimeCountSeconds(inputData){
  try {
    MaxSec = inputData;
    timeleft = MaxSec;
    //document.getElementById("MaxSec").innerHTML = MaxSec;
  }
  catch(err){
    document.getElementById("ex_label").innerHTML = err.message;
  }
}
  

function startGame(){
  try {    
    document.getElementById("startButton").classList.add("hide");
    document.getElementById("btn_returnProfile").classList.add("hide");
    document.getElementById("your_answer_title").classList.remove("hide");
    addPlayRecord(LoginName_G, Group_G);
    Question_IDs = randomArrayInteger(1,TotalQuestionBankNo,TotalRoundNo);
    //PrepareQuestion();
    startNewRound();
  }
  catch(err){
    document.getElementById("ex_label").innerHTML = err.message;
  }
}


function PrepareQuestion(){
  try {    
    google.script.run.withSuccessHandler(showQuestionBank).prepareQuestion_code(TotalRoundNo);       
  }
  catch(err) {
    document.getElementById("ex_label").innerHTML = err.message;
  }
}


function startNewRound(){
  try {
    //var Refrest_Sec = 3;
    RoundNo = RoundNo + 1;
    timeleft = MaxSec;
    
    nextButton.classList.add("hide");
    //document.getElementById("questionBox").classList.add("hide");     
    document.getElementById("yourAnswerBox").classList.add("hide");
    document.getElementById("counterBox").classList.add("hide");
    question_AnswerFeedback.classList.add("hide");    
    correctAnswerText.classList.add("hide");
    correctAnswerTextRow.classList.add("hide");
    correctAnswerVerse.classList.add("hide");
    
    yourAnswer.innerText = "";
    questionId.innerText = "";  
    questionType.innerText = "";    
    questionText.innerText = "";  
    correctAnswer.innerText = "";
    correctAnswerText.innerText = "";
    correctAnswerVerse.innerText = "";
    M.updateTextFields();
    
//    var RefreshTimer = setInterval(function(){
//      if(Refrest_Sec <= 0){
//        clearInterval(RefreshTimer);      
//      }    
//    Refrest_Sec -= 1;
//    }, 1000);
     
    // Input_ID = 1;
    //Input_ID = randomInteger(1,6);
    Input_ID = Question_IDs[RoundNo - 1];
    
    var show_msg = "ROUND " + RoundNo;
    //document.getElementById("gameStatus").innerHTML = show_msg;
      
    // Get question and answer from GoogleSheet
    document.getElementById("Question_Bank").innerHTML = Input_ID;
    google.script.run.withSuccessHandler(updateLabels).getAnswer(Input_ID); 
   
    
    // show_msg = show_msg.concat( " Ready~!!")
    document.getElementById("gameStatus").innerHTML = show_msg
    showNextQuestion();

  
  //  if(Input_ID.length === 5){
  //      google.script.run.withSuccessHandler(updateLabels).getAnswer_ByIndex(Input_ID); 
  //      RoundNo = 1;
  //      showNextQuestion();
  //  }    
    //shuffledQuestions = questions.sort(() => Math.random() - .5);
    //currentQuestion = 0;
    
    //setNextQuestion();
    }
  catch(err) {
    document.getElementById("ex_label").innerHTML = err.message;
  }
}





function updateLabels(replyObj){
    questionId.innerText = replyObj.ID;  
    questionType.innerText = replyObj.type;
    
    questionText.innerText = replyObj.questionText;    
    correctAnswer.innerText = replyObj.correctAnswer;
    correctAnswerText.innerText = replyObj.answerText;
    correctAnswerVerse.innerText = replyObj.answerVerse;
//    If(replyObj.answerText === "")
//    {
//    
//    }
//    else
//    {
//      correctAnswerText.innerText = "正解：" + replyObj.answerText;
//    }
    M.updateTextFields();
}
  

function showNextQuestion(){  
  //document.getElementById("questionBox").classList.remove("hide"); 
  document.getElementById("yourAnswerBox").classList.remove("hide"); 
  document.getElementById("counterBox").classList.remove("hide");
  
  //showQuestion(questionIndex);
  Chosen_Answer = "未回答"
  yourAnswer.innerHTML = Chosen_Answer;
  yourAnswer.style.color = "lightgray";
  

  var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      document.getElementById("counterBox").classList.add("hide");
      
      if(RoundNo < TotalRoundNo){     
        document.getElementById("yourAnswerBox").classList.add("hide"); 
        document.getElementById("nextButton").classList.remove("hide");
        //document.getElementById("correctAnswerBox").classList.add("hide");
            
        if(Chosen_Answer == correctAnswer.innerHTML){
          question_AnswerFeedback.classList.remove("hide");
          question_AnswerFeedback.innerHTML = "你答對了 !!"
          yourScore = yourScore + 1;
          correctAnswerTextRow.classList.remove("hide");
          correctAnswerVerse.classList.remove("hide");
            
          if(correctAnswerText.innerHTML == "")
          {
          }
          else
          {
            correctAnswerText.classList.remove("hide");
          }
          
        }else{
          question_AnswerFeedback.classList.remove("hide");
          question_AnswerFeedback.innerHTML = "你答錯了... 再接再厲~~"
          correctAnswerTextRow.classList.remove("hide");
          correctAnswerVerse.classList.remove("hide");
            
          if(correctAnswerText.innerHTML == "")
          {
          }
          else
          {
            correctAnswerText.classList.remove("hide");
          }
        }
        
        
      }
      else{
        document.getElementById("yourAnswerBox").classList.add("hide");
        if(Chosen_Answer == correctAnswer.innerHTML){
          question_AnswerFeedback.classList.remove("hide");
          question_AnswerFeedback.innerHTML = "你答對了 !!"
          yourScore = yourScore + 1;
          correctAnswerTextRow.classList.remove("hide");
          correctAnswerVerse.classList.remove("hide");
          
          if(correctAnswerText.innerHTML == "")
          {
          }
          else
          {
            correctAnswerText.classList.remove("hide");
          }
          
        }else{
          question_AnswerFeedback.classList.remove("hide");
          question_AnswerFeedback.innerHTML = "你答錯了... 再接再厲~~"
          correctAnswerTextRow.classList.remove("hide");
          correctAnswerVerse.classList.remove("hide");
          if(correctAnswerText.innerHTML == "")
          {
          }
          else
          {
            correctAnswerText.classList.remove("hide");
          }
        }        
        document.getElementById("gameOverMsgBox").classList.remove("hide");
        document.getElementById("gameResult").innerText = "挑戰結果：在 " + TotalRoundNo + " 題挑戰中，你答對了 " + yourScore + " 題" 
      }
    }
    else{
    
    }
    
    //document.getElementById("correctAnswerBox").classList.add("hide");
    //correctAnswerText.classList.add("hide");
    document.getElementById("progressBar").value = MaxSec - timeleft;
    document.getElementById("countDownNo").innerHTML = timeleft + "秒";
    timeleft -= 1;
    }, 1000);
}


function ChooseTrue(){
   Chosen_Answer = "O 正確";
   yourAnswer.innerHTML=Chosen_Answer;
   yourAnswer.style.color="blue";
}

function ChooseFalse(){
   Chosen_Answer = "X 錯誤";
   yourAnswer.innerHTML = Chosen_Answer;
   yourAnswer.style.color="red";
}


function showQuestionBank(inputArray){
  Question_IDs = inputArray;
//  document.getElementById("Question_Bank").innerHTML = Question_IDs;
}

function randomInteger(min, max) {
    var numA = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
    return numA
}


function randomArrayInteger(min, max, ArrSize) {
  var numArr = [];
  var i = 0;
  while (i < ArrSize){
    var tempID = randomInteger(min,max);
      if(numArr.includes(tempID)){
      
      } 
      else {
        numArr.push(tempID);
        i = i + 1;
      }
  }
  return numArr;    
}


function addPlayRecord(loginName_In, group_In){
//  var d = New Date();
//  var d_date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
//  var d_time = d.getHours() + ":" + d.getMinutes();
//  
//  var PlayInfo = {
//    loginName: loginName_In,
//    group: group_In,
//    date: d_date,
//    time: d_time
//  };
//
//  google.script.run.AddAnswerRecord(PlayInfo);
//  
}



