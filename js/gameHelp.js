Array.prototype.random = function () {
    for (let i = 0; i < this.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        if (j != i) {
            let temp = this[i];
            this[i] = this[j];
            this[j] = temp;
        }
    }
    return this
}



const skip_1 = document.getElementById("skip-1")
const skip_2 = document.getElementById("skip-2")
const skip_3 = document.getElementById("skip-3")
const cards = document.getElementById("cards")
const all_cards = Array.from(document.getElementsByClassName('card'));
const signs = document.getElementById("signs")
const academicals = document.getElementById("academicals")

skip_1.addEventListener("click", use_skip_1)
skip_2.addEventListener("click", use_skip_2)
skip_3.addEventListener("click", use_skip_3)
cards.addEventListener("click", use_cards)
signs.addEventListener("click", use_signs)
academicals.addEventListener("click", use_academicals)

function use_skip_1() {
    getNewQuestion(true)
    skip_1.removeEventListener("click", use_skip_1)
    skip_1.classList.add("disabled");
}

function use_skip_2() {
    getNewQuestion(true)
    skip_2.removeEventListener("click", use_skip_2)
    skip_2.classList.add("disabled");
}

function use_skip_3() {
    getNewQuestion(true)
    skip_3.removeEventListener("click", use_skip_3)
    skip_3.classList.add("disabled");
}

function use_cards() {
    document.getElementsByClassName("popup")[0].style.display = "block"
    cards.removeEventListener("click", use_cards)
    cards.classList.add("disabled");
}

all_cards.forEach((card) => {
    card.addEventListener('click', () => {
        let odds = [1, 2, 2, 3]
        odds.random()
        let luck = odds[0]
        card.src = "cardFront.png"
        for (let i = 0; i < luck; i++) {
            let choicescp = [...choices]
            choicescp.random()
            q_to_disable = choicescp[0]
            if (q_to_disable.className.includes("disabled") || q_to_disable.dataset["number"] == (currentQuestion.answer + 1)) {
                i--
            } else {
                q_to_disable.removeEventListener("click", check_answer)
                q_to_disable.classList.add("disabled");
            }
        }
        setTimeout(() => {
            document.getElementsByClassName("popup")[0].style.display = "none";
        }, 500);

    });
});

function use_signs() {
    let luck = Math.floor(Math.random() * 5);
    let letters = ["A", "B", "C", "D"]
    let indexes = []

    if (luck == 4) {
        // show wrong answer
        for (let i = 0; i < 4; i++) {
            // all but the correct one
            if (!(i == currentQuestion.answer)) {
                indexes.push(i)
            }
        }
        document.getElementById("sign_text").innerText += `The sign with the letter ${letters[indexes.random()[0]]} was the most chosen one`
    } else {
        // show right answer
        document.getElementById("sign_text").innerText += `The sign with the letter ${letters[currentQuestion.answer]} was the most chosen one`
    }
    signs.classList.add("disabled");
    document.getElementsByClassName("popup")[1].style.display = "block";
}

function use_academicals() {
    // show right answer
    let letters = ["A", "B", "C", "D"]
    document.getElementById("academicals_text").innerText += `The majority thinks that the option ${letters[currentQuestion.answer]} is the correct one`
    academicals.classList.add("disabled");
    document.getElementsByClassName("popup")[2].style.display = "block";
}

function help_switch(on = false) {
    let all_help = Array.from(document.getElementsByClassName('help'));
    all_help.forEach((help) => {
        if (!on) {
            help.classList.add("disabled");
        } else {
            help.classList.remove("disabled");
        }
    })
}

function close_popup() {
    document.getElementsByClassName("popup")[1].style.display = "none";
    document.getElementsByClassName("popup")[2].style.display = "none";
    document.getElementsByClassName("popup")[3].style.display = "none";
}
