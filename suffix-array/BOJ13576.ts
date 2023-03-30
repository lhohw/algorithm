// 13576: Prefix와 Suffix
import { readFileSync } from "fs";

class SuffixArray {
  private perm: number[];
  private group: number[];
  private tmpArray: number[];
  private t = 1;
  constructor(private S: string, private n: number) {
    this.perm = new Array(n).fill(undefined).map((_, i) => i);
    this.group = S.split("")
      .map((ch) => ch.charCodeAt(0))
      .concat(-1);
    this.tmpArray = [...this.perm];
  }
  public getSuffixArray() {
    const { n, perm } = this;
    while (this.t < n) {
      this.mergeSort();
      const newGroup = new Array(n + 1).fill(-1);
      newGroup[perm[0]] = 0;
      for (let i = 1; i < n; i++) {
        newGroup[perm[i]] =
          newGroup[perm[i - 1]] + this.compare(perm[i - 1], perm[i]);
      }
      this.group = newGroup;
      this.t *= 2;
    }
    return {
      perm,
      group: this.group,
    };
  }
  private mergeSort() {
    this._mergeSort(0, this.n);
  }
  private _mergeSort(left: number, right: number) {
    const { perm, tmpArray } = this;
    if (left + 1 === right) return;

    const mid = Math.floor((left + right) / 2);

    this._mergeSort(left, mid);
    this._mergeSort(mid, right);

    let l = left,
      r = mid,
      k = left;
    while (l < mid && r < right) {
      if (this.compare(perm[l], perm[r])) tmpArray[k++] = perm[l++];
      else tmpArray[k++] = perm[r++];
    }
    while (l < mid) tmpArray[k++] = perm[l++];
    while (r < right) tmpArray[k++] = perm[r++];

    for (let i = left; i < right; i++) {
      perm[i] = tmpArray[i];
    }
  }
  private compare(a: number, b: number) {
    const { t, group } = this;
    if (group[a] !== group[b]) return group[a] < group[b];
    return group[a + t] < group[b + t];
  }
}

const print = () => console.log(solve());

const solve = () => {
  const sa = new SuffixArray(S, n);
  const { perm, group } = sa.getSuffixArray();
  const pi = getPartialMatch(S, n);
  const lcp = kasai(S, n, group, perm);

  const ret = getSuffixAndPrefix(n, group, pi, lcp);
  return ret;
};

const getPartialMatch = (S: string, n: number) => {
  const pi = new Array(n).fill(0);
  let begin = 1;
  let matched = 0;
  while (begin + matched < n) {
    if (S[begin + matched] === S[matched]) {
      matched++;
      pi[begin + matched - 1] = matched;
    } else {
      if (matched === 0) begin++;
      else {
        begin += matched - pi[matched - 1];
        matched = pi[matched - 1];
      }
    }
  }
  return pi;
};

const kasai = (S: string, n: number, group: number[], perm: number[]) => {
  const lcp = new Array(n).fill(0);
  if (n === 1) return lcp;

  let len = 0;
  for (let groupIdx = 0; groupIdx < n; groupIdx++) {
    const permIdx = group[groupIdx];
    if (permIdx === 0) continue;
    const prevPermIdx = permIdx - 1;
    const suffixIdx = perm[permIdx];
    const prevSuffixIdx = perm[prevPermIdx];
    while (S[suffixIdx + len] === S[prevSuffixIdx + len]) len++;
    lcp[permIdx] = len;
    if (len) len--;
  }
  return lcp;
};

const getSuffixAndPrefix = (
  n: number,
  group: number[],
  pi: number[],
  lcp: number[]
) => {
  let ret = `${n} 1`;
  let len = pi[n - 1];
  let totalCount = 1;
  const dp = new Array(n).fill(1);
  while (len) {
    ret = `${len} ${countSubstring(n, group, len, lcp, dp)}\n${ret}`;
    len = pi[len - 1];
    totalCount++;
  }
  return `${totalCount}\n${ret}`;
};

const countSubstring = (
  n: number,
  group: number[],
  len: number,
  lcp: number[],
  dp: number[]
) => {
  let ret = 1;
  const idx = n - len;
  const permIdx = group[idx];
  for (let i = permIdx + 1; i < n; i++) {
    if (lcp[i] >= len) {
      const precalc = dp[i];
      ret += precalc;
      i += precalc - 1;
    } else break;
  }
  return (dp[permIdx] = ret);
};

const S = readFileSync("/dev/stdin").toString().trim();
const n = S.length;

print();
