// 1605: 반복 부분문자열
(function() {
  class SuffixArray {
    constructor(private n: number, private s: string) {}
    getSuffixArray() {
      const { n, s } = this;
      const m = Math.max(256, n) + 1;
      const perm = new Array(n).fill(0);
      let group = new Array(n+n).fill(0);
      const cnt = new Array(m).fill(0);
      const idx = new Array(n).fill(0);
  
      const comparator = (t: number, a: number, b: number) => {
        if (group[a] != group[b]) return group[a] > group[b];
        return group[a+t] > group[b+t];
      }
      for (let i=0; i<n; i++) {
        perm[i] = i;
        group[i] = s.charCodeAt(i);
      }
      for (let t=1; t<n; t<<=1) {
        for (let i=0; i<m; i++) cnt[i] = 0;
        for (let i=0; i<n; i++) cnt[group[i+t]]++;
        for (let i=1; i<m; i++) cnt[i] += cnt[i-1];
        for (let i=n-1; ~i; i--) idx[--cnt[group[i+t]]] = i;
  
        for (let i=0; i<m; i++) cnt[i] = 0;
        for (let i=0; i<n; i++) cnt[group[i]]++;
        for (let i=1; i<m; i++) cnt[i] += cnt[i-1];
        for (let i=n-1; ~i; i--) perm[--cnt[group[idx[i]]]] = idx[i];
  
        const newGroup = new Array(n+n).fill(0);
        newGroup[perm[0]] = 1;
        for (let i=1; i<n; i++) newGroup[perm[i]] = newGroup[perm[i-1]] + (+comparator(t, perm[i], perm[i-1]));
        group = newGroup;
        if (group[perm[n-1]] == n) break;
      }
      return { group, perm };
    }
    getLcp() {
      const { n, s } = this;
      const { group, perm } = this.getSuffixArray();
      const lcp = new Array(n).fill(0);
      for (let k=0, i=0; i<n; i++) {
        if (group[i]) {
          for (let j=perm[group[i]-2]; s[i+k] == s[j+k]; k++);
          lcp[group[i]] = (k ? k-- : 0);
        }
      }
      return Math.max(...lcp);
    }
    solve() {
      console.log(this.getLcp().toString());
    }
  }
  let n: number;
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else new SuffixArray(n, input).solve();
  });
})();