// 16975: 수열과 쿼리 21
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  class LazyPropagation {
    constructor(
      private A: number[],
      private n: number = 0,
      private rangeSum: number[] = [],
      private lazy: number[] = [],
      private ret: string = ''
    ) {
      this.n = A.length;
      const len = (1 << (Math.ceil(Math.log2(this.n)) + 1));
      this.rangeSum = new Array(len).fill(0);
      this.lazy = new Array(len).fill(0);
      this.init(0, this.n-1, 1);
    }
    init(left: number, right: number, node: number): number {
      const { A, rangeSum } = this;
      if (left == right) return rangeSum[node] = A[left];
      const mid = Math.floor((left + right) / 2);
      return rangeSum[node] = this.init(left, mid, node*2) + this.init(mid+1, right, node*2 + 1);
    }
    _query(idx: number, node: number, nodeLeft: number, nodeRight: number): number {
      const { rangeSum } = this;
      this.update_lazy(node, nodeLeft, nodeRight);
      if (idx < nodeLeft || nodeRight < idx) return 0;
      if (idx <= nodeLeft && nodeRight <= idx) return rangeSum[node];
      const nodeMid = Math.floor((nodeLeft + nodeRight) / 2);
      return this._query(idx, node*2, nodeLeft, nodeMid) +
        this._query(idx, node*2 + 1, nodeMid+1, nodeRight);
    }
    query(idx: number) {
      return this._query(idx-1, 1, 0, this.n-1);
    }
    _update(left: number, right: number, value: number, node: number, nodeLeft: number, nodeRight: number): number {
      const { rangeSum, lazy } = this;
      this.update_lazy(node, nodeLeft, nodeRight);
      if (right < nodeLeft || nodeRight < left) return rangeSum[node];
      if (left <= nodeLeft && nodeRight <= right) {
        rangeSum[node] += value * (nodeRight - nodeLeft + 1);
        if (nodeLeft != nodeRight) {
          lazy[node*2] += value;
          lazy[node*2+1] += value;
        }
        return rangeSum[node];
      }
      const nodeMid = Math.floor((nodeLeft + nodeRight) / 2);
      return rangeSum[node] = this._update(left, right, value, node*2, nodeLeft, nodeMid) +
        this._update(left, right, value, node*2+1, nodeMid+1, nodeRight);
    }
    update(args: number[]) {
      const [ left, right, value ] = args;
      return this._update(left-1, right-1, value, 1, 0, this.n-1);
    }
    update_lazy(node: number, nodeLeft: number, nodeRight: number) {
      const { rangeSum, lazy } = this;
      if (lazy[node]) {
        rangeSum[node] += lazy[node] * (nodeRight - nodeLeft + 1);
        if (nodeLeft != nodeRight) {
          lazy[node*2] += lazy[node];
          lazy[node*2 + 1] += lazy[node];
        }
        lazy[node] = 0;
      }
    }
    solve(input: string) {
      const [ flag, ...args ] = input.split(' ').map(Number);
      if (flag == 1) this.update(args);
      else this.ret += this.query(args[0]) + '\n';
    }
    print() {
      console.log(this.ret.trimEnd());
    }
  }
  let n: number;
  let A: number[];
  let m: number;
  let lp: LazyPropagation;
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else if (A === undefined) {
      A = input.split(' ').map(Number);
      lp = new LazyPropagation(A);
    }
    else if (m === undefined) m = +input;
    else lp.solve(input);
  }).on('close', () => {
    lp.print();
    process.exit();
  });
})();