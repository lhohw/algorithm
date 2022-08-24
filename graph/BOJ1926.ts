// 1926: 그림
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  type Point = [ number, number ];
  let n: number, m: number;
  const board: number[][] = [];
  const solve = (n: number, m: number, board: number[][]) => {
    const visited: boolean[][] = new Array(n).fill(undefined).map(_ => new Array(m).fill(false));
    let cnt = 0;
    let max = 0;
    const dy = [ -1, 0, 1, 0 ];
    const dx = [ 0, 1, 0, -1 ];
    for (let y=0; y<n; y++) {
      for (let x=0; x<m; x++) {
        if (visited[y][x] || board[y][x] === 0) continue;
        let tmp = 0;
        cnt++;
        visited[y][x] = true;
        const queue: Point[] = [ [ y, x ] ];
        while (queue.length) {
          tmp++;
          const [ y, x ] = queue.shift()!;
          for (let d=0; d<4; d++) {
            const ny = y + dy[d];
            const nx = x + dx[d];
            if (ny >= n || ny < 0 || nx >= m || nx < 0 || board[ny][nx] == 0 || visited[ny][nx]) continue;
            queue.push([ ny, nx ]);
            visited[ny][nx] = true;
          }
        }
        max = Math.max(max, tmp);
      }
    }
    return cnt + '\n' + max;
  }
  rl.on('line', (input: string) => {
    if (n === undefined && m === undefined) {
      [ n, m ] = input.split(' ').map(Number);
    }
    else board.push(input.split(' ').map(Number));
  }).on('close', () => {
    const ret = solve(n, m, board);
    console.log(ret);
    process.exit();
  });
})();