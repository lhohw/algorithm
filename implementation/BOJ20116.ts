// 21756: 지우개
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();
console.log((1 << Math.floor(Math.log2(n))).toString());
