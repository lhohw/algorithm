// 17404: RGB 거리 2
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n: number;
let dp: number[][][];
let i = 0;
let ret = Infinity;
rl.on("line", (input) => {
  if (n === undefined) {
    n = +input;
    dp = new Array(n)
      .fill(undefined)
      .map(() =>
        new Array(3).fill(undefined).map(() => new Array(3).fill(Infinity))
      );
  } else {
    if (i === 0) {
      const colors = input.split(" ").map(Number);
      for (let color = 0; color < 3; color++) {
        dp[0][color][color] = colors[color];
      }
    } else if (i === n - 1) {
      const colors = input.split(" ").map(Number);
      dp[i - 1].forEach((prev, start_color) => {
        prev.forEach((p, prev_color) => {
          for (let color = 0; color < 3; color++) {
            if (color === start_color || color === prev_color) continue;
            const cand = colors[color] + p;
            dp[i][start_color][color] = cand;
            ret = Math.min(ret, cand);
          }
        });
      });
      console.log(ret.toString());
      rl.close();
    } else {
      const [r, g, b] = input.split(" ").map(Number);
      dp[i - 1].forEach((prev, start_color) => {
        const [prev_r, prev_g, prev_b] = prev;
        dp[i][start_color][0] = Math.min(prev_g, prev_b) + r;
        dp[i][start_color][1] = Math.min(prev_r, prev_b) + g;
        dp[i][start_color][2] = Math.min(prev_r, prev_g) + b;
      });
    }
    i++;
  }
});
