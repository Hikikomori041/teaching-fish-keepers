const badFormat = (x: string, y: number) => {
  const result = x + y;
  return result;
};
export const anotherBad = (a: string) => {
  return a.toUpperCase();
};
interface Test {
  name: string;
  age: number;
}
const obj: Test = { name: "test", age: 25 };
