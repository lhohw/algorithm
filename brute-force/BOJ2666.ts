// 2666: 벽장문의 이동
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  type Closet = [ number, number ];
  let n: number;
  let closet: Closet;
  let m: number;
  const sequence: number[] = [];
  const slide = (closet: Closet, idx: number): number => {
    if (idx == m) return 0;
    const [ left, right ] = closet;
    const target = sequence[idx];
    if (target < left) return slide([ target, right ], idx+1) + left - target;
    if (target > right) return slide([ left, target ], idx+1) + target - right;
    return Math.min(
      slide([ target, right ], idx+1) + target - left,
      slide([ left, target ], idx+1) + right - target
    );
  }
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else if (closet === undefined) closet = input.split(' ').map(num => parseInt(num) - 1) as Closet;
    else if (m === undefined) m = +input;
    else sequence.push(parseInt(input) - 1);
  }).on('close', () => {
    console.log(slide(closet, 0));
    process.exit();
  });
})();