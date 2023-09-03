// 1287: 할 수 있다
import { readFileSync } from "fs";

type Operator = "+" | "-" | "*" | "/";
const expression = readFileSync("/dev/stdin").toString().trim();
const numericExpressionRegex = /[-*+/]/g;
const numberRegex = /[\d]+/;

const print = () => console.log(solve());

const solve = () => {
  if (!isRightPair(expression)) return "ROCK";
  try {
    const { value } = calculate(0);
    return value.toString();
  } catch (e) {
    return "ROCK";
  }
};

const isRightPair = (expression: string) => {
  let bracketCount = 0;
  let operatorCount = 0;
  let isNumber = true;
  let i = 0;
  while (i < expression.length) {
    const char = expression[i];
    if (char === "(") bracketCount++;
    else if (char === ")") {
      bracketCount--;
      if (bracketCount < 0) return false;
    } else {
      if (isOperator(char)) {
        if (isNumber) return false;
        operatorCount++;
      } else {
        if (!isNumber) return false;
        while (
          i + 1 < expression.length &&
          numberRegex.exec(expression[i + 1])
        ) {
          i++;
        }
      }
      isNumber = !isNumber;
    }
    i++;
  }
  if (bracketCount !== 0) return false;

  const numbers = expression.split(numericExpressionRegex);
  return numbers.filter((e) => e !== "").length === operatorCount + 1;
};

const calculate = (idx: number) => {
  const numberArray: bigint[] = [];
  const operatorArray: Operator[] = [];
  let isNumber = true;
  let i = idx;
  while (i < expression.length) {
    const char = expression[i];
    if (char === "(") {
      const { idx: nextIdx, value } = calculate(i + 1);
      i = nextIdx;
      numberArray.push(value);
      isNumber = !isNumber;
    } else if (char === ")") {
      return { idx: i, value: serialize(numberArray, operatorArray) };
    } else {
      if (isNumber) {
        let numStr = char;
        while (
          i + 1 !== expression.length &&
          numberRegex.exec(expression[i + 1])
        ) {
          numStr += expression[i + 1];
          i++;
        }
        numberArray.push(BigInt(numStr));
      } else operatorArray.push(char as Operator);
      isNumber = !isNumber;
    }

    if (
      !isNumber &&
      operatorArray.length &&
      (operatorArray[operatorArray.length - 1] === "/" ||
        operatorArray[operatorArray.length - 1] === "*")
    ) {
      const rhs = numberArray.pop()!;
      const lhs = numberArray.pop()!;
      const num = numericExpression(lhs, operatorArray.pop()!, rhs);
      numberArray.push(num);
    }

    i++;
  }
  return {
    idx: i,
    value: serialize(numberArray, operatorArray),
  };
};

const serialize = (numberArray: bigint[], operatorArray: Operator[]) => {
  if (numberArray.length === 0) throw new Error("blank brackets");
  let ret = numberArray[0];
  for (let i = 0; i < operatorArray.length; i++) {
    ret = numericExpression(ret, operatorArray[i], numberArray[i + 1]);
  }
  return ret;
};

const numericExpression = (lhs: bigint, operator: Operator, rhs: bigint) => {
  switch (operator) {
    case "*": {
      return lhs * rhs;
    }
    case "/": {
      if (!rhs) throw new Error("divided by 0");
      return lhs / rhs;
    }
    case "+": {
      return lhs + rhs;
    }
    case "-": {
      return lhs - rhs;
    }
  }
};

const isOperator = (char: string) => ["+", "-", "*", "/"].includes(char);

print();
