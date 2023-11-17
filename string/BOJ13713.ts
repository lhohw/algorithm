// 13713: 문자열과 쿼리
import { readFileSync } from "fs";

class Z {
  private n: number;
  private z: number[];
  private l = 0;
  private r = 0;
  constructor(private S: string) {
    this.S = S.split("").reverse().join("");
    this.n = this.S.length;
    this.z = new Array(this.n).fill(0);
    this.z[0] = this.n;
    this.initialize();
    this.query = this.query.bind(this);
  }
  query(query: string) {
    const { z, n } = this;
    const idx = n - +query;
    return z[idx];
  }
  private initialize() {
    const { n } = this;
    for (let i = 1; i < n; i++) {
      this.setInitialZ(i);
      this.extendZ(i);
      if (this.isExtended(i)) {
        this.setRange(i);
      }
    }
  }
  private setInitialZ(idx: number) {
    const { z, l, r } = this;
    if (this.isUsed(idx)) {
      z[idx] = Math.min(z[idx - l], r - idx);
    }
  }
  private isUsed(idx: number) {
    const { r } = this;
    return idx < r;
  }
  private extendZ(idx: number) {
    const { z } = this;
    while (this.isInSafeRange(idx) && this.canExtend(idx)) {
      z[idx]++;
    }
  }
  private isInSafeRange(idx: number) {
    const { z, n } = this;
    return idx + z[idx] < n;
  }
  private canExtend(idx: number) {
    const { S, z } = this;
    return S[idx + z[idx]] === S[z[idx]];
  }
  private isExtended(idx: number) {
    const { z, r } = this;
    return idx + z[idx] >= r;
  }
  private setRange(idx: number) {
    const { z } = this;
    this.l = idx;
    this.r = idx + z[idx];
  }
}
const [S, , ...queries] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const print = () => console.log(solve());

const solve = () => {
  const z = new Z(S);
  return queries.map(z.query).join("\n");
};

print();
