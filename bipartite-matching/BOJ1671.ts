// 1671: 상어의 저녁식사
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number;
  let adj: number[][];
  let i = 0;
  const sharks: number[][] = [];
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
    for (let i=0; i<n; i++) {
      visited = new Array(n).fill(false);
      if (dfs(i)) size++;
    }
    return size;
  }
  rl.on('line', (input: string) => {
    if (n === undefined) {
      n = +input;
      aMatch = new Array(n).fill(-1);
      bMatch = new Array(n).fill(-1);
    }
    else sharks.push([ i++, ...input.split(' ').map(Number) ]);
  }).on('close', () => {
    adj = new Array(n).fill(undefined).map(_ => []);
    const canEat = (shark1: number[], shark2: number[]): boolean => {
      const [ index1, size1, speed1, intel1 ] = shark1;
      const [ index2, size2, speed2, intel2 ] = shark2;
      if (
        size1 >= size2 &&
        speed1 >= speed2 &&
        intel1 >= intel2
      ) {
        if (
          size1 == size2 &&
          speed1 == speed2 &&
          intel1 == intel2
        ) return index1 > index2;
        return true;
      }
      return false;
    }
    for (let i=0; i<n; i++) {
      const shark1 = sharks[i];
      for (let j=i+1; j<n; j++) {
        const shark2 = sharks[j];
        if (canEat(shark1, shark2)) adj[i].push(j);
        else if (canEat(shark2, shark1)) adj[j].push(i);
      }
    }
    let ret = 0;
    for (let i=0; i<2; i++) {
      ret += bipartiteMatch();
    }
    console.log((n - ret).toString());
    process.exit();
  });
})();