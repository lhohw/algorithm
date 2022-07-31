// 11375: 열혈강호
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number, m: number;
  const adj: number[][] = [];
  let visited: boolean[], aMatch: number[], bMatch: number[];

  const dfs = (a: number): boolean => {
    if (visited[a]) return false;
    visited[a] = true;
    for (let i=0; i<adj[a].length; i++) {
      const b = adj[a][i];
      if (bMatch[b] == -1 || dfs(bMatch[b])) {
        aMatch[a] = b;
        bMatch[b] = a;
        return true;
      }
    }
    return false;
  }
  const bipartiteMatch = () => {
    let size = 0;
    aMatch = new Array(n).fill(-1);
    bMatch = new Array(m).fill(-1);
    for (let i=0; i<n; i++) {
      visited = new Array(n).fill(false);
      if (dfs(i)) size++;
    }
    return size;
  }
  rl.on('line', (input: string) => {
    if (n === undefined) [ n, m ] = input.split(' ').map(Number);
    else adj.push(input.split(' ').map((num) => parseInt(num)-1).slice(1, ));
  }).on('close', () => {
    console.log(bipartiteMatch());
    process.exit();
  });
})();