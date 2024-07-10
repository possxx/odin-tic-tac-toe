function createPlayer(name, mark) {
    
    let marks = 0;
    const getMarks = () => marks;
    const giveMarks = () => marks++;

    return { name, mark, getMarks, giveMarks };
}

const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("Player2", "O");

const gameboard = (function () {
    const row1 = [undefined, undefined, undefined];
    const row2 = [undefined, undefined, undefined];
    const row3 = [undefined, undefined, undefined];
    const column1 = [undefined, undefined, undefined];
    const column2 = [undefined, undefined, undefined];
    const column3 = [undefined, undefined, undefined];
    return { board: [row1, row2, row3, column1, column2, column3] };
})();

const game = (function () {
    const randomNumber = Math.floor(Math.random() * 2);

    const playerTurn = () => {
        if (player1.getMarks() == player2.getMarks()) {
            if (randomNumber === 1) {
                return player1.name;
            } else {
                return player2.name;
            }
        } else if (player1.getMarks() > player2.getMarks()) {
            return player2.name;
        } else if (player2.getMarks() > player1.getMarks()) {
            return player1.name;
        }
    }

    const playerMark = () => {
        if (playerTurn() === player1.name) {
            return player1.mark;
        } else if (playerTurn() === player2.name) {
            return player2.mark;
        }
    }

    const gameWin = () => {
        if (gameboard.board[0].toString() == [player1.mark, player1.mark, player1.mark].toString() || 
            gameboard.board[1].toString() == [player1.mark, player1.mark, player1.mark].toString() ||
            gameboard.board[2].toString() == [player1.mark, player1.mark, player1.mark].toString() ||
            gameboard.board[3].toString() == [player1.mark, player1.mark, player1.mark].toString() ||
            gameboard.board[4].toString() == [player1.mark, player1.mark, player1.mark].toString() ||
            gameboard.board[5].toString() == [player1.mark, player1.mark, player1.mark].toString() ||
            gameboard.board[0][0] + gameboard.board[1][1] + gameboard.board[2][2] == player1.mark + player1.mark + player1.mark ||
            gameboard.board[0][2] + gameboard.board [1][1] + gameboard.board[2][0] == player1.mark + player1.mark + player1.mark
        ) {
            return `${player1.name} wins!`;
        } else if (gameboard.board[0].toString() == [player2.mark, player2.mark, player2.mark].toString() || 
                   gameboard.board[1].toString() == [player2.mark, player2.mark, player2.mark].toString() ||
                   gameboard.board[2].toString() == [player2.mark, player2.mark, player2.mark].toString() ||
                   gameboard.board[3].toString() == [player2.mark, player2.mark, player2.mark].toString() ||
                   gameboard.board[4].toString() == [player2.mark, player2.mark, player2.mark].toString() ||
                   gameboard.board[5].toString() == [player2.mark, player2.mark, player2.mark].toString() ||
                   gameboard.board[0][0] + gameboard.board[1][1] + gameboard.board[2][2] == player2.mark + player2.mark + player2.mark ||
                   gameboard.board[0][2] + gameboard.board [1][1] + gameboard.board[2][0] == player2.mark + player2.mark + player2.mark
                ) {
                    return `${player2.name} wins!`;
        } else if (player1.getMarks() + player2.getMarks() == 9) {
            return "It's a tie!";
        }
    }

    return { playerTurn, playerMark, gameWin };
})();

