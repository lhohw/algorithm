// 13264: 접미사 배열 2
import { readFileSync } from "fs";

class SuffixArray {
  private n: number;
  private t: number;
  private group: number[];
  private perm: number[];
  private sortedArray: number[];
  constructor(private S: string) {
    this.n = S.length;
    this.t = 1;
    this.group = S.split("").map((e) => e.charCodeAt(0));
    this.group[this.n] = -1;
    this.perm = new Array(this.n).fill(undefined).map((_, i) => i);
    this.sortedArray = [...this.perm];
  }
  compare(a: number, b: number) {
    const { group, t } = this;
    if (group[a] !== group[b]) return group[a] > group[b];
    return group[a + t] > group[b + t];
  }
  _mergeSort(l: number, r: number) {
    const { sortedArray, perm } = this;
    if (l + 1 === r) return;
    const mid = Math.floor((l + r) / 2);
    this._mergeSort(l, mid);
    this._mergeSort(mid, r);
    let lIdx = l,
      rIdx = mid;
    let idx = l;
    while (lIdx < mid && rIdx < r) {
      if (this.compare(perm[lIdx], perm[rIdx]))
        sortedArray[idx++] = perm[rIdx++];
      else sortedArray[idx++] = perm[lIdx++];
    }
    while (lIdx < mid) sortedArray[idx++] = perm[lIdx++];
    while (rIdx < r) sortedArray[idx++] = perm[rIdx++];

    for (let i = l; i < r; i++) perm[i] = sortedArray[i];
  }
  mergeSort() {
    const { n } = this;
    this._mergeSort(0, n);
  }
  getSuffixArray() {
    const { n, perm } = this;
    while (this.t < n) {
      this.mergeSort();
      const newGroup = new Array(n + 1).fill(-1);
      newGroup[perm[0]] = 0;
      for (let i = 1; i < n; i++) {
        newGroup[perm[i]] =
          newGroup[perm[i - 1]] + this.compare(perm[i], perm[i - 1]);
      }
      this.t *= 2;
      this.group = newGroup;
      if (this.group[perm[n - 1]] === n) break;
    }
  }
  solve() {
    this.getSuffixArray();
    return this.perm.join("\n");
  }
}
const S = readFileSync("/dev/stdin").toString().trim();
const suffixArray = new SuffixArray(S);
console.log(suffixArray.solve());
