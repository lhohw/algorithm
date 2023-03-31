// 13576: Prefix와 Suffix
import { readFileSync } from "fs";

class SuffixArray {
  private perm: number[];
  private group: number[];
  private len: number;
  private t = 1;
  constructor(private S: string, private n: number) {
    const A = "A".charCodeAt(0);
    this.perm = new Array(n).fill(undefined).map((_, i) => i);
    this.group = S.split("")
      .map((ch) => ch.charCodeAt(0) - A + 1)
      .concat(0);
    this.len = Math.max(26, n) + 1;
  }
  public getSuffixArray() {
    const { n, perm } = this;
    while (this.t < n) {
      this.stableCountingSort();
      const newGroup = new Array(n + 1).fill(0);
      newGroup[perm[0]] = 1;
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
  private stableCountingSort() {
    const { n, len, perm, group, t } = this;
    const cnt = new Array(len).fill(0);
    const idx = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) cnt[group[Math.min(i + t, n)]]++;
    for (let i = 1; i < len; i++) cnt[i] += cnt[i - 1];
    for (let i = n - 1; ~i; i--) idx[--cnt[group[Math.min(i + t, n)]]] = i;

    for (let i = 0; i < len; i++) cnt[i] = 0;

    for (let i = 0; i < n; i++) cnt[group[i]]++;
    for (let i = 1; i < len; i++) cnt[i] += cnt[i - 1];
    for (let i = n - 1; ~i; i--) perm[--cnt[group[idx[i]]]] = idx[i];
  }
  private compare(a: number, b: number) {
    const { t, group, n } = this;
    if (group[a] !== group[b]) return group[a] < group[b];
    return group[Math.min(a + t, n)] < group[Math.min(b + t, n)];
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
  const permIdx = group[idx] - 1;
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
