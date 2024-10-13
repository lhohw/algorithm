import { readFileSync } from "fs";

export const parseInput = (input: string) =>
  input.split("\n").map((row) => row.trim().split(" ").map(Number));

export const solve = (params: number[][]) => {
  const [[, l], ...trafficLights] = params;

  let waiting = 0;

  for (const [d, r, g] of trafficLights) {
    const time = d + waiting;
    const period = r + g;
    const past = time % period;

    if (past < r) {
      waiting += r - past;
    }
  }

  return waiting + l;
};

const print = () => {
  const input = readFileSync(0, "utf-8").toString().trim();
  const params = parseInput(input);
  const ret = solve(params);

  console.log(ret.toString());
};

print();
