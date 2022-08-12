// 6987: 월드컵
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  type MatchResult = [ number, number, number ];
  const WIN = 0, DRAW = 1, LOSE = 2;
  const n = 6;
  const matches: number[][] = [];
  let ret = '';
  for (let i=0; i<n; i++) {
    for (let j=i+1; j<n; j++) {
      matches.push([ i, j ]);
    }
  }
  const refineResult = (result: string) => {
    const r = new Array(n).fill(undefined).map(_ => new Array(3).fill(0) as MatchResult);
    result.split(' ').forEach((res, idx) => {
      r[Math.floor(idx / 3)][idx % 3] = +res;
    });
    return r;
  }
  const match = (idx: number, result: MatchResult[]): boolean => {
    if (idx == matches.length) {
      const sum = result.reduce((sum, matchResult) => sum + matchResult.reduce((x, y) => x+y), 0);
      return sum == 0;
    }
    let flag = false;
    const [ team, opponent ] = matches[idx];
    if (result[team][WIN] && result[opponent][LOSE]) {
      result[team][WIN]--;
      result[opponent][LOSE]--;
      flag ||= match(idx+1, result);
      result[team][WIN]++;
      result[opponent][LOSE]++;
    }
    if (result[team][DRAW] && result[opponent][DRAW]) {
      result[team][DRAW]--;
      result[opponent][DRAW]--;
      flag ||= match(idx+1, result);
      result[team][DRAW]++;
      result[opponent][DRAW]++;
    }
    if (result[team][LOSE] && result[opponent][WIN]) {
      result[team][LOSE]--;
      result[opponent][WIN]--;
      flag ||= match(idx+1, result);
      result[team][LOSE]++;
      result[opponent][WIN]++;
    }
    return flag;
  }
  rl.on('line', (input: string) => {
    const flag = match(0, refineResult(input));
    ret += (flag ? 1 : 0) + ' ';
  }).on('close', () => {
    console.log(ret.trimEnd());
    process.exit();
  });
})();