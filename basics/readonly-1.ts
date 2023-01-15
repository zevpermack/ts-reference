interface Cat {
  name: string;
  breed: string;
}

type ReadonlyCat = Readonly<Cat>;

function makeCat(name: string, breed: string): ReadonlyCat {
  return {
    name,
    breed,
  };
}

const usul = makeCat('Usul', 'Tabby');
// Now we cannot run the line below because the property is readonly
// usul.name = 'Piter';

function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}

const c1 = makeCoordinate(10, 20, 30);
//The readonly above means we cannot reassign these cooridnates

//This means the contents of the array are also immutable
const reallyConst = [1, 2, 3] as const;
//Now this line below will not work if uncommented
// reallyConst[0] = 50;
