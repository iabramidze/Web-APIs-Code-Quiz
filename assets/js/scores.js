var highscores = window.localStorage.getItem("highscores");
if (highscores === null) {
  highscores = [];
} 
else {
  highscores = JSON.parse(highscores);
}

 highscores.forEach(function(score) {
  var scoreItem = document.createElement("li");
  scoreItem.textContent = score.initials + ": " + score.score;
  document.getElementById("highscores").appendChild(scoreItem);
});

var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function() {
  window.localStorage.clear();
  window.location.reload();
})