// 9935: 문자열 폭발
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let str: string, explode: string;
  rl.on('line', (input: string) => {
    if (str === undefined) str = input;
    else explode = input;
  }).on('close', () => {
    const matched = new Array(str.length).fill(0);
    const stack = [];
    let next = 0;
    for (let i=0; i<str.length; i++) {
      const ch = str[i];
      if (ch == explode[next]) next++;
      else if (ch == explode[0]) next = 1;
      else next = 0;
      matched[i] = next;
      stack.push(i);
      if (next == explode.length) {
        for (let i=0; i<next; i++) stack.pop();
        if (stack.length) next = matched[stack[stack.length-1]];
        else next = 0;
      }
    }
    if (!stack.length) console.log('FRULA');
    else console.log(stack.map(idx => str[idx]).join(''));
    process.exit();
  });
})();