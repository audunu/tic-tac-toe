// player factory function
const createPlayer = (name, marker) => {
    return { name, marker }
}



// gameboard object
const gameBoard = (() => {
    let board = ['X', 'O', 'X', 'O', 'O', 'O', 'X', 'O', 'X'];

    const render = () => {
        const gridContainer = document.querySelector('.grid-container');
        gameBoard.board.forEach(element => {
            const newDiv = document.createElement('div');
            newDiv.textContent = element;
            newDiv.classList.add('square');
            newDiv.addEventListener('click', (e) => {
                
            })
            gridContainer.appendChild(newDiv);
        })
        
    }


    return {
        board,
        render,
    };
})();










gameBoard.render();

