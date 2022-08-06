// 3040: 백설 공주와 일곱 난쟁이
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const dwarf: number[] = [];
  const isHundred = (picked: number[]) => picked.reduce((x, y) => x+y) == 100;
  const pick = (picked: number[], idx: number) => {
    if (picked.length == 7) {
      if (isHundred(picked)) console.log(picked.join('\n'));
      return;
    }
    if (idx == 9) return;
    picked.push(dwarf[idx]);
    pick(picked, idx+1);
    picked.pop();
    pick(picked, idx+1);
  }
  rl.on('line', (input: string) => {
    dwarf.push(+input);
  }).on('close', () => {
    pick([], 0);
    process.exit();
  });
})();