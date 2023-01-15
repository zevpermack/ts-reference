//NO BS TS #6

type ThreeDCoordinate = [x: number, y: number, z: number];

function addThreeDCoordinate(
  c1: ThreeDCoordinate,
  c2: ThreeDCoordinate
): ThreeDCoordinate {
  return [c1[0] + c2[0], c1[1] + c1[1], c1[2] + c1[2]];
}

console.log(addThreeDCoordinate([0, 100, 0], [10, 20, 30]));

function simpleStringState(
  initial: string
): [() => string, (v: string) => void] {
  let str: string = initial;
  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
}

//This is basically how react state works, returning a getter and a setter
//within a tuple from a function, which can be spread out and assigned

const [str1getter, str1setter] = simpleStringState('hello');
console.log(str1getter());
str1setter('goodbye');
console.log(str1getter());

const [str2getter, str2setter] = simpleStringState('pumpkin');
console.log(str2getter());
str2setter('apple');
console.log(str2getter());
