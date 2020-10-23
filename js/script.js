//Define variables
let playing = false;
let startReset = document.getElementById("startReset");
let selectOpponent = document.getElementById("selectOpponent");
let player = document.getElementById("playwithhuman");
let mainMenu = document.getElementById("mainMenuScreen");
let computer = document.getElementById("playwithcomp");
let playerWon = document.getElementById("playerWon");
let boxes = document.querySelector('.container');
let playerOne = false;
let playerTwo = false;
let vsPlayerMode = false;
let vsComputerMode = false;
let player1Score = 0;
let player2Score = 0;
let player1Positions = [];
let player2Positions = [];

//giving events..
mainMenu.addEventListener('click', startGame);
startReset.addEventListener('click', startResetGame);
boxes.addEventListener('click', addMark);


function setText(id, text) {
    document.getElementById(id).innerHTML = text;
}

function show(id) {
    document.getElementById(id).style.display = 'block';
}

function hide(id) {
    document.getElementById(id).style.display = 'none';
}
show("mainMenuScreen");
show("selectOpponent");
function clearBoxes() {
    for(let i=1; i<=9;i++){
            setText("box" + i, " ");
        }
}
function startGame(e) {
    if (e.target == player) {
        hide("mainMenuScreen");
        hide("selectOpponent");
        vsPlayerMode = true;
        for (let i = 1; i < 10; i++)
            setText("box" + i, '');
    } else if(e.target == computer) {
        hide("mainMenuScreen");
        hide("selectOpponent");
        vsComputerMode = true;
        for (let i = 1; i < 10; i++)
            setText("box" + i, '');
    }
}

function startResetGame(e) {
    player1Positions = [];
    player2Positions = [];
    player1Score = 0;
    player1Score = 0;
    if (playing === true) {
        //game is on and you want to reset
        setText("startReset", "Start Game");
        show("mainMenuScreen");
        show("selectOpponent");
        hide("gameover");
    } else {
        //game is off and you want to start a new game
        e.preventDefault();
        console.log("in else");
        setText("startReset", 'Reset Game');
        hide("mainMenuScreen");
        hide("selectOpponent");
        playerOne = true;
    }
    playing = !playing;
}

function addMark(e) {
    if (vsPlayerMode == true) {
        if (playerOne && e.target.innerHTML === '' ) {
            e.target.innerHTML = 'X';
            playerOne = !playerOne;
            playerTwo = !playerTwo;
            player1Positions.push(e.target.getAttribute("id"));
            checkIfGameOver();
        } else if (playerTwo && e.target.innerHTML === '' ) {
            e.target.innerHTML = 'O';
            playerTwo = !playerTwo;
            playerOne = !playerOne;
            player2Positions.push(e.target.getAttribute("id"));
            checkIfGameOver();
        }
    } else if(vsComputerMode == true) {
        if (playerOne && e.target.innerHTML === '' ) {
            e.target.innerHTML = 'X';
            player1Positions.push(e.target.getAttribute("id"));
            setTimeout(computerMove,300); 
        }
    }
}
function computerMove() {
    if (selectOpponent.style.display === 'none' && (player1Positions.length + player2Positions.length < 9)) {
        let boxNumber;
        do {
            boxNumber = String(Math.round((1 + Math.random() * 8)));
        } while (document.getElementById("box" + boxNumber).innerHTML != '');
        setText("box" + boxNumber, "O");
        player2Positions.push("box"+boxNumber);
    }
    checkIfGameOver();
}
function checkIfGameOver(e) {
    if ((player1Positions.includes("box1") && player1Positions.includes("box2") && player1Positions.includes("box3")) ||
        (player1Positions.includes("box1") && player1Positions.includes("box4") && player1Positions.includes("box7")) ||
        (player1Positions.includes("box1") && player1Positions.includes("box5") && player1Positions.includes("box9")) ||
        (player1Positions.includes("box7") && player1Positions.includes("box5") && player1Positions.includes("box3")) ||
        (player1Positions.includes("box2") && player1Positions.includes("box5") && player1Positions.includes("box8")) ||
        (player1Positions.includes("box4") && player1Positions.includes("box5") && player1Positions.includes("box6")) ||
        (player1Positions.includes("box8") && player1Positions.includes("box7") && player1Positions.includes("box9")) ||
        (player1Positions.includes("box3") && player1Positions.includes("box6") && player1Positions.includes("box9"))
    ) {
        player1Score = 1;
        setText("p1Score", player1Score);
        setText("playerWon", "Player 1 wins");
        clearBoxes();
        show("mainMenuScreen");
        show("gameover");
    } else if ((player2Positions.includes("box1") && player2Positions.includes("box2") && player2Positions.includes("box3")) ||
        (player2Positions.includes("box1") && player2Positions.includes("box4") && player2Positions.includes("box7")) ||
        (player2Positions.includes("box1") && player2Positions.includes("box5") && player2Positions.includes("box9")) ||
        (player2Positions.includes("box7") && player2Positions.includes("box5") && player2Positions.includes("box3")) ||
        (player2Positions.includes("box2") && player2Positions.includes("box5") && player2Positions.includes("box8")) ||
        (player2Positions.includes("box4") && player2Positions.includes("box5") && player2Positions.includes("box6")) ||
        (player2Positions.includes("box8") && player2Positions.includes("box7") && player2Positions.includes("box9")) ||
        (player2Positions.includes("box3") && player2Positions.includes("box6") && player2Positions.includes("box9"))
    ) {
        player2Score = 1;
        setText("p2Score", player2Score);
        setText("playerWon", "Player 2 wins");
        clearBoxes();
        show("mainMenuScreen");
        show("gameover");
    } else if (player1Positions.length + player2Positions.length == 9) {
        clearBoxes();
        setText("playerWon", "Draw!");
        show("mainMenuScreen");
        show("gameover");
    }
}
