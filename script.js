// player factory function


let player1Input;
let player2Input;

const startBtn = document.querySelector('.pop-up button');
const popUp = document.querySelector('.pop-up');

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    player1Input = document.querySelector('#player1').value;
    player2Input = document.querySelector('#player2').value;
    document.querySelector('.text').textContent = `${player1Input} to play`;
    popUp.style.visibility = 'hidden';
    game.render();
});




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

    const reset = () => {
        for (let i = 0; i < board.length; i++)
            board[i] = '';
    }

    return {
        reset,
        board,
        winningCombos,
    };
})();


const game = (() => {

    let player1 = Player(player1Input, 'X', true);
    let player2 = Player(player2Input, 'O', false);
    let gameOver = false;

    const checkWinner = () => {
        for (let i = 0; i < gameBoard.winningCombos.length; i++) {
            let a = gameBoard.board[gameBoard.winningCombos[i][0]];
            let b = gameBoard.board[gameBoard.winningCombos[i][1]];
            let c = gameBoard.board[gameBoard.winningCombos[i][2]];
            if (a === b && b == c && a !== '') {
                gameOver = true;
                
                a === 'X' ? document.querySelector('.text').textContent = `Congrats to ${player1Input}!!!` : document.querySelector('.text').textContent = `Congrats to ${player2Input}!!!`;
                document.querySelector('.text').classList.add('green');
            }
        }
        if (gameOver === false && !gameBoard.board.includes('')) {
            document.querySelector('.text').textContent = 'It´s a tie!';
        }

    }

    const render = () => {
        const gridContainer = document.querySelector('.grid-container');
        gridContainer.innerHTML = '';
    
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
                        document.querySelector('.text').textContent = `${player2Input} to play`;
                        
                    }
                    else if (player2.isActivePlayer) {
                        gameBoard.board[index] = player2.marker;
                        player2.isActivePlayer = false;
                        player1.isActivePlayer = true;
                        document.querySelector('.text').textContent = `${player1Input} to play`;
                        


                    }
                    checkWinner();
                }

                gridContainer.innerHTML = '';
                
                render();
            })
            gridContainer.appendChild(newDiv);
        })
    }

    const addEvent = () => {
        const restartBtn = document.querySelector('.restartBtn-container button');
        restartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            gameBoard.reset();
            document.querySelector('.text').textContent = `${player1Input} to play`;
            render();
            gameOver = false;
            player1.isActivePlayer = true;
            player2.isActivePlayer = false;
            document.querySelector('.text').classList.remove('green');
        })
    }


    return {
        render,
        addEvent,
    }



})();


game.render();
game.addEvent();






