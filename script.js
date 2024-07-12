function createPlayer(name, mark) {
    
    let marks = 0;
    const getMarks = () => marks;
    const giveMarks = () => marks++;
    const clearMarks = () => marks = 0;

    return { name, mark, getMarks, giveMarks, clearMarks };
}

const dom = (function() {
    const playerNames = document.querySelector(".player-names");
    const playerNamesButton = document.querySelector(".player-names button");
    const domPlayer1 = document.querySelector(`.player-names input[name="name1"]`);
    const domPlayer2 = document.querySelector(`.player-names input[name="name2"]`);
    const playerTurn = document.querySelector(".player-turn");
    const startGameButton = document.querySelector(".start-game");
    const newGameButton = document.querySelector(".new-game");
    const row1Column1 = document.querySelector(".row1.column1");
    const row1Column2 = document.querySelector(".row1.column2");
    const row1Column3 = document.querySelector(".row1.column3");
    const row2Column1 = document.querySelector(".row2.column1");
    const row2Column2 = document.querySelector(".row2.column2");
    const row2Column3 = document.querySelector(".row2.column3");
    const row3Column1 = document.querySelector(".row3.column1");
    const row3Column2 = document.querySelector(".row3.column2");
    const row3Column3 = document.querySelector(".row3.column3");
    const board = [row1Column1, row1Column2, row1Column3, row2Column1, row2Column2,
                      row2Column3, row3Column1, row3Column2, row3Column3,
                     ];

    const updateNames = () => {
        playerNamesButton.addEventListener("click", () => {
            if (domPlayer1.value) {
                player1.name = domPlayer1.value;
                domPlayer1.setAttribute("placeholder", `${player1.name}`);
                domPlayer1.value = "";
            }
            if (domPlayer2.value) {
                player2.name = domPlayer2.value;
                domPlayer2.setAttribute("placeholder", `${player2.name}`);
                domPlayer2.value = "";
            }
        })
    }

    const startGame = () => {
        startGameButton.addEventListener("click", () => {
            startGameButton.classList.toggle("display-none");
            playerNames.classList.toggle("display-none");
            playerTurn.classList.toggle("display-none");
            
            game.playGame();
        })
    }

    const newGame = () => {
        newGameButton.addEventListener("click", () => {
            player1.clearMarks();
            player2.clearMarks();
            dom.newGameButton.classList.toggle("display-none");
            dom.startGameButton.classList.toggle("display-none");
            dom.playerTurn.classList.toggle("display-none");
            dom.playerNames.classList.toggle("display-none");
            gameboard.board.forEach(item => {
                item.forEach(item => {
                    item.innerText = "";
                })
            })
        })
    }

    return { playerNames, domPlayer1, playerTurn, domPlayer2, startGameButton,
             newGameButton, board, playerNamesButton, updateNames, startGame, newGame,
           };
})();

const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("Player2", "O");

const gameboard = (function () {
    const row1 = [dom.board[0], dom.board[1], dom.board[2]];
    const row2 = [dom.board[3], dom.board[4], dom.board[5]];
    const row3 = [dom.board[6], dom.board[7], dom.board[8]];
    return { board: [row1, row2, row3] };
})();

const game = (function () {
    const randomNumber = Math.floor(Math.random() * 2);

    const playerTurn = () => {
        if (player1.getMarks() == player2.getMarks()) {
            if (randomNumber === 1) {
                return player1;
            } else {
                return player2;
            }
        } else if (player1.getMarks() > player2.getMarks()) {
            return player2;
        } else if (player2.getMarks() > player1.getMarks()) {
            return player1;
        }
    }

    const playerMark = () => {
        if (playerTurn() === player1) {
            return player1.mark;
        } else if (playerTurn() === player2) {
            return player2.mark;
        }
    }

    const gameWin = () => {
        if (gameboard.board[0][0].innerText + gameboard.board[0][1].innerText + gameboard.board[0][2].innerText == game.currentPlayerMark + game.currentPlayerMark + game.currentPlayerMark ||
            gameboard.board[1][0].innerText + gameboard.board[1][1].innerText + gameboard.board[1][2].innerText == game.currentPlayerMark + game.currentPlayerMark + game.currentPlayerMark ||
            gameboard.board[2][0].innerText + gameboard.board[2][1].innerText + gameboard.board[2][2].innerText == game.currentPlayerMark + game.currentPlayerMark + game.currentPlayerMark ||
            gameboard.board[0][0].innerText + gameboard.board[1][0].innerText + gameboard.board[2][0].innerText == game.currentPlayerMark + game.currentPlayerMark + game.currentPlayerMark ||
            gameboard.board[0][1].innerText + gameboard.board[1][1].innerText + gameboard.board[2][1].innerText == game.currentPlayerMark + game.currentPlayerMark + game.currentPlayerMark ||
            gameboard.board[0][2].innerText + gameboard.board[1][2].innerText + gameboard.board[2][2].innerText == game.currentPlayerMark + game.currentPlayerMark + game.currentPlayerMark ||
            gameboard.board[0][0].innerText + gameboard.board[1][1].innerText + gameboard.board[2][2].innerText == game.currentPlayerMark + game.currentPlayerMark + game.currentPlayerMark ||
            gameboard.board[0][2].innerText + gameboard.board[1][1].innerText + gameboard.board[2][0].innerText == game.currentPlayerMark + game.currentPlayerMark + game.currentPlayerMark
        ) {
            return `Congratulations ${game.currentPlayer.name}! You win!`;
        } else if (player1.getMarks() + player2.getMarks() == 9) {
            return "It's a tie!";
        }
    }

    const currentPlayer = playerTurn();
    const currentPlayerMark = playerMark();

    const playGame = () => {
        game.currentPlayer = playerTurn();
        game.currentPlayerMark = playerMark();

        dom.playerTurn.innerText = `It's your turn ${currentPlayer.name}`;

        const controller = new AbortController();
        const { signal } = controller;

        function populateBoard() {
            dom.board.forEach(item => {
                item.addEventListener("click", () => {
                    if (item.innerText == "" || item.innerText == undefined) {
                        item.innerText = game.currentPlayerMark;
                        game.currentPlayer.giveMarks();
                        if (game.gameWin() == undefined) {
                            game.currentPlayer = playerTurn();
                            game.currentPlayerMark = playerMark();
                            dom.playerTurn.innerText = `It's your turn ${game.currentPlayer.name}`;
                        } else {
                            dom.playerTurn.innerText = game.gameWin();
                            dom.newGameButton.classList.toggle("display-none");
                            controller.abort();
                        }
                    } else {
                        dom.playerTurn.innerText = "Field is already occupied. Choose another one!";
                    }
                }, { signal })
            })
        }

        populateBoard();
    }

    return { playerTurn, playerMark, gameWin, playGame, currentPlayer, currentPlayerMark };
})();

dom.updateNames();
dom.startGame();
dom.newGame();