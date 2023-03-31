// 1605: 반복 부분문자열
import { readFileSync } from "fs";

const [n, S] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? +row : row)) as [number, string];

class SuffixArray {
  private group: number[];
  private perm: number[];
  private len: number;
  private t = 1;
  constructor(private n: number, private S: string) {
    const a = "a".charCodeAt(0);
    this.group = S.split("")
      .map((ch) => ch.charCodeAt(0) - a + 1)
      .concat(0);
    this.len = Math.max(26, n) + 1;
    this.perm = new Array(n).fill(undefined).map((_, i) => i);
  }
  public getSuffixArray() {
    const { n, perm } = this;
    while (this.t < n) {
      this.stableCountingSort();
      const newGroup = new Array(n + 1).fill(0);
      newGroup[perm[0]] = 1;
      for (let i = 1; i < n; i++)
        newGroup[perm[i]] =
          newGroup[perm[i - 1]] + this.compare(perm[i - 1], perm[i]);
      this.group = newGroup;
      if (this.group[perm[n - 1]] == n) break;
      this.t *= 2;
    }
    return { group: this.group, perm };
  }
  private stableCountingSort() {
    const { n, len, perm, group, t } = this;

    const cnt = new Array(len).fill(0);
    const idx = new Array(n).fill(0);
    for (let i = 0; i < n; i++) cnt[group[Math.min(i + t, n)]]++;
    for (let i = 1; i < len; i++) cnt[i] += cnt[i - 1];
    for (let i = n - 1; ~i; i--) idx[--cnt[group[Math.min(i + t, n)]]] = i;

    for (let i = 0; i < len; i++) cnt[i] = 0;
    for (let i = 0; i < n; i++) cnt[group[i]]++;
    for (let i = 1; i < len; i++) cnt[i] += cnt[i - 1];
    for (let i = n - 1; ~i; i--) perm[--cnt[group[idx[i]]]] = idx[i];
  }
  private compare(a: number, b: number) {
    const { n, group, t } = this;
    if (group[a] !== group[b]) return group[a] < group[b];
    return group[Math.min(a + t, n)] < group[Math.min(b + t, n)];
  }
}

const kasai = (n: number, S: string, group: number[], perm: number[]) => {
  let len = 0;
  let ret = 0;
  for (let groupIdx = 0; groupIdx < n; groupIdx++) {
    const permIdx = group[groupIdx] - 1;
    if (permIdx === 0) continue;

    const prevPermIdx = permIdx - 1;

    const suffixIdx = perm[permIdx];
    const prevSuffixIdx = perm[prevPermIdx];

    while (S[suffixIdx + len] === S[prevSuffixIdx + len]) len++;
    ret = Math.max(ret, len);
    if (len) len--;
  }
  return ret;
};

const solve = () => {
  const { group, perm } = new SuffixArray(n, S).getSuffixArray();
  const ret = kasai(n, S, group, perm);
  return ret;
};

const print = () => console.log(solve().toString());

print();
