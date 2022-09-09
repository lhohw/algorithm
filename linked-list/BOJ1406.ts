// 1406: 에디터
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  type _Node = {
    key: string;
    prev?: _Node;
    next?: _Node;
  };
  class LinkedList {
    pointer: _Node = null!;
    head: _Node = { key: "head", prev: null!, next: null! };
    size = 0;
    constructor(private str: string) {
      this.init(str);
    }
    init(str: string) {
      const { head } = this;
      this.size = str.length;
      let here = head;
      for (const char of str.split("")) {
        const node: _Node = { key: char, prev: null!, next: null! };
        node.prev = here;
        here.next = node;
        here = node;
      }
      this.pointer = here;
    }
    L() {
      const { head } = this;
      if (this.size === 0 || !this.pointer.prev) return;
      this.pointer = this.pointer.prev;
    }
    D() {
      if (this.size === 0 || !this.pointer.next) return;
      this.pointer = this.pointer.next;
    }
    B() {
      if (this.size === 0 || !this.pointer.prev) return;
      this.pointer.prev!.next = this.pointer.next;
      if (this.pointer.next) this.pointer.next.prev = this.pointer.prev;
      this.pointer = this.pointer.prev;
      this.size--;
    }
    P(key: string) {
      const node: _Node = { key, prev: null!, next: null! };
      if (this.pointer.next) {
        this.pointer.next.prev = node;
        node.next = this.pointer.next;
        node.prev = this.pointer;
        this.pointer.next = node;
      } else {
        node.prev = this.pointer;
        this.pointer.next = node;
      }
      this.pointer = this.pointer.next;
      this.size++;
    }
    command(input: string) {
      const [cmd, char] = input.split(" ");
      if (cmd === "P") this[cmd](char);
      else this[cmd as "L" | "D" | "B"]();
    }
    print() {
      const { head } = this;
      let here = head.next;
      let ret = "";
      while (here) {
        ret += here.key;
        here = here.next;
      }
      console.log(ret);
    }
  }
  let n: number;
  let ret = "";
  let linkedList: LinkedList;
  rl.on("line", (input: string) => {
    if (linkedList === undefined) linkedList = new LinkedList(input);
    else if (n === undefined) n = +input;
    else linkedList.command(input);
  }).on("close", () => {
    linkedList.print();
    process.exit();
  });
})();
