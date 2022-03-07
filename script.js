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

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

    return {
        board,
        winningCombos,
    };
})();


const game = (() => {

    const player1 = Player('player1', 'X', true);
    const player2 = Player('player2', 'O', false);
    let gameOver = false;

    const checkWinner = () => {
        for (let i = 0; i < gameBoard.winningCombos.length; i++) {
            let a = gameBoard.board[gameBoard.winningCombos[i][0]];
            let b = gameBoard.board[gameBoard.winningCombos[i][1]];
            let c = gameBoard.board[gameBoard.winningCombos[i][2]];
            if (a === b && b == c && a !== '') {
                gameOver = true;
                a === 'X' ? document.querySelector('.text').textContent = 'Congrats to Player 1!!!' : document.querySelector('.text').textContent = 'Congrats to Player 2!!!';
                document.querySelector('.text').classList.add('green');
            }
        }
        if (!gameBoard.board.includes('')) {
            document.querySelector('.text').textContent = 'It´s a tie!';
        }
        
    }






    const render = () => {
        const gridContainer = document.querySelector('.grid-container');
        gameBoard.board.forEach((element, index) => {
            const newDiv = document.createElement('div');
            newDiv.textContent = element;
            newDiv.classList.add('square');
            newDiv.setAttribute('data-index', index);
            newDiv.addEventListener('click', (e) => {
                e.preventDefault();
                while (gameBoard.board[index] === '' && gameOver === false) {
                    if (player1.isActivePlayer) {
                        gameBoard.board[index] = player1.marker;
                        player1.isActivePlayer = false;
                        player2.isActivePlayer = true;
                        document.querySelector('.text').textContent = 'Player 2 to play';
                    }
                    else if (player2.isActivePlayer) {
                        gameBoard.board[index] = player2.marker;
                        player2.isActivePlayer = false;
                        player1.isActivePlayer = true;
                        document.querySelector('.text').textContent = 'Player 1 to play';

                    }
                    checkWinner();
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

