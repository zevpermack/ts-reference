// NO BS TS #14 - MAPPED Types

////For this type you must have name but you can add any other
////key value pairing that are string and string | number
// This syntax used to not work but now it does as of 2022
type MyFlexibleDogInfo = {
  name: string;
} & Record<string, string | number>;

const dog: MyFlexibleDogInfo = {
  name: 'LG',
  breed: 'Mutt',
  god: 55,
};

//this is basically the same where for any key of string
//the value must also be a string
type MyFlexibleDogInfo2 = {
  name: string;
  [key: string]: string | number;
};

const dog2: MyFlexibleDogInfo2 = {
  name: 'LG',
  breed: 'Mutt',
  god: 55,
};

////Remapping an interface
interface DogInfo {
  name: string;
  age: number;
}

//This takes in the type and maps out they keys to where
//they are all boolean
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

//Now if you look at the type of dogInfo options the
//DogInfo interface is remapped to booleans
type DogInfoOptions = OptionsFlags<DogInfo>;

////Practical remapping example
//Here we're mapping a function where the type passed into it is the
//the type of the variable in the initial interface
type Listeners<Type> = {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: (
    newValue: Type[Property]
  ) => void;
} & {
  [Property in keyof Type as `on${Capitalize<string & Property>}Delete`]?: (
    newValue: Type[Property]
  ) => void;
};

function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
  throw 'Needs to be implemented';
}

type DogInfoListeners = Listeners<DogInfo>;

const lg: DogInfo = {
  name: 'LG',
  age: 13,
};

listenToObject(lg, {
  onNameChange: (v: string) => {},
  onAgeChange: (v: number) => {},
  onNameDelete: (v: string) => {},
  onAgeDelete: (v: number) => {},
});
