// 2210: 숫자판 점프
(function () {
  const board = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line: string) => line.split(" "));
  const dy = [-1, 0, 1, 0];
  const dx = [0, 1, 0, -1];
  const set = new Set<string>();
  const makeNum = (str: string, y: number, x: number) => {
    if (str.length === 6) {
      set.add(str);
      return;
    }
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (ny < 0 || ny >= 5 || nx < 0 || nx >= 5) continue;
      const digit = board[ny][nx];
      makeNum(str + digit, ny, nx);
    }
  };
  const solve = () => {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        makeNum(board[y][x], y, x);
      }
    }
  };
  solve();
  console.log(set.size.toString());
})();
