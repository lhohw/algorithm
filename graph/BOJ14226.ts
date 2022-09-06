// 14226: 이모티콘
(function () {
  type _Node = {
    cnt: number;
    clipboard: number;
    time: number;
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
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const MAX = 1025;
  const makeEmoji = (n: number) => {
    const visited = new Array(MAX)
      .fill(undefined)
      .map((_) => new Array(MAX).fill(false));
    const queue = new Queue();
    queue.push({ cnt: 1, clipboard: 0, time: 0 });
    visited[1][0] = true;
    let ret = Infinity;
    while (queue.length()) {
      const { cnt, clipboard, time } = queue.shift();
      if (cnt === n) {
        ret = Math.min(ret, time);
      }
      if (!visited[cnt][cnt]) {
        visited[cnt][cnt] = true;
        queue.push({ cnt, clipboard: cnt, time: time + 1 });
      }
      if (
        clipboard !== 0 &&
        cnt + clipboard < MAX &&
        !visited[cnt + clipboard][clipboard]
      ) {
        visited[cnt + clipboard][clipboard] = true;
        queue.push({ cnt: cnt + clipboard, clipboard, time: time + 1 });
      }
      if (cnt - 1 > 0 && !visited[cnt - 1][clipboard]) {
        visited[cnt - 1][clipboard] = true;
        queue.push({ cnt: cnt - 1, clipboard, time: time + 1 });
      }
    }
    return ret.toString();
  };
  rl.on("line", (input: string) => {
    console.log(makeEmoji(+input));
    rl.close();
  });
})();
