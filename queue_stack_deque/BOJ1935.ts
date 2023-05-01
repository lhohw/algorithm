// 1935: 후위 표기식2
import { readFileSync } from "fs";

const [n, postfix, ...nums] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((e, i) => (i === 1 ? e : +e)) as [number, string, ...number[]];

const print = () => console.log(solve().toString());

const solve = () => {
  const stack: number[] = [];
  const map = init();
  for (let i = 0; i < postfix.length; i++) {
    const ch = postfix[i];
    if (isOperator(ch)) {
      const rhs = stack.pop()!;
      const lhs = stack.pop()!;
      const result = operate(lhs, ch, rhs);
      stack.push(result);
    } else {
      stack.push(map.get(ch)!);
    }
  }
  return (Math.floor(stack.pop()! * 100) / 100).toFixed(2);
};

const init = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const map = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    map.set(characters[i], nums[i]);
  }
  return map;
};

const isOperator = (ch: string) => ["*", "/", "+", "-"].includes(ch);

const operate = (lhs: number, operator: string, rhs: number) => {
  switch (operator) {
    case "*": {
      return lhs * rhs;
    }
    case "/": {
      return lhs / rhs;
    }
    case "+": {
      return lhs + rhs;
    }
    case "-": {
      return lhs - rhs;
    }
    default: {
      throw new Error("Invalid");
    }
  }
};

print();
