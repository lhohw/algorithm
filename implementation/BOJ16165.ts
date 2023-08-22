// 16165: 걸그룹 마스터 준석이
import { readFileSync } from "fs";

const stdin = readFileSync("/dev/stdin").toString().trim().split("\n");
const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const print = () => console.log(solve());

const solve = () => {
  const [n, m] = input().split(" ").map(Number);
  const { groups, members } = init(n);
  return quiz(m, groups, members);
};

const init = (n: number) => {
  const groups = new Map<string, string[]>();
  const members = new Map<string, string>();
  for (let i = 0; i < n; i++) {
    const groupName = input();
    const group: string[] = [];
    groups.set(groupName, group);
    const count = +input();
    for (let j = 0; j < count; j++) {
      const name = input();
      group.push(name);
      members.set(name, groupName);
    }
  }
  return { groups, members };
};

const quiz = (
  m: number,
  groups: Map<string, string[]>,
  members: Map<string, string>
) => {
  let ret = "";
  for (let i = 0; i < m; i++) {
    const name = input();
    const flag = +input();
    if (flag === 1) ret += `${members.get(name)!}\n`;
    else ret += `${groups.get(name)?.sort().join("\n")}\n`;
  }
  return ret.trimEnd();
};

print();
