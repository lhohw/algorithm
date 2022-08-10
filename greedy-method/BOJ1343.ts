// 1343: 폴리오미노
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const replace = (board: string, mark: string) => {
    let regex = '';
    for (let i=0; i<mark.length; i++) regex += 'X';
    return board.replace(new RegExp(`${regex}`, 'g'), (str: string) => mark);
  }
  const polyomino = (board: string) => {
    let ret;
    board = replace(board, 'AAAA');
    board = replace(board, 'BB');
    if (board.indexOf('X') != -1) ret = '-1';
    else ret = board;
    return ret;
  }
  rl.on('line', (board: string) => {
    const ret = polyomino(board);
    console.log(ret);
    rl.close();
  });
})();