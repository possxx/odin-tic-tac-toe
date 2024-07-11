function createPlayer(name, mark) {
    
    let marks = 0;
    const getMarks = () => marks;
    const giveMarks = () => marks++;
    const clearMarks = () => marks = 0;

    return { name, mark, getMarks, giveMarks, clearMarks };
}

const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("Player2", "O");

const gameboard = (function () {
    const row1 = [undefined, undefined, undefined];
    const row2 = [undefined, undefined, undefined];
    const row3 = [undefined, undefined, undefined];
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
        if (gameboard.board[0][0] + gameboard.board[0][1] + gameboard.board[0][2] == player1.mark + player1.mark + player1.mark ||
            gameboard.board[1][0] + gameboard.board[1][1] + gameboard.board[1][2] == player1.mark + player1.mark + player1.mark ||
            gameboard.board[2][0] + gameboard.board[2][1] + gameboard.board[2][2] == player1.mark + player1.mark + player1.mark ||
            gameboard.board[0][0] + gameboard.board[1][0] + gameboard.board[2][0] == player1.mark + player1.mark + player1.mark ||
            gameboard.board[0][1] + gameboard.board[1][1] + gameboard.board[2][1] == player1.mark + player1.mark + player1.mark ||
            gameboard.board[0][2] + gameboard.board[1][2] + gameboard.board[2][2] == player1.mark + player1.mark + player1.mark ||
            gameboard.board[0][0] + gameboard.board[1][1] + gameboard.board[2][2] == player1.mark + player1.mark + player1.mark ||
            gameboard.board[0][2] + gameboard.board[1][1] + gameboard.board[2][0] == player1.mark + player1.mark + player1.mark
        ) {
            return `${player1.name} wins!`;
        } else if (gameboard.board[0][0] + gameboard.board[0][1] + gameboard.board[0][2] == player2.mark + player2.mark + player2.mark ||
            gameboard.board[1][0] + gameboard.board[1][1] + gameboard.board[1][2] == player2.mark + player2.mark + player2.mark ||
            gameboard.board[2][0] + gameboard.board[2][1] + gameboard.board[2][2] == player2.mark + player2.mark + player2.mark ||
            gameboard.board[0][0] + gameboard.board[1][0] + gameboard.board[2][0] == player2.mark + player2.mark + player2.mark ||
            gameboard.board[0][1] + gameboard.board[1][1] + gameboard.board[2][1] == player2.mark + player2.mark + player2.mark ||
            gameboard.board[0][2] + gameboard.board[1][2] + gameboard.board[2][2] == player2.mark + player2.mark + player2.mark ||
            gameboard.board[0][0] + gameboard.board[1][1] + gameboard.board[2][2] == player2.mark + player2.mark + player2.mark ||
            gameboard.board[0][2] + gameboard.board[1][1] + gameboard.board[2][0] == player2.mark + player2.mark + player2.mark
                ) {
                    return `${player2.name} wins!`;
        } else if (player1.getMarks() + player2.getMarks() == 9) {
            return "It's a tie!";
        }
    }

    const playGame = () => {
        let currentPlayer = game.playerTurn();
        let currentPlayerMark = game.playerMark();
        console.log( `It's your turn ${currentPlayer.name} (${currentPlayerMark})!`);

        function populateBoard() {
            let currentPlayerTurn = prompt("Choose a row with a column like so: 11 (1 for Row, 1 for Column");
            if (currentPlayerTurn == "11" && gameboard.board[0][0] == undefined) {
                gameboard.board[0][0] = currentPlayerMark;
                currentPlayer.giveMarks();
            } else if (currentPlayerTurn == "12" && gameboard.board[0][1] == undefined) {
                gameboard.board[0][1] = currentPlayerMark;
                currentPlayer.giveMarks();
            } else if (currentPlayerTurn == "13" && gameboard.board[0][2] == undefined) {
                gameboard.board[0][2] = currentPlayerMark;
                currentPlayer.giveMarks();
            } else if (currentPlayerTurn == "21" && gameboard.board[1][0] == undefined) {
                gameboard.board[1][0] = currentPlayerMark;
                currentPlayer.giveMarks();
            } else if (currentPlayerTurn == "22" && gameboard.board[1][1] == undefined) {
                gameboard.board[1][1] = currentPlayerMark;
                currentPlayer.giveMarks();
            } else if (currentPlayerTurn == "23" && gameboard.board[1][2] == undefined) {
                gameboard.board[1][2] = currentPlayerMark;
                currentPlayer.giveMarks();
            } else if (currentPlayerTurn == "31" && gameboard.board[2][0] == undefined) {
                gameboard.board[2][0] = currentPlayerMark;
                currentPlayer.giveMarks();
            } else if (currentPlayerTurn = "32" && gameboard.board[2][1] == undefined) {
                gameboard.board[2][1] = currentPlayerMark;
                currentPlayer.giveMarks();
            } else if (currentPlayerTurn = "33" && gameboard.board[2][2] == undefined) {
                gameboard.board[2][2] = currentPlayerMark;
                currentPlayer.giveMarks();
            } else {
                populateBoard();
            }
        }

        populateBoard();

        if (game.gameWin() == undefined) {
            game.playGame();
        } else {
            console.log( game.gameWin() );
            player1.clearMarks();
            player2.clearMarks();
            gameboard.board[0] = [undefined, undefined, undefined];
            gameboard.board[1] = [undefined, undefined, undefined];
            gameboard.board[2] = [undefined, undefined, undefined];
        }
    }

    return { playerTurn, playerMark, gameWin, playGame };
})();
