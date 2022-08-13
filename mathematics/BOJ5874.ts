// 5874: 소를 찾아라
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('line', (copse: string) => {
    const front = [];
    const rear = [];
    for (let i=0; i<copse.length-1; i++) {
      if (copse[i] == ')' && copse[i+1] == ')') front.push(i);
      else if (copse[i] == '(' && copse[i+1] == '(') rear.push(i);
    }
    let ret = 0;
    let frontIdx = 0, rearIdx = 0;
    while (rearIdx != rear.length) {
      while (front[frontIdx] < rear[rearIdx]) frontIdx++;
      ret += front.length - frontIdx;
      rearIdx++;
    }
    console.log(ret.toString());
    rl.close();
  });
})();