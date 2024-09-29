import { readFileSync } from "fs";

export const parseInput = (input: string) => input.split("\n");

const dy = [1, 0, -1, 0];
const dx = [0, 1, 0, -1];
const MOVE_COMMANDS = ["W", "D", "S", "A"] as const;
const CAMERA_COMMANDS = ["MR", "ML"] as const;

export type MoveCommand = (typeof MOVE_COMMANDS)[number];
export type CameraCommand = (typeof CAMERA_COMMANDS)[number];
export type Command = MoveCommand | CameraCommand;
export class Player {
  private records = "";
  private pos = [0, 0];
  private dir = 0;

  constructor(private n: number, private commands: Command[]) {}

  play() {
    const { n, commands } = this;

    for (let i = 0; i < n; i++) {
      const cmd = commands[i];
      this.command(cmd);
      this.record();
    }
  }

  getRecords() {
    return this.records.trim();
  }

  command(cmd: Command) {
    if (this.isMoveCommand(cmd)) {
      this.handleMove(cmd);
    } else {
      this.handleCamera(cmd);
    }
  }

  private isMoveCommand(cmd: Command): cmd is MoveCommand {
    return MOVE_COMMANDS.includes(cmd as MoveCommand);
  }

  private handleMove(cmd: MoveCommand) {
    const { pos, dir } = this;
    const [y, x] = pos;
    const d = (dir + MOVE_COMMANDS.indexOf(cmd)) % 4;
    const ny = y + dy[d];
    const nx = x + dx[d];

    this.pos = [ny, nx];
  }

  private handleCamera(cmd: CameraCommand) {
    const { dir } = this;

    switch (cmd) {
      case "MR": {
        this.dir = (dir + 1) % 4;
        break;
      }
      case "ML": {
        this.dir = (dir + 3) % 4;
        break;
      }
    }
  }

  private record() {
    this.records += this.getPos() + "\n";
  }

  private getPos() {
    const { pos, dir } = this;
    const [y, x] = pos;
    const cy = y - dy[dir];
    const cx = x - dx[dir];

    return `${x} ${y} ${cx} ${cy}`;
  }
}

export const solve = (commands: string[]) => {
  const n = +commands.shift()!;
  const player = new Player(n, commands as Command[]);

  player.play();
  const ret = player.getRecords();
  return ret;
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const parsed = parseInput(input);
  const ret = solve(parsed);

  console.log(ret);
};

print();
