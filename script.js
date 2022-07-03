const gameBoard = (() => {
  let board = [];
  let p1; let p2; let currPlayer;
  const cells = document.querySelectorAll('.gameboard>*');
  const players = document.querySelectorAll('.players>input');

  const startGame = () => {
    _newBoard();
    _newPlayers();
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
    _drawBoard();
    cells.forEach(cell => cell.addEventListener('click', (event) => {
      const cellID = event.target.id;
      if (cell.textContent === ''){
        _fillCell(cellID, currPlayer);
        _drawBoard();
        _switchPlayers();
      };
    }));
  };

  const showLog = () => {
    console.log(board);
    console.log(p1, p2);
  };

  const _drawBoard = () => {
    for (let i = 0; i < 9; i++){
      cells[i].textContent = board[i];
    }
  };

  const _fillCell = (cell, player) => {
    board[cell] = player.mark;
  };

  const _winCon = () => {
    /*continue here
    012  036  048
    345  147  246
    678  258
    */
  };

  return {startGame, showLog};
})();

