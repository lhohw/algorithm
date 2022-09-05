// 12852: 1로 만들기 2
(function () {
  type _Node = {
    key: number;
    count: number;
    next?: _Node;
  };
  class Queue {
    private head: _Node = null!;
    private tail: _Node = null!;
    private size = 0;
    push(node: _Node) {
      if (this.size === 0) this.head = node;
      else this.tail.next = node;
      this.tail = node;
      this.size++;
    }
    shift() {
      const ret = this.head;
      this.size--;
      if (this.size === 0) {
        this.head = null!;
        this.tail = null!;
      } else this.head = this.head.next!;
      return ret;
    }
    length() {
      return this.size;
    }
  }
  const n = parseInt(
    require("fs").readFileSync("/dev/stdin").toString().trim()
  );
  const _parent = new Array(n + 1).fill(-1);

  const solve = () => {
    const queue = new Queue();
    queue.push({ key: n, count: 0 });
    while (queue.length()) {
      const { key, count } = queue.shift();
      if (key === 1) {
        const route: number[] = [];
        let here = key;
        while (here !== n) {
          route.push(here);
          here = _parent[here];
        }
        route.push(n);
        return { count, route };
      }
      if (key % 3 === 0 && _parent[key / 3] === -1) {
        queue.push({ key: key / 3, count: count + 1 });
        _parent[key / 3] = key;
      }
      if (key % 2 === 0 && _parent[key / 2] === -1) {
        queue.push({ key: key / 2, count: count + 1 });
        _parent[key / 2] = key;
      }
      if (_parent[key - 1] === -1) {
        queue.push({ key: key - 1, count: count + 1 });
        _parent[key - 1] = key;
      }
    }
    throw new Error("Invalid");
  };
  const { count, route } = solve();
  console.log(count + "\n" + route.reverse().join(" "));
})();
