// 13302: 리조트
(function() {
  const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
  const [ n, m ] = input[0].split(' ').map(Number);
  const calendar: Boolean[] = new Array(n+1).fill(true);
  input[1] && input[1].split(' ').forEach((day: string) => calendar[+day] = false);
  
  const tickets = [
    { day: 1, price: 10000, coupon: 0 },
    { day: 3, price: 25000, coupon: 1 },
    { day: 5, price: 37000, coupon: 2 },
  ];
  
  const cache: number[][] = new Array(n+1).fill(undefined).map(_ => new Array(41).fill(-1));
  const buy = (here: number, coupon: number): number => {
    if (here > n) return 0;
    let ret = cache[here][coupon];
    if (ret != -1) return ret;
  
    if (!calendar[here]) return cache[here][coupon] = buy(here+1, coupon);
    ret = Infinity;
    if (coupon >= 3) ret = Math.min(ret, buy(here+1, coupon-3));
  
    for (const ticket of tickets) {
      const { day, price, coupon: c } = ticket;
      ret = Math.min(ret, price + buy(here + day, coupon + c))
    }
    return cache[here][coupon] = ret;
  }
  console.log(buy(1, 0).toString());
})();