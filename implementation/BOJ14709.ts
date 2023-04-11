// 14709: 여우 사인
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (n === undefined) setN(input);
  else merge(input);
};

const setN = (input: string) => {
  n = +input;
};

const merge = (input: string) => {
  const [u, v] = input.split(" ").map((e) => +e - 1);
  isConnected[u][v] = isConnected[v][u] = true;
};

const solve = () => {
  return (
    isConnected[0][2] &&
    isConnected[2][3] &&
    isConnected[0][3] &&
    isConnected[1].every((e) => e === false) &&
    isConnected[4].every((e) => e === false)
  );
};

const print = (isFox: boolean) => {
  if (isFox) console.log("Wa-pa-pa-pa-pa-pa-pow!");
  else console.log("Woof-meow-tweet-squeek");
};

let n: number;
const isConnected: boolean[][] = new Array(5)
  .fill(undefined)
  .map(() => new Array(5).fill(false));
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    const isFox = solve();
    print(isFox);
    process.exit();
  });
