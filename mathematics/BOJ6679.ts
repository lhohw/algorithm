// 6679: 싱기한 네자리 숫자
const chars = "0123456789abcdef";
const radices = [10, 12, 16];

const _print = () => console.log(solve());

const solve = () => {
  let ret = "";
  for (let i = 1e3; i < 1e4; i++) {
    if (isSame(i)) ret += i + "\n";
  }
  return ret.trimEnd();
};

const isSame = (n: number) => {
  const sum = radices.map((radix) => digitSum(n, radix));
  return sum.every((s) => s === sum[0]);
};

const digitSum = (n: number, radix: number) => {
  return parseToRadix(n, radix).reduce((acc, x) => acc + parseInt(x, radix), 0);
};

const parseToRadix = (n: number, radix: number) => {
  const ret: string[] = [];
  while (n) {
    ret.push(chars[n % radix]);
    n = Math.floor(n / radix);
  }
  return ret;
};

_print();
