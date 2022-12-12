// 7682: 틱택토
import { createInterface } from "readline";

class TicTacToe {
  private cache = new Set<string>();
  constructor() {
    this.init();
  }
  init() {
    const board = new Array(9).fill(undefined).map(() => ".");
    this.precalc(board, "X");
  }
  precalc(board: string[], turn: string) {
    const nextTurn = turn === "O" ? "X" : "O";
    const key = board.join("");
    if (this.cache.has(key)) return;
    if (this.isEnd(board, nextTurn)) {
      this.cache.add(key);
      return;
    }
    for (let i = 0; i < 9; i++) {
      if (board[i] === ".") {
        board[i] = turn;
        this.precalc(board, nextTurn);
        board[i] = ".";
      }
    }
  }
  isHorizontalEnd(board: string[], turn: string) {
    let flag = true;
    for (let i = 0; i < 9; i++) {
      if (board[i] !== turn) flag = false;
      if (i % 3 === 2) {
        if (flag) return flag;
        flag = true;
      }
    }
    return false;
  }
  isVerticalEnd(board: string[], turn: string) {
    for (let x = 0; x < 3; x++) {
      let flag = true;
      for (let y = 0; y < 3; y++) {
        if (board[y * 3 + x] !== turn) flag = false;
      }
      if (flag) return flag;
      flag = true;
    }
    return false;
  }
  isDiagonalEnd(board: string[], turn: string) {
    let leftUp = true,
      rightUp = true;
    for (let i = 0; i < 3; i++) {
      if (board[3 * i + i] !== turn) leftUp = false;
      if (board[3 * (3 - i - 1) + i] !== turn) rightUp = false;
    }
    return leftUp || rightUp;
  }
  isEnd(board: string[], turn: string) {
    return (
      this.isHorizontalEnd(board, turn) ||
      this.isVerticalEnd(board, turn) ||
      this.isDiagonalEnd(board, turn) ||
      board.indexOf(".") === -1
    );
  }
  solve(board: string) {
    const { cache } = this;
    if (cache.has(board)) return "valid";
    return "invalid";
  }
}
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
const tictactoe = new TicTacToe();
let ret = "";
rl.on("line", (input) => {
  if (input === "end") rl.close();
  else ret += tictactoe.solve(input) + "\n";
}).on("close", () => {
  console.log(ret.trimEnd());
  process.exit();
});
