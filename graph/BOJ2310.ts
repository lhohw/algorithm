// 2310: 어드벤처 게임
import { createInterface } from "readline";

type Room = {
  flag: "E" | "L" | "T";
  cost: number;
  adj: number[];
};
const handleInput = (input: string) => {
  if (n === undefined) {
    init(input);
  } else {
    i++;
    setRoom(input);
    if (i === n) {
      ret += (canArrive(0, 0) ? "Yes" : "No") + "\n";
      n = undefined!;
      i = 0;
    }
  }
};
const init = (input: string) => {
  n = +input;
  maze = new Array(n + 1).fill(undefined);
  maze[0] = { flag: "E", cost: 0, adj: [1] };
  cache = new Array(n + 1)
    .fill(undefined)
    .map(() => new Array(501).fill(undefined));
};
const setRoom = (input: string) => {
  const [flag, cost, ...adj] = input
    .split(" ")
    .map((e, i) => (i === 0 ? e : +e)) as [Room["flag"], ...number[]];
  adj.pop();
  maze[i] = { flag, cost, adj };
};
const canArrive = (here: number, money: number): boolean => {
  if (here === n) return true;

  let ret = cache[here][money];
  if (ret !== undefined) return ret;
  ret = cache[here][money] = false;

  for (const there of maze[here].adj) {
    ret = ret || enter(there, money);
  }
  return (cache[here][money] = ret);
};

const enter = (there: number, money: number) => {
  const { flag, cost } = maze[there];
  if (flag === "E") return canArrive(there, money);
  if (flag === "L") return canArrive(there, Math.max(money, cost));
  if (money < cost) return false;
  return canArrive(there, money - cost);
};

const print = () => console.log(ret.trimEnd());

let n: number,
  i = 0;
let maze: Room[];
let cache: boolean[][];
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
