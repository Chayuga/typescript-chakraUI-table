import namor from "namor";

const range = (len: number | string) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

interface INewPerson {
  firstName: string;
  lastName: string;
  age: number | string;
  visits: number;
  progress: number;
  status: string;
  subRows: INewPerson[] | undefined;
}

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single",
  };
};

export default function makeData(...lens: number[] | string[]): INewPerson[] {
  const makeDataLevel = (depth: number = 0): INewPerson[] => {
    const len: number | string = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
