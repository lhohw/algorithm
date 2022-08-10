// 4095: 최대 정사각형
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n = 0, m = 0;
  let board: number[][];
  let ret = '';
  const calcSideLength = (n: number, m: number, board: number[][]) => {
    let max = 0;
    for (let y=1; y<=n; y++) {
      for (let x=1; x<=m; x++) {
        if (board[y][x] == 0) continue;
        board[y][x] = Math.min(board[y-1][x-1], board[y-1][x], board[y][x-1]) + 1;
        max = Math.max(max, board[y][x]);
      }
    }
    return max;
  }
  rl.on('line', (input: string) => {
    if (n == 0) {
      [ n, m ] = input.split(' ').map(Number);
      board = [ new Array(m+1).fill(0) ];
      if (n == 0 && m == 0) rl.close();
    }
    else {
      board.push([ 0, ...input.split(' ').map(Number) ]);
      if (board.length == n+1) {
        ret += calcSideLength(n, m, board) + '\n';
        n = 0, m = 0;
      }
    }
  }).on('close', () => {
    console.log(ret.trimEnd());
    process.exit();
  });
})();