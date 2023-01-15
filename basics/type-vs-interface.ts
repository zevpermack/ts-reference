//https://www.youtube.com/watch?v=zM9UPcIyyhQ Matt Pocock - should you use types or interfaces

//interfaces have their own properties
//An interface can inherit from a previous interface
//Interfaces come bundled with features:
//- They get merged if they are in the same scope like the example below

interface Animal {
  name: string;
}

interface Animal {
  meow(): void;
}

const animal: Animal = {
  meow: () => {},
  name: 'cat',
};

//When to use:
//If you need a type that extends another type, then use an interface
//If you want a class that extends and interface use an interface

//Otherwise just use types. They perform just as well as interfaces
//They avoid the unpredictable behavior that could include merging interfaces
