// 1158: 요세푸스 문제
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  class _Node {
    prev: _Node = null!;
    next: _Node = null!;
    constructor(public key: number) {}
  }
  rl.on('line', (input: string) => {
    const [ n, k ] = input.split(' ').map(Number);
    let head: _Node = null!;
    let here: _Node = null!;
    for (let i=1; i<=n; i++) {
      const node = new _Node(i);
      if (here) {
        node.prev = here;
        here.next = node;
      }
      else head = node;
      here = node;
    }
    here.next = head;
    head.prev = here;
    here = head;
  
    const ret: number[] = [];
    let cnt = n;
    while (cnt) {
      for (let i=0; i<(k-1) % cnt; i++) here = here.next;
      here.prev.next = here.next;
      here.next.prev = here.prev;
      cnt--;
      ret.push(here.key);
      here = here.next;
    }
    console.log(`<${ret.join(', ')}>`);
    rl.close();
  });
})();