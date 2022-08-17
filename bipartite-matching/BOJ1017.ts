// 1017: 소수 쌍
(function() {
  type DFS = (a: number, visited: boolean[], flagMatch: number[], targetMatch: number[]) => boolean;
  type BipartiteMatch = () => string;
  
  const EVEN = 0, ODD = 1;
  const MAX = 2000;
  const isPrime = new Array(MAX).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let i=2; i<=Math.sqrt(MAX); i++) {
    if (!isPrime[i]) continue;
    for (let j=i*i; j<=MAX; j+=i) isPrime[j] = false;
  }
  const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
  const n = +input[0];
  const list: number[] = input[1].split(' ').map(Number);
  
  const init = () => {
    const odd: number[] = [], even: number[] = [];
    const from = (list[0] % 2 == EVEN) ? even : odd;
    const to = (list[0] % 2 == EVEN) ? odd : even;
    list.forEach((num, i) => ((num % 2 == EVEN) ? even : odd).push(i));
    const adj: number[][] = new Array(n/2).fill(undefined).map(_ => []);
    if (from.length != to.length) return { adj, from, to };
  
    from.forEach((idx, fromIdx) => {
      to.forEach((idx2, toIdx) => {
        if (isPrime[list[idx] + list[idx2]]) adj[fromIdx].push(toIdx);
      });
    });
    return { adj, from, to };
  }
  
  const { adj, from, to } = init();
  
  const dfs: DFS = (a, visited, flagMatch, targetMatch) => {
    if (visited[a]) return false;
    visited[a] = true;
    for (let i=0; i<adj[a].length; i++) {
      const b = adj[a][i];
      if (targetMatch[b] == -1 || (targetMatch[b] != 0 && dfs(targetMatch[b], visited, flagMatch, targetMatch))) {
        flagMatch[a] = b;
        targetMatch[b] = a;
        return true;
      }
    }
    return false;
  }
  const bipartiteMatch: BipartiteMatch = () => {
    const set = new Set<number>();
    for (let i=0; i<adj[0].length; i++) {
      const flagMatch = new Array(n/2).fill(-1);
      const targetMatch = new Array(n/2).fill(-1);
      const matched = adj[0][i];
      flagMatch[0] = matched;
      targetMatch[matched] = 0;
      let cnt = 1;
      for (let j=1; j<n/2; j++) {
        let visited = new Array(n/2).fill(false);
        if (dfs(j, visited, flagMatch, targetMatch)) {
          cnt++;
        }
      }
      if (cnt == n/2) set.add(matched);
    }
    return set.size ?
      Array.from(set).map(num => list[to[num]]).sort((a, b) => a-b).join(' ') :
      '-1';
  }
  const solve = () => {
    if (adj[0].length == 0) return '-1';
    if (from.length != to.length) return '-1';
    return bipartiteMatch();
  }
  console.log(solve());
})();