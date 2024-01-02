var startButton = document.querySelector("#start");
var submitButton = document.querySelector("#submit");
var questionsSection = document.querySelector("#questions");
var choicesSubSection = document.querySelector("#choices");
var timerElement = document.querySelector("#time");
var initialsInput = document.querySelector("#initials");
var feedback = document.querySelector("#feedback");

// start screen

var time = 75;
var timerInterval = 0;

startButton.addEventListener("click", function() {
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");
  questionsSection.removeAttribute("class");

  if (timerInterval === 0) {
      timerInterval = setInterval(function() {
          time--;
          timerElement.textContent = time;
          if (time <= 0) {
            stopQuiz();
          }
      }, 1000);
  }

  newQuestion();
});

// questions screen

var questionIndex = 0;

function newQuestion() {
  var questionTitle = document.getElementById("question-title");
  questionTitle.textContent = questions[questionIndex].title;
  choicesSubSection.innerHTML = "";
  questions[questionIndex].choices.forEach(function(choice) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choicesSubSection.appendChild(choiceButton);

    choiceButton.addEventListener("click", function() {
      if (choiceButton.textContent !== questions[questionIndex].answer) {
        feedback.textContent = "Wrong!";
        time -= 5;
        timerElement.textContent = time;
      } else {
        feedback.textContent = "Correct!";
      }
    
      feedback.setAttribute("class", "feedback");
      setTimeout(function() {
        feedback.setAttribute("class", "feedback hide");
      }, 1000);
      questionIndex++
      if (questionIndex === questions.length) {
        stopQuiz();
      } else {
        newQuestion();
      }
    }) 
  });
}

// end screen

function stopQuiz() {
  clearInterval(timerInterval);
  questionsSection.setAttribute("class", "hide");
  var endScreenSection = document.getElementById("end-screen");
  endScreenSection.removeAttribute("class");
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = time;
}

submitButton.addEventListener("click", function() {
  var initials = initialsInput.value.trim();

  if (initials === "") {
    feedback.setAttribute("class", "feedback");
    feedback.textContent = "Please enter your initials";
    }
  else {
    var newScore = {
      score: time,
      initials: initials
    }
    var highscores = window.localStorage.getItem("highscores");
    if (highscores === null) {
      highscores = [];
    } 
    else {
      highscores = JSON.parse(highscores);
    }
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  };
  })



