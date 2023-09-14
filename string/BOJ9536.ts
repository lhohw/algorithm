// 9536: 여우는 어떻게 울지?
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (t === undefined) setT(input);
  else if (map === undefined) init(input);
  else if (input !== question) filter(input);
  else record();
};

const setT = (input: string) => {
  t = +input;
};
const init = (input: string) => {
  const sound = input.split(" ");
  map = new Map<string, number[]>();
  for (let i = 0; i < sound.length; i++) {
    const howling = sound[i];
    map.set(howling, (map.get(howling) || []).concat(i));
  }
};
const filter = (input: string) => {
  const [, howling] = input.split(regex);
  if (map.has(howling)) map.delete(howling);
};
const record = () => {
  const array: [string, number][] = [];
  for (const [howling, indices] of Array.from(map)) {
    for (const idx of indices) {
      array.push([howling, idx]);
    }
  }
  array.sort((a, b) => a[1] - b[1]);
  ret += array.map((e) => e[0]).join(" ") + "\n";

  map = undefined!;
};

const print = () => console.log(ret.trimEnd());

let t: number;
let map: Map<string, number[]>;
const regex = /\sgoes\s/;
const question = "what does the fox say?";
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
