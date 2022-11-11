// 10159: 저울
import { createInterface } from "readline";

let n: number, m: number;
let board: number[][];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined) {
      n = +input;
      board = new Array(n).fill(undefined).map(() => new Array(n).fill(0));
    } else if (m === undefined) m = +input;
    else {
      const [l, s] = input.split(" ").map((e) => +e - 1);
      board[l][s] = 1;
      board[s][l] = -1;
    }
  })
  .on("close", () => {
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        if (i === k) continue;
        for (let j = 0; j < n; j++) {
          if (board[i][j]) continue;
          if (board[i][k] * board[k][j] === 1) {
            board[i][j] = board[i][k];
          }
        }
      }
    }
    console.log(
      board.map((row) => row.filter((e) => e === 0).length - 1).join("\n")
    );
    process.exit();
  });
