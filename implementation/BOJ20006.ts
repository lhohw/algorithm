// 20006: 랭킹전 대기열
import { createInterface } from "readline";

class Room {
  private players: Player[] = [];
  private state: "Started!" | "Waiting!" = "Waiting!";
  constructor(private id: number, private rating: number) {}
  canEnter(player: Player) {
    const { state, rating } = this;
    if (state === "Started!") return false;
    return rating - 10 <= player.rating && player.rating <= rating + 10;
  }
  enter(player: Player) {
    this.players.push(player);
    if (this.players.length === m) this.state = "Started!";
  }
  getInfo() {
    const { state, players } = this;
    return `${state}\n${players
      .sort((a, b) => (a.nickname > b.nickname ? 1 : -1))
      .map(({ rating, nickname }) => `${rating} ${nickname}`)
      .join("\n")}`;
  }
}
type Player = {
  rating: number;
  nickname: string;
};
const handleInput = (input: string) => {
  if (p === undefined || m === undefined) {
    init(input);
  } else {
    enter(input);
  }
};

const init = (input: string) => {
  [p, m] = input.split(" ").map(Number);
};
const enter = (input: string) => {
  const [rating, nickname] = input.split(" ");
  const player: Player = { rating: +rating, nickname };

  let room = match(player);
  if (!room) {
    room = new Room(id++, player.rating);
    rooms.push(room);
  }
  room.enter(player);
};

const match = (player: Player) => {
  for (const room of rooms) {
    if (room.canEnter(player)) return room;
  }
  return null;
};

const print = () => console.log(rooms.map((room) => room.getInfo()).join("\n"));

let p: number, m: number;
let id = 0;
const rooms: Room[] = [];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
