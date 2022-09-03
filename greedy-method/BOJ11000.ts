// 11000: 강의실 배정
(function () {
  const map = new Map<number, number>();
  require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .slice(1)
    .forEach((line: string) => {
      const [start, end] = line.split(" ").map(Number);
      map.has(start)
        ? map.set(start, (map.get(start) || 0) + 1)
        : map.set(start, 1);
      map.has(end) ? map.set(end, (map.get(end) || 0) - 1) : map.set(end, -1);
    });

  let ret = 1,
    sum = 0;
  for (const [_, value] of Array.from(map).sort((a, b) => a[0] - b[0])) {
    sum += value;
    ret = Math.max(ret, sum);
  }
  console.log(ret.toString());
})();
