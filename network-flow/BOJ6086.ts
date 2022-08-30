// 6086: 최대 유량
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const ctoi = (c: string) => {
    const A = 'A'.charCodeAt(0);
    const i = c.charCodeAt(0);
    return i - (i >= 97 ? (A+6) : A);
  }
  const MAX = 52;
  let n: number;
  let flow: number[][];
  let capacity: number[][];
  const residualCapacity = (u: number, v: number) => capacity[u][v] - flow[u][v];
  const networkFlow = () => {
    const source = 0, sink = 25;
  
    let totalFlow = 0;
    while (true) {
      const parent = new Array(MAX).fill(-1);
      parent[source] = source;
      const queue = [ source ];
      while (queue.length && parent[sink] === -1) {
        const here = queue.shift()!;
        for (let there=0; there<MAX; there++) {
          if (residualCapacity(here, there) > 0 && parent[there] == -1) {
            parent[there] = here;
            queue.push(there);
          }
        }
      }
      if (parent[sink] == -1) break;
      
      let amount = Infinity;
      let p = sink;
      while (p != source) {
        amount = Math.min(amount, residualCapacity(parent[p], p));
        p = parent[p];
      }
      p = sink;
      while (p != source) {
        flow[parent[p]][p] += amount;
        flow[p][parent[p]] -= amount;
        p = parent[p];
      }
      totalFlow += amount;
    }
    return totalFlow;
  }
  rl.on('line', (input: string) => {
    if (n === undefined) {
      n = +input;
      flow = new Array(MAX).fill(undefined).map(_ => new Array(MAX).fill(0));
      capacity = new Array(MAX).fill(undefined).map(_ => new Array(MAX).fill(0));
    }
    else {
      const [ node1, node2, capa ] = input.split(' ');
      const u = ctoi(node1),
            v = ctoi(node2);
      capacity[u][v] += +capa;
      capacity[v][u] += +capa;
    }
  }).on('close', () => {
    const ret = networkFlow();
    console.log(ret.toString());
    process.exit();
  });
})();