// 10157: 자리배정
(function () {
  const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");

  const [m, n] = input[0].split(" ").map(Number) as [number, number];
  const wait = +input[1];

  const arithmeticSequenceSum = (a: number, n: number, d: number) =>
    (n * (2 * a + (n - 1) * d)) / 2;

  const arrangeUnder5 = (
    m: number,
    n: number,
    wait: number,
    here: number,
    pos: [number, number]
  ) => {
    if (m * n < wait) return "0";
    const dy = [1, 0, -1, 0];
    const dx = [0, 1, 0, -1];
    let d = 0;
    let rotate = pos[0] - 1;
    while (here != wait) {
      for (
        let i = 0;
        i < (d % 2 == 0 ? n : m) - rotate * 2 - 1 - (d === 3 ? 1 : 0);
        i++
      ) {
        pos[0] += dx[d];
        pos[1] += dy[d];
        here++;
        if (here === wait) return pos.join(" ");
      }
      d = (d + 1) % 4;
      if (d === 0) {
        pos[1]++;
        here++;
        rotate++;
      }
    }
    return pos.join(" ");
  };
  const arrange = (m: number, n: number, wait: number) => {
    if (m * n < wait) return "0";
    let i = 0;
    let here = 1;
    if (m >= 5 && n >= 5) {
      const a = 2 * (m + n) - 4;
      while (1 + arithmeticSequenceSum(a, i, -8) <= wait) i++;
      i--;
      here = 1 + arithmeticSequenceSum(a, i, -8);
    }
    return arrangeUnder5(m, n, wait, here, [i + 1, i + 1]);
  };

  console.log(arrange(m, n, wait));
})();
