var numberRight;
var numberWrong;
var currentQuestion;
var timer;
var timeToGuess;
var library; 
var questionLength = 10; 
var answerLength = 3; 
var gameLength;

function BeginGame() {
    
    $("#playAgain").hide();
    $("#result").hide();
    $(".scoreboard").empty();
    $("#choices .answer").off().on("click", makeGuess);
    numberWrong = 0;
    numberRight = 0;
    library = questionsLibrary.slice();
    timeToGuess = questionLength;
    gameLength = library.length;
    newQuestion();
}
function newQuestion() {
    if (numberRight + numberWrong >= gameLength) {
        gameOver();
    } else {
        
        var questionNumber = Math.floor(Math.random() * library.length);
        currentQuestion = library[questionNumber];
        library.splice(questionNumber, 1);
        resetTimer();
        $("#result").empty().hide();
        $("#questionText").html(currentQuestion.question);
        $("#choices").show();
        $(".answerText").each(function (i) {
            $(this).html(currentQuestion.answers[i]);
        });
         
        timer = setInterval(showTimer, 1000);
        $("#choices .answer").each(function(){
			$(this).prop('checked', false);
		})
    }
}

function makeGuess() {
    if ($(this).data("choice") == currentQuestion.correctAnswer) {
        numberRight++;
        showResult("Correct!");
    } else {
        numberWrong++;
        showResult("Wrong. The correct answer was " + currentQuestion.answers[currentQuestion.correctAnswer]);
    }
}
function showResult(msg) {
    resetTimer();
    $("#result")
        .html(msg)
        .show()
        .removeClass();
    setTimeout(newQuestion, answerLength * 1000);
    $("#score").html("correct: " + numberRight + " <br> incorrect: " + numberWrong);
}
function showTimer() {
    if (timeToGuess >= 0) {
        $("#timer").html(timeToGuess + " seconds left");
        timeToGuess--;
    } else {
        timesUp();
    }
}
function timesUp() {
    numberWrong++;
    resetTimer();
    showResult("Time's Up! The correct answer was " + currentQuestion.answers[currentQuestion.correctAnswer], "timesUp");
}
function resetTimer() {
    clearInterval(timer);
    timeToGuess = questionLength;
    $("#timer").empty();
}
function gameOver() {
    $("#result").removeClass();
    $("#endGameMessage").html("You got " + numberRight + " questions right and " + numberWrong + " wrong.");
    $("#playAgain").show();
    $("#playAgain").on("click", function(){
    	$("#playAgain").hide();
    	BeginGame;
    });
}
$(document).ready(function(){
	$("#startButton").off().on("click", function() {
        $("#startButton").hide();
        BeginGame();
    });
});