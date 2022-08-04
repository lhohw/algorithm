// 21316: 스피카
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const adj: number[][] = new Array(12).fill(undefined).map(_ => []);
  rl.on('line', (input: string) => {
    const [ u, v ] = input.split(' ').map(num => +num - 1);
    adj[u].push(v);
    adj[v].push(u);
  }).on('close', () => {
    let spica: number = 0;
    for (let i=0; i<12; i++) {
      const a = adj[i].map(p => adj[p].length).sort((a, b) => a-b);
      if (a.length == 3 && a[0] == 1 && a[1] == 2 && a[2] == 3) {
        spica = i+1;
        break;
      }
    }
    console.log(spica.toString());
    process.exit();
  });
})();