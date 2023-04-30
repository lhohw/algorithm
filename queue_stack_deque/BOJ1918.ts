// 1918: 후위 표기식
import { readFileSync } from "fs";

const infix = readFileSync("/dev/stdin").toString().trim();

const print = () => console.log(infixToPostfix(infix));

const infixToPostfix = (infix: string) => {
  if (infix.length === 1) return infix;
  const [operators, operands] = init(infix);
  let i = 0;
  while (i < operators.length) {
    const operator = operators[i];
    if (operator === "*" || operator === "/") {
      const lhs = operands[i];
      const rhs = operands[i + 1];
      const calculated = operate(lhs, operator, rhs);
      operators.splice(i, 1);
      operands.splice(i, 2, calculated);
    } else i++;
  }

  let ret = operands[0];
  for (i = 0; i < operators.length; i++) {
    ret = operate(ret, operators[i], operands[i + 1]);
  }
  return ret;
};

const init = (infix: string) => {
  const stack: string[] = [];
  const operators: string[] = [];
  const operands: string[] = [];
  let inBracket = 0;
  for (let i = 0; i < infix.length; i++) {
    const ch = infix[i];
    if (ch === "(") {
      if (inBracket) stack.push(ch);
      inBracket++;
    } else if (ch === ")") {
      inBracket--;
      if (!inBracket) {
        let _infix = ")";
        while (stack.length) {
          _infix = stack.pop()! + _infix;
        }
        operands.push(infixToPostfix(_infix));
      } else {
        stack.push(ch);
      }
    } else if (!inBracket) {
      if (isOperator(ch)) operators.push(ch);
      else operands.push(ch);
    } else {
      stack.push(ch);
    }
  }
  return [operators, operands];
};

const isOperator = (ch: string) => ["+", "-", "*", "/"].includes(ch);

const operate = (lhs: string, oper: string, rhs: string) =>
  `${lhs}${rhs}${oper}`;

print();
