// 14961: 거스름돈
(function () {
  const n = parseInt(
    require("fs").readFileSync("/dev/stdin").toString().trim()
  );
  const count = (n: number) => {
    let ret = 0;
    if (n === 1 || n === 3) return -1;
    ret += Math.floor(n / 5);
    n %= 5;
    if (n === 0) return ret;
    ret += Math.floor(n / 2);
    n %= 2;
    if (n === 0) return ret;
    return ret - 1 + 3;
  };
  console.log(count(n));
})();
