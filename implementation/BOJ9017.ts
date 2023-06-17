// 9017: 크로스 컨트리
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else if (n === undefined) {
    setN(input);
  } else {
    setGrade(input);
    ret += solve() + "\n";
    n = undefined!;
    data = undefined!;
  }
};

const setT = (input: string) => (t = +input);
const setN = (input: string) => (n = +input);
const setGrade = (input: string) => (data = input.split(" ").map(Number));

type Team = {
  memberCount: number;
  score: number;
  fifth: number;
  calculated: number;
};
type Teams = Record<number, Team>;
const solve = () => {
  const teams: Teams = {};
  init(teams);
  calculateScore(teams);
  return getWinner(teams);
};

const init = (teams: Teams) => {
  for (let idx = 0; idx < n; idx++) {
    const teamNumber = data[idx];
    if (!teams[teamNumber]) {
      teams[teamNumber] = {
        memberCount: 0,
        score: 0,
        fifth: Infinity,
        calculated: 0,
      };
    }
    teams[teamNumber].memberCount++;
    if (teams[teamNumber].memberCount === 5) teams[teamNumber].fifth = idx;
  }
};

const calculateScore = (teams: Teams) => {
  let grade = 1;
  for (let idx = 0; idx < n; idx++) {
    const teamNumber = data[idx];
    const team = teams[teamNumber];
    if (team.memberCount < 6) continue;
    if (team.calculated !== 4) {
      team.score += grade;
      team.calculated++;
    }
    grade++;
  }
};

const getWinner = (teams: Teams) => {
  let winner = 0;
  let winnerScore = Infinity;
  for (const [teamNumber, value] of Object.entries(teams)) {
    const { memberCount, score, fifth } = value;
    if (memberCount < 6) continue;
    if (
      winnerScore > score ||
      (winnerScore === score && teams[winner].fifth > fifth)
    ) {
      winner = +teamNumber;
      winnerScore = score;
    }
  }
  return winner;
};

const print = () => console.log(ret.trimEnd());

let t: number;
let n: number;
let data: number[];
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
