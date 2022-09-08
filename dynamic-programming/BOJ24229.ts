// 24229: 모두싸인 출근길
(function () {
  type Board = [number, number];
  const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line: string) => line.split(" ").map(Number));

  const n = input.shift()[0];
  input.sort((a: Board, b: Board) => a[0] - b[0]);

  const board: Board[] = [];
  let limit = 0;
  let start = 0;
  for (let i = 0; i < n; i++) {
    const [s, e] = input[i];
    if (s <= limit) limit = Math.max(e, limit);
    else {
      board.push([start, limit]);
      start = s;
      limit = e;
    }
    if (i === n - 1) board.push([start, limit]);
  }

  const cache = new Array(n).fill(-1);
  const jump = (idx: number) => {
    let ret = cache[idx];
    if (ret !== -1) return ret;
    const [s, e] = board[idx];
    ret = e;
    const canJump = e - s;
    for (let next = idx + 1; next < board.length; next++) {
      if (board[next][0] <= e + canJump) {
        ret = Math.max(ret, jump(next));
      } else break;
    }
    return (cache[idx] = ret);
  };

  console.log(jump(0).toString());
})();
