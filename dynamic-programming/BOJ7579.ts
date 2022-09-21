// 7579: 앱
(function () {
  const [[n, m], bytes, costs]: number[][] = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line: string) => line.split(" ").map(Number));

  const cache = new Array(1e4 + 1).fill(0);

  const inactivate = () => {
    const maxCost = costs.reduce((x, y) => x + y);
    for (let i = 0; i < n; i++) {
      for (let cost = maxCost; cost >= costs[i]; cost--) {
        cache[cost] = Math.max(cache[cost], cache[cost - costs[i]] + bytes[i]);
      }
    }
    for (let i = 0; i <= maxCost; i++) {
      if (cache[i] >= m) return i;
    }
    throw new Error("Invalid");
  };
  const ret = inactivate();
  console.log(ret.toString());
})();
