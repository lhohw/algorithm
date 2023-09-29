// 5635: 생일
import { readFileSync } from "fs";

class Student {
  public name: string;
  private birth: Record<"year" | "month" | "day", number>;
  constructor(info: string) {
    const [name, ...birth] = info.split(" ");
    this.name = name;
    this.birth = {
      year: +birth[2],
      month: +birth[1],
      day: +birth[0],
    };
  }
  static compare(student1: Student, student2: Student) {
    return student1.getDateValue() - student2.getDateValue();
  }
  getDateValue() {
    const { year, month, day } = this.birth;
    return new Date(year, month - 1, day).valueOf();
  }
}

const [, ...info] = readFileSync("/dev/stdin").toString().trim().split("\n");

const print = () => console.log(solve());

const solve = () => {
  const students = info.map((i) => new Student(i));
  students.sort(Student.compare);
  return students[students.length - 1].name + "\n" + students[0].name;
};

print();
