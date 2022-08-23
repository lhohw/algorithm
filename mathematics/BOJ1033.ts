// 1033: 칵테일
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  type Proportion = {
    numerator: number;
    denominator: number;
  }
  let n: number;
  let proportions: Proportion[];
  const hang = new Map<number, {[key: string]: Proportion}>();
  const gcd = (a: number, b: number): number => b == 0 ? a : gcd(b, a%b);
  const divideByGCD = (a: Proportion) => {
    const _gcd = gcd(a.numerator, a.denominator);
    a.numerator /= _gcd;
    a.denominator /= _gcd;
  }
  const lcm = (...args: number[]): number => {
    let _lcm = args[0];
    for (let i=1; i<args.length; i++) {
      _lcm = _lcm * args[i] / gcd(_lcm, args[i]);
    }
    return _lcm;
  }
  const checkHang = (a: number) => {
    const { numerator, denominator } = proportions[a];
    const entries = Object.entries(hang.get(a)!);
    for (const [ key, value ] of entries) {
      const p: Proportion = {
        numerator: 1,
        denominator: 1,
      }
      p.numerator = numerator * value.numerator;
      p.denominator = denominator * value.denominator;
      divideByGCD(p);
      proportions[+key] = p;
      delete hang.get(+key)![a];
      delete hang.get(a)![key];
      checkHang(+key);
    }
  }
  rl.on('line', (input: string) => {
    if (n === undefined) {
      n = +input;
      proportions = new Array(n).fill(null);
      proportions[0] = { numerator: 1, denominator: 1 };
      for (let i=0; i<n; i++) hang.set(i, {});
    }
    else {
      let [ a, b, p, q ] = input.split(' ').map(Number);
      if (a > b) {
        [ b, a ] = [ a, b ];
        [ p, q ] = [ q, p ];
      }
  
      if (proportions[a]) {
        proportions[b] = {
          numerator: proportions[a].numerator * q,
          denominator: proportions[a].denominator * p
        };
        divideByGCD(proportions[b]);
        checkHang(b);
      }
      else if (proportions[b]) {
        proportions[a] = {
          numerator: proportions[b].numerator * p,
          denominator: proportions[b].denominator * q
        };
        divideByGCD(proportions[a]);
        checkHang(a);
      }
      else {
        if (hang.has(a)) hang.set(a, { ...hang.get(a), [b]: { numerator: q, denominator: p } });
        else hang.set(a, { [b]: { numerator: q, denominator: p } });
        
        if (hang.has(b)) hang.set(b, { ...hang.get(b), [a]: { numerator: p, denominator: q } });
        else hang.set(b, { [a]: { numerator: p, denominator: q } });
      }
    }
  }).on('close', () => {
    const _lcm = lcm(...proportions.map(e => e.denominator));
    console.log(proportions.map(e => e.numerator * _lcm / e.denominator).join(' '));
    process.exit();
  });
})();