//main.js
var appBody = document.getElementById("appBody");

//quiz variables
var questionNum = 0;
var score = 0;
var canAnswer = true;

//create menu
function createMenu(){
	//create html string
	var htmlString = "<h2>Menu</h2><p>Choose a quiz from the list below:<\p>";
	htmlString += "<button onclick=\"startQuiz('ComputerSystems4-BooleanAlgebra.json')\">Test quiz</button>"
	htmlString += "<button onclick=\"startQuiz('DiscreteMathsAndLogic3-Relations.json')\">Relations</button>"
	
	//set html string
	appBody.innerHTML = htmlString;
};

//start quiz
function startQuiz(quizFile){
	//load quiz file
	var quizRequest = new XMLHttpRequest();
	
	quizRequest.onreadystatechange = function(){
		//check status
		if(this.readyState == 4 && this.status == 200){
			//read json data
			quiz = JSON.parse(this.responseText);
			
			//output quiz
			console.log(quiz);
			
			//start question 0
			startQuestion(0);
		};
	};
	
	//reset variables
	questionNum = 0;
	score = 0;
	
	//send request
	quizRequest.open("GET", quizFile, true);
	quizRequest.send();
};

//start question
function startQuestion(questionNum){
	//set can answer
	canAnswer = true;
	
	//create html string
	var htmlString = "<h2>Question " + (questionNum + 1) + " out of " + quiz.questions.length + ":";
	htmlString += "<h3>" + quiz.questions[questionNum].questionStr + "</h3>";
	
	//check for image
	if(quiz.questions[questionNum].imgStr != ""){
		htmlString += "<img src=\"./src/" + quiz.questions[questionNum].imgStr + "\">";
	};
	
	//generate list of random numbers 0 to 3
	var questionOrder = [];
	
	for(i = 0; i < 4; i++){
		let repeat = true;
		let num = 0;
		
		while(repeat){
			repeat = false;
			num = Math.floor(Math.random() * 4);
				
			for(j = 0; j < 4; j++){
				if(num == questionOrder[j]){
					repeat = true;
				};
			};				
		};
		
		questionOrder.push(num);
	};
	
	for(i = 0; i < 4; i++){
		htmlString += "<button id=\"quizButton" + questionOrder[i] + "\" onclick=\"checkAnswer(" + questionOrder[i] + ")\">" + quiz.questions[questionNum].answers[questionOrder[i]] + "</button><br/>"
	};
	
	//set html string
	appBody.innerHTML = htmlString;
	
	//typesset
	MathJax.typeset();
};

//check answer
function checkAnswer(answerId){
	//check if can answer
	if(canAnswer){
		//set can answer to false
		canAnswer = false;
		
		//make correct button green
		document.getElementById("quizButton0").style.backgroundColor = "green";
	
		//check if correct
		if(answerId != 0){
			document.getElementById("quizButton" + answerId).style.backgroundColor = "red";
		} else {
			score += 1;
		};
		
		//create next question button
		appBody.innerHTML += "<br/><br/><button onclick=\"nextQuestion()\">Next Question</button>";
	};
};

//next question
function nextQuestion(){
	//increment question number
	questionNum += 1;

	if(questionNum >= quiz.questions.length){
		//go to answer screen
		showFeedback();
	} else {
		startQuestion(questionNum);
	};
};

//show feedback
function showFeedback(){
	//create html string
	var htmlString = "<h2>Quiz Complete!</h2>";
	htmlString += "<h3>You scored " + score + " out of " + quiz.questions.length + "</h3>"
	htmlString += "<button onclick=\"createMenu()\">Return to Menu</button>"
	
	//show html string
	appBody.innerHTML = htmlString;
};

//create menu
createMenu();