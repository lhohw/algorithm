// 2621: 카드게임
import { readFileSync } from "fs";

type Color = "R" | "B" | "Y" | "G";
class Card {
  private constructor(public color: Color, public number: number) {}
  static init(card: string) {
    const [color, number] = card.split(" ");
    return new Card(color as Color, +number);
  }
}
class Hand {
  public max: number;
  public min: number;
  private colorCountMap: Map<Color, number>;
  private numberCountMap: Map<number, number>;
  private successive: number[];
  private STRAIGHT_FLUSH = 0;
  private FOUR_CARD = 1;
  private FULL_HOUSE = 2;
  private FLUSH = 3;
  private STRAIGHT = 4;
  private TRIPLE = 5;
  private TWO_PAIR = 6;
  private ONE_PAIR = 7;
  private HIGH_CARD = 8;
  constructor(private cards: Card[]) {
    const { max, min, colorCountMap, numberCountMap, successive } = this.init();
    this.max = max;
    this.min = min;
    this.colorCountMap = colorCountMap;
    this.numberCountMap = numberCountMap;
    this.successive = successive;
  }
  play() {
    const handRanking = this.calculate();
    return this.score(handRanking);
  }

  private calculate() {
    const {
      STRAIGHT_FLUSH,
      FOUR_CARD,
      FULL_HOUSE,
      FLUSH,
      STRAIGHT,
      TRIPLE,
      TWO_PAIR,
      ONE_PAIR,
      HIGH_CARD,
    } = this;
    const { colorCountMap, numberCountMap, successive } = this;
    const isFlush = colorCountMap.size === 1;
    const isStraight = successive[0] === 5;
    if (isFlush && isStraight) {
      return STRAIGHT_FLUSH;
    }
    const counts = Array.from(numberCountMap.values());
    const reduced = this.reduce(counts);

    if (numberCountMap.size === 2) {
      if (reduced === 4) {
        return FOUR_CARD;
      }
      return FULL_HOUSE;
    }
    if (isFlush) {
      return FLUSH;
    }
    if (isStraight) {
      return STRAIGHT;
    }
    if (counts.includes(3)) {
      return TRIPLE;
    }
    if (reduced === 4) {
      return TWO_PAIR;
    }
    if (counts.includes(2)) {
      return ONE_PAIR;
    }
    return HIGH_CARD;
  }

  private score(handRanking: number) {
    const {
      STRAIGHT_FLUSH,
      FOUR_CARD,
      FULL_HOUSE,
      FLUSH,
      STRAIGHT,
      TRIPLE,
      TWO_PAIR,
      ONE_PAIR,
      HIGH_CARD,
    } = this;
    const { max, numberCountMap } = this;
    const sortedNumberCountArray = Array.from(numberCountMap)
      .sort((a, b) => {
        if (a[1] === b[1]) return +b[0] - +a[0];
        return b[1] - a[1];
      })
      .map((e) => e.map(Number));

    switch (handRanking) {
      case STRAIGHT_FLUSH: {
        return max + 900;
      }
      case FOUR_CARD: {
        const sameNumber = sortedNumberCountArray[0][0];
        return sameNumber + 800;
      }
      case FULL_HOUSE: {
        const [[k1], [k2]] = sortedNumberCountArray;
        return 10 * k1 + k2 + 700;
      }
      case FLUSH: {
        return max + 600;
      }
      case STRAIGHT: {
        return max + 500;
      }
      case TRIPLE: {
        return sortedNumberCountArray[0][0] + 400;
      }
      case TWO_PAIR: {
        return (
          sortedNumberCountArray[0][0] * 10 + sortedNumberCountArray[1][0] + 300
        );
      }
      case ONE_PAIR: {
        return sortedNumberCountArray[0][0] + 200;
      }
      case HIGH_CARD: {
        return max + 100;
      }
      default: {
        throw new Error("invalid");
      }
    }
  }

  private init() {
    const { cards } = this;
    cards.sort((a, b) => a.number - b.number);

    let max = 0,
      min = 10;
    const colorCountMap = new Map<Color, number>();
    const numberCountMap = new Map<number, number>();
    const successive: number[] = [];
    let successiveCount = 0;
    let prev = cards[0].number - 1;
    for (const { color, number } of cards) {
      max = Math.max(max, number);
      min = Math.min(min, number);
      colorCountMap.set(color, (colorCountMap.get(color) || 0) + 1);
      numberCountMap.set(number, (numberCountMap.get(number) || 0) + 1);
      if (prev + 1 === number) {
        successiveCount++;
      } else {
        successive.push(successiveCount);
        successiveCount = 1;
      }
      prev = number;
    }
    successive.push(successiveCount);

    return { max, min, colorCountMap, numberCountMap, successive };
  }

  private reduce(counts: number[]) {
    return counts.reduce((acc, x) => acc * x, 1);
  }
}

const cards = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Card.init);

const print = () => console.log(solve().toString());

const solve = () => {
  const hand = new Hand(cards);
  return hand.play();
};

print();
