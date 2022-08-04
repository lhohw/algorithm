// 14215: 세 막대
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('line', (input: string) => {
    const [ a, b, c ] = input.split(' ').map(Number).sort((a, b) => a-b);
    if (a+b > c) console.log((a+b+c).toString());
    else console.log(((a+b)*2 - 1).toString());
  });
})();