// 1449: 수리공 항승
(function() {
  const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
  const [ n, l ] = input[0].split(' ').map(Number);
  const leaks: number[] = input[1].split(' ').map(Number).sort((a: number, b: number) => a-b);
  const countTape = (n: number, l: number, leaks: number[]): number => {
    let cnt = 0;
    let lastTaping = 0;
    leaks.forEach((leak) => {
      if (leak > lastTaping) {
        cnt++;
        lastTaping = leak - 0.5 + l;
      }
    })
    return cnt;
  };
  console.log(countTape(n, l, leaks).toString());
})();