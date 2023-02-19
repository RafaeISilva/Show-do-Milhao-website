const highScoresList = document.getElementById("highScoresList");

$.getJSON("highScores.json", function (data) {
  const highScores = data;

  highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");
})