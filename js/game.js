const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 15;

startGame = () => {
    questionCounter = 0;
    score = 0;
    getNewQuestion();
    help_switch(true)
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};


getNewQuestion = (skip = false) => {
    if (questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // go to the end page
        return window.location.assign('end');
    }
    if (!skip) {
        questionCounter++;
    }
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // gets question
    if (questionCounter <= 3) {
        currentQuestion = q_easy.pop();
    } else if (questionCounter <= 10) {
        currentQuestion = q_medium.pop();
    } else if (questionCounter >= 11) {
        currentQuestion = q_hard.pop();
    }
    if (questionCounter == 15) {
        help_switch()
        document.getElementsByClassName("popup")[3].style.display = "block";
    }
    // question title
    question.innerText = currentQuestion.title;

    // question options
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion.options[number - 1];
        choice.classList.remove("disabled");
    });
    acceptingAnswers = true;
    choices.forEach((choice) => {
        choice.addEventListener('click', check_answer);
    });
};

choices.forEach((choice) => {
    choice.addEventListener('click', check_answer);
});

function check_answer(e) {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply =
        selectedAnswer == (currentQuestion.answer + 1) ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
        incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 750);
    if (classToApply === "incorrect") {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end');
    }
}


incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};