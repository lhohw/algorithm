// 5525: IOIOI
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number, m: number;
  const countIOI = (s: string) => {
    let cnt = 0;
    let matched = 0;
    for (let i=0; i<s.length; i++) {
      if (matched % 2 == 0) {
        if (s[i] == 'I') {
          matched++;
          if (matched == (2*n + 1)) {
            cnt++;
            matched -= 2;
          }
        }
        else matched = 0;
      }
      else {
        if (s[i] == 'O') matched++;
        else matched = 1;
      }
    }
    return cnt;
  }
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else if (m === undefined) m = +input;
    else {
      const ret = countIOI(input);
      console.log(ret.toString());
      rl.close();
    }
  })
})();