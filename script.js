// player factory function
const Player = (name, marker, isActivePlayer) => {


    return {
        name,
        marker,
        isActivePlayer,
    };
}

// gameboard object
const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    return {
        board,

    };
})();


const game = (() => {

    const player1 = Player('player1', 'X', true);
    const player2 = Player('player2', 'O', false);


    const render = () => {
        const gridContainer = document.querySelector('.grid-container');
        gameBoard.board.forEach((element, index) => {
            const newDiv = document.createElement('div');
            newDiv.textContent = element;
            newDiv.classList.add('square');
            newDiv.setAttribute('data-index', index);
            newDiv.addEventListener('click', (e) => {
                e.preventDefault();
                while (gameBoard.board[index] === '') {
                    if (player1.isActivePlayer) {
                        gameBoard.board[index] = player1.marker;
                        player1.isActivePlayer = false;
                        player2.isActivePlayer = true;
                    }
                    else if (player2.isActivePlayer) {
                        gameBoard.board[index] = player2.marker;
                        player2.isActivePlayer = false;
                        player1.isActivePlayer = true;

                    }
                }

                gridContainer.innerHTML = '';
                render();
            })
            gridContainer.appendChild(newDiv);
        })

    }
    return {
        render,
    }



})();







game.render();

