// 11312: 삼각무늬 - 2
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number;
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else {
      const [ A, B ] = input.split(' ').map(Number);
      console.log(((A/B) ** 2).toString());
    }
  })
})();