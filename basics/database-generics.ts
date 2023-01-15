export interface Database<T, K> {
  get(id: K): T;
  set(id: K, value: T): void;
}

export interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

type DBKeyType = string | number | symbol;

export class InMemoryDatabase<T, K extends DBKeyType>
  implements Database<T, K>
{
  //as record K, T is needed otherwise it doesn't know what the key,vals are
  protected db: Record<K, T> = {} as Record<K, T>;

  get(id: K): T {
    return this.db[id];
  }
  set(id: K, value: T): void {
    this.db[id] = value;
  }
}

export class PersistentMemoryDB<T, K extends DBKeyType>
  extends InMemoryDatabase<T, K>
  implements Persistable
{
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

export const myDB = new InMemoryDatabase<number, string>();
myDB.set('foo', 22); //22
console.log(myDB.get('foo')); //bar
//This line below errors because the db is private
// myDB.db["foo"] = "baz"

export const persistentDB = new PersistentMemoryDB<number, string>();
persistentDB.set('foo', 23);
export const savedState = persistentDB.saveToString();
persistentDB.set('foo', 24);
console.log(persistentDB.get('foo')); //24

//restoring from a saved state
export const persistentDB2 = new PersistentMemoryDB<number, string>();
persistentDB2.restoreFromString(savedState);
console.log(persistentDB2.get('foo')); //23
