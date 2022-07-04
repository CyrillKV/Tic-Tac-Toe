const gameBoard = (() => {
  let board = [];
  let p1; let p2; let currPlayer;
  const cells = document.querySelectorAll('.gameboard>*');
  const players = document.querySelectorAll('.players>input');
  const result_box = document.querySelector('.result_box');
  const result_msg = document.querySelector('.result_box>p');

  const startGame = () => {
    _newBoard();
    _drawBoard();
    _newPlayers();
    result_box.style.display = 'none';
    result_msg.textContent = '';
    cells.forEach(cell => cell.addEventListener('click', (event) => {
      const cellID = event.target.id;
      _makeTurn(cellID, currPlayer);
      _drawBoard();
      _winCon();
      _switchPlayers();
    }));
  };

  const _Player = (name, mark) => {
    return {name, mark};
  };

  const _newPlayers = () => {
    p1 = _Player(players[0].value, 'X');
    p2 = _Player(players[1].value, 'O');
    currPlayer = p1;
  };

  const _switchPlayers = () => {
    currPlayer === p1 ? currPlayer = p2 : currPlayer = p1;
  };

  const _newBoard = () => {
    board = [];
    for (let i = 0; i < 9; i++){
      board.push(null);
    };
  };

  const resetBoard = () => {
    result_box.style.display = 'none';
    result_msg.textContent = '';
    p1 = ''; p2 = '';
    players.forEach(player => player.textContent = '');
    _newBoard();
    _drawBoard();
  };

  const showLog = () => {
    console.log(board);
    console.log(p1, p2);
  };

  const _drawBoard = () => {
    for (let i = 0; i < 9; i++){
      cells[i].textContent = board[i];
    };
  };

  const _makeTurn = (cell, player) => {
    if (board[cell] === null){
      board[cell] = player.mark;
    };
  };

  const _winCon = () => {
    const winTemplate = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
                         [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (con of winTemplate){
      if ((board[con[0]] != null) && (board[con[1]] != null) && (board[con[2]] != null)){
        if ((board[con[0]] === board[con[1]]) && (board[con[1]] === board[con[2]])){
          console.log(`${currPlayer.name} won!`);
          result_box.style.display = 'flex';
          result_msg.textContent = `${currPlayer.name} won!`;
        };
      };
    };
  };

  return {startGame, resetBoard, showLog};
})();

const btns = document.querySelectorAll('.btns button');
btns[0].addEventListener('click', () => gameBoard.startGame());
btns[1].addEventListener('click', () => gameBoard.resetBoard());