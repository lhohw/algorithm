// 2011: 암호코드
(function () {
  const cipher: string = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim();
  const cache = new Array(cipher.length).fill(-1);
  let isFault = false;
  const count = (cipherIdx: number) => {
    if (isFault) return 0;
    if (cipher[cipherIdx] === "0") {
      isFault = true;
      return 0;
    }
    if (cipherIdx === cipher.length) return 1;
    let ret = cache[cipherIdx];
    if (ret != -1) return ret;
    ret = 0;
    if (cipher[cipherIdx + 1] !== "0") ret = count(cipherIdx + 1);
    if (
      cipherIdx + 2 <= cipher.length &&
      parseInt(cipher[cipherIdx] + cipher[cipherIdx + 1]) <= 26 &&
      parseInt(cipher[cipherIdx + 2]) !== 0
    )
      ret = (ret + count(cipherIdx + 2)) % 1e6;
    return (cache[cipherIdx] = ret);
  };

  let ret = count(0);
  if (isFault) ret = 0;
  console.log(ret.toString());
})();
