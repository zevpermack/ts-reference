//NO BS-TS #19 Utilities in Types

type Name = {
  first: string;
  last: string;
};

function addFullName(name: Name): Name & {
  fullName: string;
} {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}

// T extends any function. Syntax below.
// (...args: any[]) => any
// is how to say any function. Basically any arguments producing any result

//We say that data is the same as the 0th parameter of the iterator function
//The return type utility is saying return the same return type as the generic
function permuteRows<T extends (...args: any[]) => any>(
  iteratorFunc: T,
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return data.map(iteratorFunc);
}

//addFullName is a function so it satisfies the generic T requirement
console.log(permuteRows(addFullName, [{ first: 'zom', last: 'whatever' }]));

//Apply to a class

class PersonWithFullName {
  constructor(public name: Name) {}

  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }
}

//For this function T is matching any constructor because it has the new keyword

function createObjects<T extends new (...args: any[]) => any>(
  ObjectType: T,
  data: ConstructorParameters<T>[0][]
): InstanceType<T>[] {
  return data.map((item) => new ObjectType(item));
}

//PersonWithFullName is a constructor so it satisfies the generic requirement
console.log(
  createObjects(PersonWithFullName, [{ first: 'Perry', last: 'whatever' }]).map(
    (obj) => obj.fullName
  )
);
