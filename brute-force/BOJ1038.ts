// 1038: 감소하는 수
(function () {
  const n = parseInt(
    require("fs").readFileSync("/dev/stdin").toString().trim()
  );
  const init = (): [number[][], number] => {
    let max = 0;
    const counts: number[][] = new Array(10)
      .fill(undefined)
      .map((_) => new Array(11).fill(0));
    for (let y = 0; y < 10; y++) {
      let sum = 0;
      for (let x = 0; x < 10; x++) {
        if (y == 0) counts[y][x] = 1;
        else counts[y][x] = x < y ? 0 : counts[y - 1][x - 1] + counts[y][x - 1];
        sum += counts[y][x];
      }
      counts[y][10] = sum;
      max += sum;
    }
    counts[0][10] = 9;
    max--;
    return [counts, max];
  };
  const reconstruct = (
    n: number,
    counts: number[][],
    currentSum: number,
    y: number,
    ret: string
  ): string => {
    let sum = 0;
    for (let x = y; x < 10; x++) {
      const num = counts[y][x];
      if (n <= currentSum + sum + num) {
        if (y === 0) return ret + x;
        return reconstruct(
          n - sum - counts[y - 1][10],
          counts,
          currentSum - counts[y - 1][10],
          y - 1,
          ret + x
        );
      }
      sum += num;
    }
    throw new Error("Invalid");
  };
  const solve = (counts: number[][], max: number) => {
    if (n > max) return "-1";
    if (n <= 10) return n.toString();
    let currentSum = 0,
      y = 0;
    while (counts[y][10] + currentSum < n) {
      currentSum += counts[y][10];
      y++;
    }
    return reconstruct(n, counts, currentSum, y, "");
  };

  const [counts, max] = init();
  console.log(solve(counts, max));
})();
