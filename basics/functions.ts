// callback definition
export function printToFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}

//a callback function with parameters
//creating a type of function to read cleaner and potentially be reused
type MutationFunction = (v: number) => number;

export function arrayMutate(
  numbers: number[],
  mutate: MutationFunction
): number[] {
  return numbers.map(mutate);
}

console.log(arrayMutate([1, 2, 3], (v) => v * 10));
//output [10, 20, 30]

//Return a function that accept a new parameter to add to
export function createAdder(num: number) {
  return (val: number) => num + val;
}
const addOne = createAdder(1);
console.log(addOne(55));
