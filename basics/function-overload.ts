//YT: No BS TS #4

interface Coordinate {
  x: number;
  y: number;
}

//Below we will use function overloading to avoid having these multiple
//function which both just handle coordinates but you need to know what type is passed
//in first

function parseCoordinateFromObject(obj: Coordinate): Coordinate {
  return {
    ...obj,
  };
}

function parseCoordinateFromNumbers(x: number, y: number): Coordinate {
  return {
    x,
    y,
  };
}

//Unknown is like any except you have to cast it before using it
//Here we define the inputs of what the function can take
//The code will still run without this however now we will get accurate and
//restrictive function signature combinations and prompts
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(str: string): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;

//arg2 is optional because the first parseCoordinate function only has one arg
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === 'object') {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else if (typeof arg1 === 'string') {
    (arg1 as string).split(',').forEach((str) => {
      const [key, value] = str.split(':');
      coord[key as keyof Coordinate] = parseInt(value, 10);
    });
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}
//now we have a function where we can parse the coordinate of any of these data types
console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 22, y: 44 }));
console.log(parseCoordinate('x:22,y:33'));
