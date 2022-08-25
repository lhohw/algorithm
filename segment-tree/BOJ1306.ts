// 1306: 달려라 홍준
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number, m: number;
  let ads: number[];
  class RMQ {
    rangeMax: number[]
    constructor(private n: number, private m: number, private array: number[]) {
      this.rangeMax = new Array(1 << Math.ceil(Math.log2(this.n) + 1)).fill(0);
      this.init(1, 0, this.n-1);
    }
    init(node: number, nodeLeft: number, nodeRight: number): number {
      const { rangeMax, array } = this;
      if (nodeLeft == nodeRight) return rangeMax[node] = array[nodeLeft];
      const nodeMid = Math.floor((nodeLeft + nodeRight) / 2);
      return rangeMax[node] = Math.max(
        this.init(node*2, nodeLeft, nodeMid),
        this.init(node*2+1, nodeMid+1, nodeRight)
      );
    }
    _query(left: number, right: number, node: number, nodeLeft: number, nodeRight: number): number {
      const { rangeMax } = this;
      if (right < nodeLeft || nodeRight < left) return 0;
      if (left <= nodeLeft && nodeRight <= right) return rangeMax[node];
      const nodeMid = Math.floor((nodeLeft + nodeRight) / 2);
      return Math.max(
        this._query(left, right, node*2, nodeLeft, nodeMid),
        this._query(left, right, node*2+1, nodeMid+1, nodeRight)
      );
    }
    query(left: number, right: number) {
      return this._query(left, right, 1, 0, this.n-1);
    }
    solve() {
      let ret = '';
      const { n, m } = this;
      for (let i=m-1; i<=n-m; i++) {
        ret += this.query(i-(m-1), i+(m-1)) + ' ';
      }
      return ret.trimEnd();
    }
  }
  rl.on('line', (input: string) => {
    if (n === undefined && m === undefined) {
      [ n, m ] = input.split(' ').map(Number);
    }
    else ads = input.split(' ').map(Number);
  }).on('close', () => {
    const rmq = new RMQ(n, m, ads);
    const ret = rmq.solve();
    console.log(ret);
    process.exit();
  });
})();