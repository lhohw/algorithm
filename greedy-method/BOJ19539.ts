// 19539: 사과나무
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number = 0;
  let heights: number[];
  rl.on('line', (input: string) => {
    if (!n) n = +input;
    else heights = input.split(' ').map(Number);
  }).on('close', () => {
    let one = 0;
    heights = heights.filter(height => height == 1 ? !(++one) : true);
    while (one && heights.length) {
      const height = heights.pop()!;
      const share = Math.floor(height / 2);
      const mod = height % 2;
      if (one >= share) {
        one -= share;
        if (mod) one++;
      }
      else {
        heights.push(height - (one * 2));
        one = 0;
        break;
      }
    }
    let flag = 'YES';
    heights = heights.filter(e => e % 3 !== 0);
    if (one) flag = 'NO';
    else {
      const mod = [ 0, 0, 0 ]
      for (let i=0; i<heights.length; i++) {
        mod[heights[i] % 3]++;
      }
      mod[1] %= 3;
      mod[2] %= 3;
      if (mod[1] != mod[2]) flag = 'NO';
    }
    console.log(flag);
    process.exit();
  });
})();