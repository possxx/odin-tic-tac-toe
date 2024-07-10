const gameboard = (function () {
    const row1 = [null, null, null];
    const row2 = [null, null, null];
    const row3 = [null, null, null];
    const column1 = [null, null, null];
    const column2 = [null, null, null];
    const column3 = [null, null, null];
    return { board: [row1, row2, row3, column1, column2, column3] };
})();

function createPlayer(mark) {
    
    let marks = 0;
    const getMarks = () => marks;
    const giveMarks = () => marks++;

    return { mark, getMarks, giveMarks };
}

const player1 = createPlayer("X");
const player2 = createPlayer("O");

