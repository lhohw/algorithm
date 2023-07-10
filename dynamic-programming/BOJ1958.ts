// 1958: LCS 3
import { readFileSync } from "fs";

const [str1, str2, str3] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((e) => `.${e}`);

const print = () => console.log(solve().toString());

const solve = () => {
  const n = str1.length;
  const m = str2.length;
  const l = str3.length;
  const cache: number[][][] = new Array(n)
    .fill(undefined)
    .map(() => new Array(m).fill(undefined).map(() => new Array(l).fill(0)));
  for (let x = 1; x < n; x++) {
    for (let y = 1; y < m; y++) {
      for (let z = 1; z < l; z++) {
        if (isSame(x, y, z)) {
          cache[x][y][z] = cache[x - 1][y - 1][z - 1] + 1;
          continue;
        }
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
              cache[x][y][z] = Math.max(
                cache[x][y][z],
                cache[x - i][y - j][z - k]
              );
            }
          }
        }
      }
    }
  }
  return cache[n - 1][m - 1][l - 1];
};

const isSame = (x: number, y: number, z: number) =>
  str1[x] === str2[y] && str2[y] === str3[z] && str1[x] === str3[z];

print();
