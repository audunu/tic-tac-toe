// player factory function
const Player = (name, marker, isActive) => {


    return {
        name,
        marker,
        isActive,
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
                    if (player1.isActive) {
                        gameBoard.board[index] = player1.marker;
                        player1.isActive = false;
                        player2.isActive = true;
                    }
                    else if (player2.isActive) {
                        gameBoard.board[index] = player2.marker;
                        player2.isActive = false;
                        player1.isActive = true;

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

