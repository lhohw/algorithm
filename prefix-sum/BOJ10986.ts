// 10986: 나머지 합
(function () {
  const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");

  const map = new Map<number, number>();
  const [n, m] = input[0].split(" ").map(Number);
  let sum = 0;
  input[1].split(" ").map((str: string) => {
    const num = +str;
    sum += num;
    const key = sum % m;
    map.has(key) ? map.set(key, (map.get(key) || 0) + 1) : map.set(key, 1);
  });
  const sumTo = (to: number) => ((to - 1) * to) / 2;
  const ret = Array.from(map).reduce(
    (sum, [k, v]) => sum + sumTo(v),
    map.get(0) || 0
  );
  console.log(ret.toString());
})();
