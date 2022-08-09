// 1613: 역사
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number, k: number, s: number;
  let relation: number[][];
  let ret = '';
  const floyd = () => {
    for (let k=1; k<=n; k++) {
      for (let i=1; i<=n; i++) {
        if (i == k) continue;
        for (let j=1; j<=n; j++) {
          if (relation[i][k] == -1 && relation[k][j] == -1) {
            relation[i][j] = -1;
            relation[j][i] = 1;
          }
        }
      }
    }
  }
  rl.on('line', (input: string) => {
    if (n === undefined) {
      [ n, k ] = input.split(' ').map(Number);
      relation = new Array(n+1).fill(undefined).map(_ => new Array(n+1).fill(0));
    }
    else if (k != 0) {
      k--;
      const [ u, v ] = input.split(' ').map(Number);
      relation[u][v] = -1;
      relation[v][u] = 1;
    }
    else if (s === undefined) {
      s = +input;
      floyd();
    }
    else if (s != 0) {
      s--;
      const [ u, v ] = input.split(' ').map(Number);
      ret += relation[u][v] + '\n';
    }
  }).on('close', () => {
    console.log(ret.trimEnd());
    process.exit();
  });
})();