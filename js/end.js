//const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

let highScores;

$.getJSON("highScores.json", function (data) {
    highScores = data
    finalScore.innerText = mostRecentScore;

    username.addEventListener('keyup', () => {
        saveScoreBtn.disabled = !username.value;
    });

    saveHighScore = (e) => {
        e.preventDefault();

        scorename = username.value
        const score = {
            score: mostRecentScore,
            name: scorename,
        };

        highScores.push(score);
        highScores.sort((a, b) => b.score - a.score);

        $.ajax
            ({
                type: "POST",
                dataType: 'json',
                async: true,
                url: '/save',
                data: { data: JSON.stringify(highScores) },
                success: function () { console.log("success"); },
                failure: function () { console.log("failure"); }
            });

        saveScoreBtn.disabled = true
        document.getElementById("isSaved").innerText = "Saved Successfully!"
    }
})