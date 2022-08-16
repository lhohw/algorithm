// 2367: 파티
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number, k: number, d: number;
  let capacity: number[][], flow: number[][];
  let idx = 0;
  const residualCapacity = (u: number, v: number) => capacity[u][v] - flow[u][v];
  const networkFlow = (source: number, sink: number) => {
    let totalFlow = 0;
    while (true) {
      const parent = new Array(n+d+2).fill(-1);
      parent[source] = source;
      const q = [ 0 ];
      while (q.length && parent[sink] == -1) {
        const here = q.shift()!;
        for (let there=0; there<n+d+2; there++) {
          if (residualCapacity(here, there) > 0 && parent[there] == -1) {
            q.push(there);
            parent[there] = here;
          }
        }
      }
      if (parent[sink] == -1) break;
      let amount = Infinity;
      for (let p=sink; p != source; p = parent[p]) {
        amount = Math.min(amount, residualCapacity(parent[p], p));
      }
      for (let p=sink; p != source; p = parent[p]) {
        flow[parent[p]][p] += amount;
        flow[p][parent[p]] -= amount;
      }
      totalFlow += amount;
    }
    return totalFlow;
  }
  rl.on('line', (input: string) => {
    if (n === undefined) [ n, k, d ] = input.split(' ').map(Number);
    else if (capacity === undefined) {
      const len = n + d + 2;
      capacity = new Array(len).fill(undefined).map(_ => new Array(len).fill(0));
      flow = new Array(len).fill(undefined).map(_ => new Array(len).fill(0));
      for (let i=0; i<n; i++) {
        capacity[0][2+i] = k;
      }
      const limit = input.split(' ').map(Number);
      for (let i=0; i<d; i++) {
        capacity[2+n+i][1] = limit[i];
      }
    }
    else {
      const [ size, ...canMake ] = input.split(' ').map(Number);
      for (let i=0; i<size; i++) {
        const dish = canMake[i] - 1;
        capacity[2+idx][2+n+dish] = 1;
      }
      idx++;
    }
  }).on('close', () => {
    console.log(networkFlow(0, 1).toString());
    process.exit();
  });
})();