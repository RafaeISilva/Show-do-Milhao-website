const http = require("http")
const fs = require("fs")

// html files
const mainPage = fs.readFileSync("html/index.html")
const gamePage = fs.readFileSync("html/game.html")
const endPage = fs.readFileSync("html/end.html")
const highScoresPage = fs.readFileSync("html/highScores.html")
const editPage = fs.readFileSync("html/edit.html")

// css files
const mainStyle = fs.readFileSync("css/style.css")
const gameStyle = fs.readFileSync("css/game.css")
const highScoresStyle = fs.readFileSync("css/highScores.css")

// javascript files
const gameScript = fs.readFileSync("js/game.js")
const gameHelpScript = fs.readFileSync("js/gameHelp.js")
const utilsScript = fs.readFileSync("js/utils.js")
const endScript = fs.readFileSync("js/end.js")
const highScoresScript = fs.readFileSync("js/highScores.js")
const editScript = fs.readFileSync("js/edit.js")

// assets files
const icon = fs.readFileSync("assets/icon.png")
const card = fs.readFileSync("assets/card.png")
const cardFront = fs.readFileSync("assets/cardFront.png")
const highScores = fs.readFileSync("assets/highScores.json")
const questions = fs.readFileSync("assets/questions.json")

const server = http.createServer((req, res) => {
    // html
    if (req.url == "/") {
        res.end(mainPage)
    }
    if (req.url == "/game") {
        res.end(gamePage)
    }
    if (req.url == "/end") {
        res.end(endPage)
    }
    if (req.url == "/highScores") {
        res.end(highScoresPage)
    }
    if (req.url == "/edit") {
        res.end(editPage)
    }

    // css
    if (req.url == "/style.css") {
        res.end(mainStyle)
    }
    if (req.url == "/game.css") {
        res.end(gameStyle)
    }
    if (req.url == "/highScores.css") {
        res.end(highScoresStyle)
    }

    // javascript
    if (req.url == "/game.js") {
        res.end(gameScript)
    }
    if (req.url == "/gameHelp.js") {
        res.end(gameHelpScript)
    }
    if (req.url == "/utils.js") {
        res.end(utilsScript)
    }
    if (req.url == "/end.js") {
        res.end(endScript)
    }
    if (req.url == "/highScores.js") {
        res.end(highScoresScript)
    }
    if (req.url == "/edit.js") {
        res.end(editScript)
    }

    // assets
    if (req.url == "/icon.png") {
        res.end(icon)
    }
    if (req.url == "/card.png") {
        res.end(card)
    }
    if (req.url == "/cardFront.png") {
        res.end(cardFront)
    }
    if (req.url == "/highScores.json") {
        res.end(highScores)
    }
    if (req.url == "/questions.json") {
        res.end(questions)
    }

    // handling leaderboard updates
    if (req.method == "POST" && req.url == "/save") {
        let body = ''

        req.on('data', (chunk) => {
            body += chunk
        });

        req.on('end', () => {
            // for some reason it has this "data=" at the start
            data = decodeURIComponent(body.replace("data=", ""))
            fs.writeFileSync("assets/highScores.json", data)
        })
    }

    res.end("Error page not found")
})

server.listen(3000)