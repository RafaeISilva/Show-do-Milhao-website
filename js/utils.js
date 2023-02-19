let q
let qgp = []
let q_easy = []
let q_medium = []
let q_hard = []

class Question {
    constructor(title, options, difficulty) {
        this.title = title
        this.options = options
        this.difficulty = difficulty
        // makes the answer position different everytime
        this.options.random()

        // gets the answer position
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].includes("*")) {
                this.options[i] = this.options[i].replace("*", "")
                this.answer = i
            }
        }
    }
}

$.getJSON("questions.json", function (data) {
    q = data
    for (let qs in q) {
        qgp.push(new Question(q[qs]["title"], q[qs]["options"], q[qs]["difficulty"]))
    }



    for (let qs of qgp) {
        if (qs.difficulty == "easy") {
            q_easy.push(qs)
        } else if (qs.difficulty == "medium") {
            q_medium.push(qs)
        } else if (qs.difficulty == "hard") {
            q_hard.push(qs)
        }
    }

    q_easy.sort(() => Math.random() - 0.5)
    q_medium.sort(() => Math.random() - 0.5)
    q_hard.sort(() => Math.random() - 0.5)
    startGame()
})
