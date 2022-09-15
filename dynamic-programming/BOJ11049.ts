// 11049: 행렬 곱셈 순서
(function () {
  type Matrix = [number, number];
  const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");
  const n = +input[0];
  const matrix: Matrix[] = input
    .slice(1)
    .map((line: string) => line.split(" ").map(Number));

  const count = (u: Matrix, v: Matrix) => u[0] * u[1] * v[1];
  const cache = new Array(n)
    .fill(undefined)
    .map((_) => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) cache[i][i] = 0;
  const solve = () => {
    for (let gap = 1; gap < n; gap++) {
      for (let idx = 0; idx < n - gap; idx++) {
        for (let i = 0; i < gap; i++) {
          cache[idx][idx + gap] = Math.min(
            cache[idx][idx + gap],
            cache[idx][idx + i] +
              cache[idx + i + 1][idx + gap] +
              count(
                [matrix[idx][0], matrix[idx + i][1]],
                [matrix[idx + i + 1][0], matrix[idx + gap][1]]
              )
          );
        }
      }
    }
    return cache[0][n - 1];
  };
  console.log(solve().toString());
})();
