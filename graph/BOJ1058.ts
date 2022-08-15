// 1058: 친구
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number;
  let adj: number[][] = [];
  const floyd = (n: number, adj: number[][]) => {
    for (let k=0; k<n; k++) {
      for (let i=0; i<n; i++) {
        if (i == k) continue;
        for (let j=0; j<n; j++) {
          if (i == j) continue;
          if (adj[i][j] > adj[i][k] + adj[k][j]) {
            adj[i][j] = adj[i][k] + adj[k][j];
          }
        }
      }
    }
    return Math.max(...adj.map(friends => friends.filter(f => f <= 2).length));
  }
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else adj.push(input.split('').map(flag => flag == 'Y' ? 1 : Infinity));
  }).on('close', () => {
    console.log(floyd(n, adj).toString());
    process.exit();
  });
})();