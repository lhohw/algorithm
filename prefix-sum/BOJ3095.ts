// 3095: 플러스의 개수
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  type Center = [ number, number ];
  let n: number;
  const board: number[][] = [];
  let partialSum: number[][];

  const init = () => {
    partialSum = new Array(n).fill(undefined).map((_, i) => [ ...board[i] ]);
    for (let y=0; y<n; y++) {
      for (let x=0; x<n; x++) {
        if (y != 0) partialSum[y][x] += partialSum[y-1][x];
        if (x != 0) partialSum[y][x] += partialSum[y][x-1];
        if (y != 0 && x != 0) partialSum[y][x] -= partialSum[y-1][x-1];
      }
    }
  }
  const isPlus = (center: Center, side: number): boolean => {
    const [ y, x ] = center;
    if (
      (y-side) >= 0 && board[y-side][x] == 1 &&
      (y+side) < n && board[y+side][x] == 1 &&
      (x-side) >= 0 && board[y][x-side] == 1 &&
      (x+side) < n && board[y][x+side] == 1
    ) {
      let sum = partialSum[y+side][x+side];
      if (y-side != 0) sum -= partialSum[y-side-1][x+side];
      if (x-side != 0) sum -= partialSum[y+side][x-side-1];
      if (y-side != 0 && x-side != 0) sum += partialSum[y-side-1][x-side-1];
      return sum == (side * 4 + 1);
    }
    return false;
  }
  const countPlus = (center: Center): number => {
    let side = 1;
    while (isPlus(center, side)) side++;
    return side - 1;
  }
  const solve = (): number => {
    init();
    let ret = 0;
    for (let y=0; y<n; y++) {
      for (let x=0; x<n; x++) {
        if (board[y][x] == 0) continue;
        ret += countPlus([ y, x ]);
      }
    }
    return ret;
  }
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else board.push(input.split('').map(Number));
  }).on('close', () => {
    console.log(solve().toString());
    process.exit();
  });
}());