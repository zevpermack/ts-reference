//NO BS-TS 15

//Adding public before means we don't need to establish the
//variable and assign it in the constructor it just works
//adding readonly means you can't change it after it is set in the
//constructor
class Doggy {
  constructor(public readonly name: string, public age: number) {}
}

const lgg = new Doggy('LG', 13);
console.log(lgg.name);

// This throws because name is read only
// lgg.name = 'tony';

//// Statics
//This creates a way to only be able to create one DogList instance
// because we have a static instance and a private constructor
//Static properties belong to the class itself and not the instance of the class
class DogList {
  private doggies: Doggy[] = [];
  static instance: DogList = new DogList();
  private constructor() {}
  static addDog(dog: Doggy) {
    DogList.instance.doggies.push(dog);
  }

  getDogs() {
    return this.doggies;
  }
}

DogList.addDog(lgg);
console.log(DogList.instance.getDogs());
