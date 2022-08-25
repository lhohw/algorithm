// 9290: 틱택토 이기기
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  type Turn = 'o' | 'x';
  type Board = string[][];
  let n: number;
  let board: string[][] = [];
  let turn: Turn = null!;
  let ret = '';
  let idx = 1;
  const checkRow = (board: Board, y: number, turn: Turn) => 
    board[y].reduce((sum, x) => sum + (x == turn ? 1 : 0), 0) === 3;

  const checkColumn = (board: Board, x: number, turn: Turn) => 
    new Array(3).fill(undefined).map((_, i) => board[i][x]).reduce((sum, val) => sum + (val == turn ? 1 : 0), 0) === 3;

  const checkDiagonal = (board: Board, direction: 0 | 1, turn: Turn) => {
    let sum = 0;
    for (let i=0; i<3; i++) {
      const here = direction === 0 ? board[i][i] : board[i][2-i];
      if (here === turn) sum++;
    }
    return sum === 3;
  }
  const check = (board: Board, turn: Turn, y: number, x: number) => {
    return checkRow(board, y, turn) ||
      checkColumn(board, x, turn) ||
      checkDiagonal(board, 0, turn) ||
      checkDiagonal(board, 1, turn);
  }

  const findPosition = (board: Board, turn: Turn) => {
    for (let y=0; y<3; y++) {
      for (let x=0; x<3; x++) {
        if (board[y][x] === '-') {
          board[y][x] = turn;
          if (check(board, turn, y, x)) return board;
          board[y][x] = '-';
        }
      }
    }
    throw new Error('Error');
  }
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else if (board.length < 3) board.push(input.split(''));
    else {
      turn = input as Turn;
      ret += `Case ${idx++}:\n`;
      ret += findPosition(board, turn)?.map(row => row.join('')).join('\n') + '\n';
      board = [];
    }
  }).on('close', () => {
    console.log(ret.trimEnd());
    process.exit();
  })
})();