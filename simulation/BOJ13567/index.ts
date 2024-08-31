import { readFileSync } from "fs";

export type Command = [string, number];
export const dy = [-1, 0, 1, 0];
export const dx = [0, 1, 0, -1];
export class Robot {
  private dir = 1;
  private pos = [0, 0];

  constructor(private M: number) {}

  getCoord() {
    return this.pos;
  }

  getDirection() {
    return this.dir;
  }

  command(input: Command) {
    const [cmd, amount] = input;
    switch (cmd) {
      case "MOVE": {
        this.move(amount);
        return;
      }
      case "TURN": {
        this.turn(amount);
        return;
      }
    }
  }

  move(amount: number) {
    const { dir, pos } = this;

    const nx = pos[0] + dx[dir] * amount;
    const ny = pos[1] + dy[dir] * amount;

    this.pos = [nx, ny];
  }

  turn(value: number) {
    if (value === 0) this.dir = (this.dir + 1) % 4;
    else this.dir = (this.dir + 3) % 4;
  }

  isOut() {
    const { M, pos } = this;
    const [x, y] = pos;

    return y < 0 || y >= M || x < 0 || x >= M;
  }
}

export const parseInput = (input: string) => {
  const commands = input
    .split("\n")
    .map((row, i) =>
      row.split(" ").map((e, j) => (i === 0 || j === 1 ? +e : e))
    );
  const [M, n] = commands.shift()! as [number, number];
  return { M, n, commands: commands as Command[] };
};

export const solve = (M: number, n: number, commands: Command[]) => {
  const robot = new Robot(M);
  for (const command of commands) {
    robot.command(command);
    const isOut = robot.isOut();
    if (isOut) return [-1];
  }

  return robot.getCoord();
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const { M, n, commands } = parseInput(input);
  const ret = solve(M, n, commands);

  console.log(ret.join(" "));
};

print();
