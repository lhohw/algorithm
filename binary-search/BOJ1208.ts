// 1208: 부분 수열의 합 2
(function () {
  const [[n, s], seq]: number[][] = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line: string) => line.split(" ").map(Number));

  let ret = 0;
  const map = new Map<number, number>();
  const calcLeft = (idx: number, sum: number) => {
    if (idx === Math.floor(n / 2)) {
      map.set(sum, 1 + (map.get(sum) || 0));
      return;
    }
    calcLeft(idx + 1, sum);
    calcLeft(idx + 1, sum + seq[idx]);
  };
  const calcRight = (idx: number, sum: number) => {
    if (idx === n) {
      ret += map.get(s - sum) || 0;
      return;
    }
    calcRight(idx + 1, sum);
    calcRight(idx + 1, sum + seq[idx]);
  };
  const solve = () => {
    if (n === 1) return seq[0] === s ? 1 : 0;
    calcLeft(0, 0);
    calcRight(Math.floor(n / 2), 0);
    if (s === 0) ret--;
    return ret;
  };
  console.log(solve().toString());
})();
