// 1022: 소용돌이 예쁘게 출력하기
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const arithmeticSequenceSum = (a: number, n: number, d: number = 8) => {
    return 1 + n * (2*a + (n-1)*d) / 2;
  }
  const findNumber = (r: number, c: number): number => {
    let num = 0;
    if (r == 0) {
      if (c == 0) num = 1;
      else if (c > 0) num = arithmeticSequenceSum(1, c);
      else if (c < 0) {
        num = arithmeticSequenceSum(5, -c);
      }
    }
    else if (r > 0) {
      if (c == 0) num = arithmeticSequenceSum(7, r);
      else if (c > 0) {
        if (r >= c) num = arithmeticSequenceSum(7, r) + c;
        else if (r < c) num = arithmeticSequenceSum(1, c) - r;
      }
      else if (c < 0) {
        if (r >= -c) num = arithmeticSequenceSum(7, r) + c;
        else if (r < -c) num = arithmeticSequenceSum(5, -c) + r;
      }
    }
    else if (r < 0) {
      if (c == 0) num = arithmeticSequenceSum(3, -r);
      else if (c > 0) {
        if (-r >= c) num = arithmeticSequenceSum(3, -r) - c;
        else if (-r < c) num = arithmeticSequenceSum(1, c) - r;
      }
      else if (c < 0) {
        if (-r >= -c) num = arithmeticSequenceSum(3, -r) - c;
        else if (-r < -c) num = arithmeticSequenceSum(5, -c) + r;
      }
    }
    return num;
  }
  const makeEddy = (r1: number, c1: number, r2: number, c2: number) => {
    const ret: number[][] = new Array(r2-r1+1).fill(undefined).map(_ => new Array(c2-c1+1).fill(0));
    let max = 0;
    for (let r=r1; r<=r2; r++) {
      for (let c=c1; c<=c2; c++) {
        const num = findNumber(r, c);
        ret[r-r1][c-c1] = num;
        max = Math.max(max, num);
      }
    }
    const len = max.toString().length;
    return ret.map(row => row.map(num => num.toString().padStart(len, ' ')).join(' ')).join('\n');
  }
  rl.on('line', (input: string) => {
    const [ r1, c1, r2, c2 ] = input.split(' ').map(Number);
    const ret = makeEddy(r1, c1, r2, c2);
    console.log(ret);
    rl.close();
  });
})();