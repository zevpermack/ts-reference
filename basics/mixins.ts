// NO BS TS #17 Mixins

//A function that creates and returns a function

const createLogger = () => {
  return function (v: string) {
    console.log(v);
  };
};

const logger = createLogger();
logger('My string');

//We can also have a function that creates a class
function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = '';
    log(str: string) {
      console.log(str);
      this.completeLog += str + '\n';
    }
    dumpLog() {
      return this.completeLog;
    }
  };
}

const MyLogger = createLoggerClass();
const logger2 = new MyLogger();
logger2.log('Foo');
logger2.log('Jones');
console.log(logger2.dumpLog());

//A memory database that lets you tell it the type through
//a generic

function CreateSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }
    get(id: string, value: T) {
      return this.db[id];
    }
    getObject(): Object {
      return this.db;
    }
  };
}

const StringDatabase = CreateSimpleMemoryDatabase<string>();

const sdb1 = new StringDatabase();

sdb1.set('a', 'hello');

//With mixins we can add functionality to multiple classes with different
//class tree roots without copy and paste

//This ensures that what is being passed in is a class
//a class is something that can be called with new, takes in any number of args and returns and instance of the class
type Constructor<T> = new (...args: any[]) => T;

//This allows us to only apply dumpable to classes with getObject() on them
function Dumpable<T extends Constructor<{ getObject(): object }>>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

//We pass in the StringDatabase class
const DumpableStringDatabase = Dumpable(StringDatabase);
//We receive a class the is the StringDatabase with the dump function
const sdb2 = new DumpableStringDatabase();
//We set a key and val and then dump it with the added function
sdb2.set('myKey', 'myVal');
sdb2.dump();
