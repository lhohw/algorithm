// @ts-nocheck
// 10931: SHA-384
import { readFileSync } from "fs";
import { createHash } from "crypto";

const str = readFileSync("/dev/stdin").toString().trim();
const hash = createHash("sha384");
const data = hash.update(str, "utf-8");
const gen_hash = data.digest("hex");
console.log(gen_hash);
