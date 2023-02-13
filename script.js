let player, moves
let xPoints = 0, oPoints = 0
let combinations= [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]

let squares = document.querySelectorAll(".squares")
let restartButton = document.querySelector("#restartButton")
let results = document.querySelector("#results")

function main() {
    player = 1
    moves = 0
    squares.forEach((square)=>{
        square.innerHTML = "<div></div><div></div>"
        square.addEventListener("click", click)
    })
}

function click() {
    if (player==1){
        player = 0
        let lines = this.querySelectorAll("div")
        lines[0].setAttribute("fig", "xline1")
        lines[1].setAttribute("fig", "xline2")
    } else {
        player = 1
        this.querySelector("div").setAttribute("fig","circle")
    }
    moves++
    if (moves==9 && checkWinner()==undefined){
        results.querySelector("h2").innerText = "empate"
        results.style.display = "flex"
        xPoints += 0.5
        oPoints += 0.5
    } else if (checkWinner()!=undefined) {
        results.querySelector("h2").innerText = checkWinner()
        results.style.display = "flex"
        checkWinner()=="X won" ? xPoints++ : oPoints++
        block()
    }
    document.querySelector("#score p").innerHTML = `X = ${xPoints} <br> O = ${oPoints}`
    this.removeEventListener("click", click)
}

function checkWinner() {
    for (let comb of combinations) {
        let x = 0
        let o = 0
        for (let i of comb) {
            (squares[i-1].querySelectorAll("div")[0].getAttribute("fig")=="xline1") && (squares[i-1].querySelectorAll("div")[1].getAttribute("fig")=="xline2") ? x++ : ""
            squares[i-1].querySelectorAll("div")[0].getAttribute("fig")=="circle" ? o++ : ""
        }
        if (x==3) {
            return "X won"
        } else if (o==3) {
            return "O won"
        } 
    }
}

function block() {
    squares.forEach((square)=>{
        square.removeEventListener("click", click)
    })
}

restartButton.addEventListener("click", () => {
    main()
})
document.querySelector("#results button").addEventListener("click", () => {
    results.style.display = "none"
})
main()
